

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


// add webpage button functionality
let loadWithMap = document.querySelector("#load-with-map")
loadWithMap.addEventListener("click",displayBooksWithMap)



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



// Add book functionality - event listeners to open up the dialog, submit and cancel

/* Two important notes about modal:
  1. preventDefault prevents the usual behaviour of posting the collected information to a server (here it is being added to an array only).
  2. the modal usually has display: none. styling the modal implicitly makes it visible, so need to add the styling on showModal() and remove it on close()
*/
const addBookDialog = document.querySelector("dialog")
let addBookButton = document.querySelector("#open-add-book-dialog")

addBookButton.addEventListener("click", () => {
  
  addBookDialog.showModal()
  addBookDialog.setAttribute("id","add-book-dialog")
})

let addBookCancel = document.querySelector("#add-book-cancel")
addBookCancel.addEventListener("click", (event) => {
  // prevent usual behaviour of form submit to send information to a server
  event.preventDefault();
  addBookDialog.setAttribute("id","add-book-dialog-no-display")
  addBookDialog.close();
  addBookButton.focus();
})

let addBookSubmit = document.querySelector("#add-book-submit")
addBookSubmit.addEventListener("click", (event) => {
  // prevent usual behaviour of form submit to send information to a server
  event.preventDefault();
  addBookToLibrary(
    document.querySelector("#form-book-name").value,
    document.querySelector("#form-book-author").value,
    document.querySelector("#form-book-pages").value,
    document.querySelector("#form-book-synopsis").value,
    document.querySelector("#form-book-read-or-not").value,
  )
  addBookDialog.removeAttribute("id","add-book-dialog")
  addBookDialog.close();
  addBookButton.focus();
})


function addBookToLibrary(name, author, pages, synopsis, readOrNot) {
  let newBook = new Book(name, author, pages, synopsis, readOrNot)
  myLibrary.push(newBook)
}



// Option 1 - most elegant using map, join and adding it using innerHTML
function displayBooksWithMap() {

  let libraryBookContainer = document.querySelector("#library-book-container")

  let createdDOM = myLibrary.map((elem) => {

    return `
      <div style="background-color: ${elem.readOrNot ? "#ccffcc" : "#ff9980"}" class="indiv-book-container">
        <div class="book-title-and-author">
          <p class="book-title">${elem.name}</p>
          <p class="book-author">by ${elem.author}</p>
        </div>
        <p class="book-synopsis">${elem.synopsis}</p>
        <div class="book-options">
          <img class="icon" src="${elem.readOrNot ? "/img/eye-minus.svg" : "/img/eye-plus.svg"}">
          <img class="icon" src="img/library-remove.svg">
        </div>
      </div>
    `
        
  }).join('')

  // Note innerHTML generates a coplete rebuild of the parent - perfect here
  libraryBookContainer.innerHTML = createdDOM

}


// Option 2 for displaying books (keep in backgorund)

//let loadWithDOM = document.querySelector("#load-with-dom")
//loadWithDOM.addEventListener("click",displayBooksAmendDOM)

function displayBooksAmendDOM() {

  let libraryBookContainer = document.querySelector("#library-book-container")
  libraryBookContainer.innerHTML = "" // clear out the content first

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

