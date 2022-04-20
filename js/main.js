/* eslint-disable linebreak-style */
// get dom elements
const allBks = document.querySelector('#all-books');
const listLink = document.querySelector('#list');
const addLink = document.querySelector('#add');
const contLink = document.querySelector('#contact');
const bkContainer = document.querySelector('#books');
const titleCont = document.querySelector('.books-title-1');

// get elements from the local storage if available
let books = JSON.parse(localStorage.getItem('books'));
// books class
class Books {
  // add new books
  static addBooks = () => {
    addLink.addEventListener('click', () => {
      const result = ` 
          <div class="add-section">
            <div class="underline"></div>
            <h2>Add a new book</h2>
            <input type="text" id="title" class="input" placeholder="title">
            <input type="text" id='author' class="input" placeholder="author">
            <p class="error" id="error"></p>
            <p class="sucess"></p>
            <button type="button" class="btn-add" id="btn-add">Add Book</button>
          </div>
        `;
      bkContainer.innerHTML = result;
      const title = document.querySelector('#title');
      const author = document.querySelector('#author');
      const addBtn = document.querySelector('#btn-add');
      const error = document.querySelector('#error');

      addBtn.addEventListener('click', () => {
        const bkTitle = title.value;
        const bkAuthor = author.value;

        // check if the input value is empty
        if (bkTitle === '' || bkAuthor === '') {
          error.style.cssText = `
          display: block;
          color: red;
        `;
          error.textContent = 'all the fields are required';
          setTimeout(() => {
            error.style.display = 'none';
          }, 2000);
          return;
        }
        const newBook = {
          id: Math.floor(Math.random() * 1000 + 1),
          title: bkTitle,
          author: bkAuthor,
        };

        let bks;
        if (this.getBooksLs() === null) {
          bks = [];
        } else {
          bks = this.getBooksLs();
        }
        bks.push(newBook);

        books = bks;
        // store books to local storage
        this.addBooksLs(bks);
        // update DOM
        this.addUi();
        // clear the input fields
        title.value = '';
        author.value = '';
        // add succes message
        error.style.cssText = `
          display: block;
          color:green;
        `;
        error.textContent = 'Book added successfully!';
        setTimeout(() => {
          error.style.display = 'none';
        }, 2000);
      });
    });
  }

  // delete books
  static deleteBk = () => {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-xmark')) {
        const id = parseInt(e.target.dataset.id, 10);
        const bks = books.filter((book) => book.id !== id);
        books = bks;
        // update DOM content
        this.addUi();
        // store updated data to local storage
        this.addBooksLs(bks);
      }
    });
  }

    // get books from the local storage
    static getBooksLs = () => JSON.parse(localStorage.getItem('books'));

    // add books to ls
    static addBooksLs = (bks) => {
      const dataToStore = JSON.stringify(bks);
      localStorage.setItem('books', dataToStore);
      this.addUi();
    }

    // add content to ui
    static addUi = () => {
      let result = '';
      if (Books.getBooksLs() === null) {
        allBks.innerHTML = '<h3 class="empty">There are no books available !</h3>';
        titleCont.style.display = 'none';
        return;
      }
      if (books.length === 0) {
        allBks.innerHTML = '<h3 class="empty">There are no books available !</h3>';
        titleCont.style.display = 'none';
        return;
      }
      titleCont.style.display = 'block';
      books.forEach((book) => {
        const { id, title, author } = book;
        const singleBk = `
        <div class="single-book">
          <span>"${title}" by ${author}</span>
          <span class="close"><i class="fa-solid fa-xmark" data-id=${id}></i></span>
        </div>
        `;
        result += singleBk;
      });
      allBks.innerHTML = result;
    };

    static contactSection = () => {
      titleCont.style.display = 'none';
      contLink.addEventListener('click', () => {
        const result = `
          <h1 class="books-title">Contact Information</h1>
          <p class="contact-text">Do have any questions or you just want to say "Hello"? you can reach out to us</p>
          <ul class="contact-list ">
            <li>our email: mail.mail.com</li>
            <li>our phone number: 00435674839</li>
            <li>Our addressname: streetname 22, 84503 City, Country</li>
          </ul>
        `;
        bkContainer.innerHTML = result;
      });
    }

    static listSection = () => {
      listLink.addEventListener('click', () => {
        window.location.reload();
      });
    }
}

document.addEventListener('DOMContentLoaded', () => {
  // add books to the dom after the page has loaded
  Books.addUi();
  // add book method
  Books.addBooks();
  // delete book method
  Books.deleteBk();
  // contact section
  Books.contactSection();
  // List all books
  Books.listSection();
  // title cont
  titleCont.style.display = 'block';
});
