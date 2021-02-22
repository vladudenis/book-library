let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return title + " by " + author + ", " + pages + " pages, " + (read ? "have read" : "haven't read yet");
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
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pagecount = document.querySelector("#pagecount");
    const read = document.querySelector("#read");

    return new Book(title, author, pagecount, read);
}

const bookshelf = document.querySelector(".bookshelf");

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
    const read = document.createElement("button"); //change to slider
    const remove = document.createElement("button");

    myBook.classList.add("bookshelf__book");
    title.classList.add("bookshelf__book-text");
    author.classList.add("bookshelf__book-text");
    pagecount.classList.add("bookshelf__book-text");
    read.classList.add("button"); //change to slider
    remove.classList.add("button");

    title.textContent = book.title;
    author.textCOntent = book.author;
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
    bookshelf.appendChild(book);
}
