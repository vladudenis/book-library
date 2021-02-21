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

function addBookToLibrary(book){
    myLibrary.push(book);
}

const bookButton = document.querySelectorAll(".add-book");
bookButton.forEach(button => button.addEventListener("click", openForm));

const form = document.querySelector(".form-container");
const closeButton = form.querySelector(".btn-close");
closeButton.addEventListener("click", closeForm);
const addButton = form.querySelector(".btn-add");
addButton.addEventListener("click", addBook);

function openForm(){
    form.style.display = "block";
}

function closeForm(){
    form.style.display = "none";
}

function addBook(){

}