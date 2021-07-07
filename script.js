//******************************** Variables ********************************//
let searchBooksAPI = "https://www.googleapis.com/books/v1/volumes?q=";
let searchInput = document.querySelector(".book-search-input");
let searchRezult = document.querySelector(".book-search-result");
//***************************************************************************//
//********************** Request to Google Book API *************************//
getBooksFromAPI = (book, userRequest) => {
  let request = new XMLHttpRequest();
  let craetedSearchUrl = searchBooksAPI + userRequest;
  request.open("GET", craetedSearchUrl);
  request.addEventListener("load", () => {
      let response = JSON.parse(request.responseText);
      book(response); 
  });
  request.send();
}
//**************************************************************************//
//********************** Creat modal with book items ***********************//
creatTemplateBooks = ({imageLinks = false, title, authors = "The book hasn't autors", description = "The book hasn't description", previewLink}) => {
    let bookImage = imageLinks.thumbnail || "https://i.pinimg.com/564x/d1/d9/ba/d1d9ba37625f9a1210a432731e1754f3.jpg";
    return `
    <div class="book-search-result-item">
        <img src="${bookImage}" alt="Book Image" class="book-search-result-img">
        <p class="book-search-result-title"><b>Title:</b> ${title}</p>
        <div class="book-search-result-author"><b>Authors:</b> ${authors}</div>
        <p class="book-search-result-description">Discription: ${description}</p>
        <a href="${previewLink}" target="_blank">Link for demo view</a>
    </div>`
}
//************************************************************************//
//********************* Request to Google Book API ***********************//
resultRendering = (response) => {
    let partOfBookItems = "";
    response.items.forEach(bookItem => {
        let el = creatTemplateBooks(bookItem.volumeInfo);
        partOfBookItems += el;
    });
    searchRezult.insertAdjacentHTML("afterbegin", partOfBookItems);
}
//***********************************************************************//
//******* Input search with setTimeout and search request length ********//
searchInput.addEventListener("input", function() {
    let searchRequest = "";
    searchRequest = this.value;
    if(searchRequest.length > 3) {
        setTimeout(() => {
            getBooksFromAPI(resultRendering, searchRequest);
        }, 3000)
    }
});
//***********************************************************************//