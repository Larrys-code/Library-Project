/**
 * Creates a Book object from given variables. Title and author
 * take strings, pages is just the number of pages, and read is
 * a boolean.
 * @param {string} title -The title of the Book
 * @param {string} author -The name of the author
 * @param {(string|number)} pages -The number of pages
 * @param {boolean} [read = false] -Has this book been read
 */
function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  /**
   * Gives info about the Book object as a string.
   */
  this.info = () =>
    `${this.title} by ${this.author}, ${this.pages}, ${
      this.read ? "finished reading" : "not read yet"
    }`;
  this.formattedInfo = () => {
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("h4");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("div");

    bookTitle.textContent = `${this.title}`;
    bookAuthor.textContent = `by ${this.author}`;
    bookPages.textContent = `${this.pages} pages`;
    bookRead.textContent = `${this.read ? "✔" : "✘"}`;
    bookRead.classList.add(`${this.read ? "has-read" : "hasnt-read"}`);
    bookRead.classList.add("read-marker");
    return [bookTitle, bookAuthor, bookPages, bookRead];
  };
  this.toggleRead = () => {
    switch (this.read) {
      case true:
        this.read = false;
        break;
      case false:
        this.read = true;
        break;
      default:
    }
  };
}

/**
 * Takes given Book objects and pushes them into
 * the given Library array (An array of books).
 * @param {[]} library -Library array
 * @param  {...Book} books -One or more Book objects to add to the Library
 */
function addBooksToLibrary(library, ...books) {
  books.forEach((book) => {
    library.push(book);
  });
}

function makeInputDiv(type, name) {
  const inputDiv = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");

  input.setAttribute("type", `${type}`);
  input.setAttribute("name", `${name}`);
  input.setAttribute("id", `${name}`);
  label.setAttribute("for", `${name}`);
  switch (name) {
    case "author":
      label.textContent = "Author:";
      break;
    case "pages":
      label.textContent = "Pages:";
      break;
    case "title":
      label.textContent = "Title:";
      break;
    case "read":
      label.textContent = "Read:";
      break;
    default:
  }
  inputDiv.classList.add("input-container", `${type}`);
  inputDiv.appendChild(label);
  inputDiv.appendChild(input);
  return inputDiv;
}

/**
 * Takes each Book in the Library and displays them on the bookshelf; clearing
 * the shelf before it does so in order to allow for updates to the Library.
 * @param {[]} library -Library array
 */
function displayLibrary(library) {
  const bookShelf = document.querySelector(".book-shelf");
  bookShelf.textContent = "";

  // Make Cards for each book
  library.forEach((book, index) => {
    const bookCard = document.createElement("div");
    const bookInfo = book.formattedInfo();
    bookCard.classList.add("book");
    bookCard.setAttribute("index", `${index}`);

    const deleteButton = function makeDeleteButton() {
      const newButton = document.createElement("button");
      newButton.classList.add("delete-book-button");
      newButton.textContent = "x";
      newButton.addEventListener("click", function deleteOnClick() {
        const clickedBook = this.parentElement;
        const bookIndex = clickedBook.getAttribute("index");
        library.splice(bookIndex, 1);
        displayLibrary(library);
      });
      return newButton;
    };
    bookCard.appendChild(deleteButton());

    bookInfo.forEach((info) => {
      bookCard.appendChild(info);
    });

    bookCard.addEventListener("click", function toggleRead() {
      const readDiv = this.querySelector(".read-marker");
      readDiv.setAttribute("class", "read-marker");
      book.toggleRead();
      readDiv.textContent = `${book.read ? "✔" : "✘"}`;
      readDiv.classList.add(`${book.read ? "has-read" : "hasnt-read"}`);
    });

    bookShelf.appendChild(bookCard);
  });

  // Make the Button to submit new books
  const newBookButton = function makeNewButton() {
    const newButton = document.createElement("button");
    newButton.classList.add("new-book-button");
    newButton.textContent = "+";

    // Make a book form in place of the Button
    newButton.addEventListener("click", function turnIntoBookForm() {
      bookShelf.removeChild(this);

      // the bookForm goes into the bookCard, the bookForm will contain fields for the title, author, page number, a check for read, and a submit button
      // each input should be in it's own div.
      const bookCard = document.createElement("div");
      const bookForm = document.createElement("form");
      const submitButton = document.createElement("button");

      const newDeleteButton = function makeDeleteButton() {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-book-button");
        deleteButton.textContent = "x";
        deleteButton.addEventListener("click", () => {
          displayLibrary(library);
        });
        return deleteButton;
      };
      bookCard.appendChild(newDeleteButton());

      submitButton.textContent = "Add Book";
      submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const formData = new FormData(bookForm);
        const formObject = Object.fromEntries(formData);
        const isRead = !!formObject.read;
        const newBook = new Book(
          formObject.title,
          formObject.author,
          formObject.pages,
          isRead
        );
        addBooksToLibrary(library, newBook);
        displayLibrary(library);
      });

      bookCard.classList.add("book", "book-form");
      bookForm.setAttribute("id", "new-book");
      bookForm.appendChild(makeInputDiv("text", "title"));
      bookForm.appendChild(makeInputDiv("text", "author"));
      bookForm.appendChild(makeInputDiv("number", "pages"));
      bookForm.appendChild(makeInputDiv("checkbox", "read"));
      bookForm.appendChild(submitButton);

      bookCard.appendChild(bookForm);
      bookShelf.appendChild(bookCard);
    });
    return newButton;
  };
  bookShelf.appendChild(newBookButton());
}

const myLibrary = [];
const theHobblin = new Book("The Hobblin", "J.R.R. Arr", "2695");
const GOT = new Book("Game of Throws", "Wanna Bee", "2");
const thePres = new Book(
  "The President Who Lived",
  "J.F.K. Rowing",
  "1963",
  true
);
const test = new Book("The President Who Lived", "J.F.K. Rowing", "1963", true);
addBooksToLibrary(
  myLibrary,
  theHobblin,
  GOT,
  thePres,
  theHobblin,
  GOT,
  thePres,
  theHobblin,
  GOT,
  thePres,
  theHobblin,
  GOT,
  thePres,
  test
);
displayLibrary(myLibrary);
