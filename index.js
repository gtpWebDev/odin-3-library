

const myLibrary = [];

//let book1 = new Book("Life of Pi", "Yann Martel", 300, true)
//console.log("Book1, a Book object, with object properties and methods:",book1)
//console.log("Book info object method invocation:", book1.info())

addBookToLibrary("Life of Pi", "Yann Martel", 300, true)
addBookToLibrary("The Bible", "Anon", 2300, false)
console.table(myLibrary)

function Book(name, author, pages, readOrNot) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readOrNot = readOrNot
  this.info = function() {
    if (readOrNot) {
      return `${name} by ${author}, ${pages} pages, previously read`
    } else {
      return `${name} by ${author}, ${pages} pages, not read yet`
    }
  }
}

function addBookToLibrary(name, author, pages, readOrNot) {

  let newBook = new Book(name, author, pages, readOrNot)
  myLibrary.push(newBook)

}

