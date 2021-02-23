let myLibrary = [];

class Book {
    constructor(
      title = "Unknown",
      author = "Unknown",
      pagecount = "0",
      read = "false"
    ) {
      this.title = title;
      this.author = author;
      this.pagecount = pagecount;
      this.read = read;
      this.info = function(){
        return title + " by " + author + ", " + pages + " pages, " + (read ? "have read" : "haven't read yet");
      }
    }
}

function addBookToLibrary(newBook){
    if(myLibrary.some((book) => book.title == newBook.title)){
        return false;
    }else{
        myLibrary.push(newBook);
        return true;
    }
}

function removeBookFromLibrary(title){
    myLibrary = myLibrary.filter((book) => book.title != title);
}

function whichBook(bookTitle){
    for(let book of myLibrary){
        if(book.title === bookTitle){
            return book;
        }
    }
    return null;
}

//new book button, modal and form
const addBookBtn = document.querySelector(".add-book");
addBookBtn.addEventListener("click", openModal);
const modal = document.querySelector(".modal");
const form = document.querySelector("form");

function openModal(){
    form.reset();
    modal.classList.add("modal-active");
}

//close and submit buttons in the form
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", closeModal);
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", addBook);

function closeModal(){
    modal.classList.remove("modal-active");
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

function addBook(e){  
    e.preventDefault();
    if(addBookToLibrary(getBook())){
        updateBooksGrid();
        closeModal();
    }else{
        alert("This book already exists in your library!");
    }
}

function getBook(){
    const title = form.querySelector("#title").value;
    const author = form.querySelector("#author").value;
    const pagecount = form.querySelector("#pagecount").value;
    const read = form.querySelector("#read").checked;
    return new Book(title, author, pagecount, read);
}

const bookshelf = document.querySelector(".bookshelf");
bookshelf.addEventListener("click", checkGridInput);

function checkGridInput(e){
    if(e.target.classList.contains("remove-btn")){
        removeBookFromLibrary(e.target.parentNode.firstChild.innerHTML);
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    }else if(e.target.classList.contains("read-btn")){
        if(e.target.innerHTML == "Read"){
            whichBook(e.target.parentNode.firstChild.innerHTML).read = false;
            e.target.innerHTML = "Not Read";
            //add one color and remove the other by classList
        }else{
            whichBook(e.target.parentNode.firstChild.innerHTML).read = true;
            e.target.innerHTML = "Read";
            //same as before
        }
    }
}

function updateBooksGrid() {
    resetGrid();
    for (let element of myLibrary) {
      createBook(element);
    }
}
  
  function resetGrid() {
    bookshelf.innerHTML = "";
}

function createBook(book){
    const myBook = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("h3");
    const pagecount = document.createElement("h3");
    const read = document.createElement("button");
    const remove = document.createElement("button");

    myBook.classList.add("bookshelf__book");
    title.classList.add("bookshelf__book-text");
    author.classList.add("bookshelf__book-text");
    pagecount.classList.add("bookshelf__book-text");
    read.classList.add("button");
    read.classList.add("read-btn");
    remove.classList.add("button");
    remove.classList.add("remove-btn");

    title.textContent = book.title;
    author.textContent = book.author;
    pagecount.textContent = `${book.pagecount} pages`;
    remove.textContent = "Remove";
    if (book.read){
        read.textContent = "Read";
        //add a color
    }else{
        read.textContent = "Not read";
        //add another color
    }

    myBook.appendChild(title);
    myBook.appendChild(author);
    myBook.appendChild(pagecount);
    myBook.appendChild(read);
    myBook.appendChild(remove);
    bookshelf.appendChild(myBook);
}