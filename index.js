

const myLibrary = [];

// starter books to avoid an empty library...
addBookToLibrary(
  "Life of Pi",
  "Yann Martel",
  300,
  "A boy is travelling from India to Canada when the ship sinks, leaving him in a small lifeboat with only an orangutan, a hyena, and an adult bengali tiger...",
  true
)
addBookToLibrary(
  "David Copperfield",
  "Charles Dickens",
  2300,
  "The story of a young man's adventures on his journey from an unhappy and impoverished childhood to the discovery of his vocation as a successful novelist.",
  false
)
addBookToLibrary(
  "Lord of the Rings",
  "J R R Tolkein",
  1200,
  " A hobbit named Frodo inherits the One Ring, which can destroy the entire world...",
  true
)
addBookToLibrary(
  "War and Peace",
  "Leo Tolstoy",
  1800,
  "The main focus is the invasion of Russia by Napoleon in 1812. It follows three well-known characters: Natasha Rostov, Prince Andrei Bolkonsky, and Pierre Bezukhoy.",
  true
)

/*
  1. Display books function to transform the data onto the UI.

  2. New book function that opens a modal dialog to allow the user to add a new book.

  3. Remove book function.

  4. Toggle status to readOrNot = true.
*/

displayBooksAmendDOM()

// Option 1
function displayBooksAmendDOM() {

  let libraryBookContainer = document.querySelector("#library-book-container")

  myLibrary.forEach((elem) => {
    
    let indivBookContainer = document.createElement("div")
    indivBookContainer.setAttribute("class","indiv-book-container")

    let backgroundColor = elem.readOrNot ? "#ccffcc" : "#ff9980"
    indivBookContainer.setAttribute("style",`background-color: ${backgroundColor}`)

    // title and author
    let bookTitleAndAuthor = document.createElement("div")
    bookTitleAndAuthor.setAttribute("class","book-title-and-author")
    let bookTitle = document.createElement("p")
    bookTitle.setAttribute("class","book-title")
    bookTitle.textContent = elem.name
    let bookAuthor = document.createElement("p")
    bookAuthor.setAttribute("class","book-author")
    bookAuthor.textContent = `by ${elem.author}`
    bookTitleAndAuthor.appendChild(bookTitle)
    bookTitleAndAuthor.appendChild(bookAuthor)
    indivBookContainer.appendChild(bookTitleAndAuthor)
    // title and author
    let bookSynopsis = document.createElement("p")
    bookSynopsis.setAttribute("class","book-synopsis")
    bookSynopsis.textContent = elem.synopsis
    indivBookContainer.appendChild(bookSynopsis)
    // book options
    let bookOptions = document.createElement("div")
    bookOptions.setAttribute("class","book-options")
    let toggleReadOrNotIcon = document.createElement("img")
    toggleReadOrNotIcon.setAttribute("class","icon")
    let readOrNotImgUrl = elem.readOrNot ? "/img/eye-minus.svg" : "/img/eye-plus.svg"
    toggleReadOrNotIcon.setAttribute("src",readOrNotImgUrl)
    let removeBookIcon = document.createElement("img")
    removeBookIcon.setAttribute("class","icon")
    removeBookIcon.setAttribute("src","/img/library-remove.svg")
    bookOptions.appendChild(toggleReadOrNotIcon)
    bookOptions.appendChild(removeBookIcon)
    indivBookContainer.appendChild(bookOptions)
    // finally append created structure to parent element
    libraryBookContainer.appendChild(indivBookContainer)
  })

}



// Book object constructor function
function Book(name, author, pages, synopsis, readOrNot) {

  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readOrNot = readOrNot
  this.synopsis = synopsis
  this.info = function() {
    if (readOrNot) {
      return `${name} by ${author}, ${pages} pages, previously read`
    } else {
      return `${name} by ${author}, ${pages} pages, not read yet`
    }
  }

}


function addBookToLibrary(name, author, pages, synopsis, readOrNot) {
  let newBook = new Book(name, author, pages, synopsis, readOrNot)
  myLibrary.push(newBook)
}


