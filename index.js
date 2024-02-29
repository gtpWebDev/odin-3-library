
/*  Potential improvements:
    - prevent default on submit button in dialog prevents form validation - add back end and remove prevent default
    - add book form styling could be improved
*/

class Book {
  constructor(name, author, readOrNot, synopsis) {
    this.name = name;
    this.author = author;
    this.readOrNot = readOrNot
    this.synopsis = synopsis
  }

  toggleReadOrNot() {
    this.readOrNot = !this.readOrNot
  }

}

const myLibrary = [];

addBookToLibrary("Life of Pi", "Yann Martel", true, "A boy is travelling from India to Canada when the ship sinks, leaving him in a small lifeboat with only an orangutan, a hyena, and an adult bengali tiger...")
addBookToLibrary("David Copperfield", "Charles Dickens", false, "The story of a young man's adventures on his journey from an unhappy and impoverished childhood to the discovery of his vocation as a successful novelist.")
addBookToLibrary("Lord of the Rings", "J R R Tolkein", false, " A hobbit named Frodo inherits the One Ring, which can destroy the entire world...")
addBookToLibrary("War and Peace", "Leo Tolstoy", true, "The main focus is the invasion of Russia by Napoleon in 1812. It follows three well-known characters: Natasha Rostov, Prince Andrei Bolkonsky, and Pierre Bezukhoy.")

displayBooksWithMap()


// Add button functionality  - add button, then submit and cancel on the modal dialog

const addBookDialog = document.querySelector("dialog")
let addBookButton = document.querySelector("#open-add-book-dialog")

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal()
  // The css for this id removes display: none, so styling has to be applied after showModal
  addBookDialog.setAttribute("id","add-book-dialog")
})


let addBookCancel = document.querySelector("#add-book-cancel")
addBookCancel.addEventListener("click", (event) => {
  // prevent usual behaviour of form submit to send information to a server
  event.preventDefault();
  // return the modal to display: none
  addBookDialog.setAttribute("id","add-book-dialog-no-display")
  addBookDialog.close();
  addBookButton.focus();
})

let addBookForm = document.querySelector("#add-book-form")
addBookForm.addEventListener("submit", (event) => {
  // prevent usual behaviour of form submit to send information to a server
  event.preventDefault();
  addBookToLibrary(
    document.querySelector("#form-book-name").value,
    document.querySelector("#form-book-author").value,
    document.querySelector("#form-book-read-or-not").checked,
    document.querySelector("#form-book-synopsis").value,
  )
  resetForm()
  addBookDialog.removeAttribute("id","add-book-dialog")
  addBookDialog.close();
  addBookButton.focus();
  displayBooksWithMap()
})


function resetForm() {
  document.querySelector("#form-book-name").value = "";
  document.querySelector("#form-book-author").value = "";
  document.querySelector("#form-book-synopsis").value = "";
  document.querySelector("#form-book-read-or-not").checked = false;
}

function addBookToLibrary(name, author, readOrNot, synopsis) {
  myLibrary.push(new Book(name, author, readOrNot, synopsis))
}


function removeBook(index) {
  myLibrary.splice(index,1)
}


function toggleReadOrNot(index) {
  myLibrary[index].toggleReadOrNot()
  //myLibrary[index].readOrNot = !myLibrary[index].readOrNot
}


// Generate DOM for all books held in the library, and assocate remove book and toggle read functionality for each book
function displayBooksWithMap() {

  let libraryBookContainer = document.querySelector("#library-book-container")

  let createdDOM = myLibrary.map((elem, index) => {

    return `
      <div style="background-color: ${elem.readOrNot ? "#ccffcc" : "#ff9980"}" class="indiv-book-container">
        <div class="book-title-and-author">
          <p class="book-title">${elem.name}</p>
          <p class="book-author">by ${elem.author}</p>
        </div>
        <p class="book-synopsis">${elem.synopsis}</p>
        <div class="book-options">
          <img id="toggle-read-book-${index}" class="icon" src="${elem.readOrNot ? "img/eye-minus.svg" : "img/eye-plus.svg"}">
          <img id="remove-book-${index}" class="icon" src="img/library-remove.svg">
        </div>
      </div>
    `
        
  }).join('')

  libraryBookContainer.innerHTML = createdDOM

  // associate button functionality to the created DOM elements
  myLibrary.forEach((elem, index) => {

    let removeBookButton = document.querySelector(`#remove-book-${index}`)
    removeBookButton.addEventListener("click",() => {
      removeBook(index)
      displayBooksWithMap()
    })

    let toggelReadOrNotButton = document.querySelector(`#toggle-read-book-${index}`)
    toggelReadOrNotButton.addEventListener("click",() => {
      toggleReadOrNot(index)
      displayBooksWithMap()
    })
  })

}