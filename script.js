//Book class: Represents the book
class Books {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//UI Class: Represents all the task performed on the app
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookstoList(book));
  }
  static addBookstoList(book) {
    let list = document.getElementById("book-list");
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger delete">X</a></td>
    `;
    list.appendChild(row);
  }
  static clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
  static deleteBook(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.classList = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}
//Storage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}
//Event:display the books
document.addEventListener("DOMContentLoaded", UI.displayBooks);
//Event: Add the books
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  //get form value
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validation
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("PLease fill the content", "danger");
  } else {
    const book = new Books(title, author, isbn);
    console.log(book);
    UI.addBookstoList(book);
    Store.addBook(book);
    UI.clearField();
    UI.showAlert("Book added successfully", "success");
  }
});

//Events: Remove the books
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert("Book removed", "success");
});
