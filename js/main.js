/* eslint-disable linebreak-style */
// get dom elements
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#btn-add');
const allBks = document.querySelector('#all-books');
const error = document.querySelector('#error');

// get elements from the local storage if available
let books = JSON.parse(localStorage.getItem('books'));
// books class
class Books {
  // add new books
  static addBooks = () => {
    addBtn.addEventListener('click', () => {
      const bkTitle = title.value;
      const bkAuthor = author.value;

      // check if the input value is empty
      if (bkTitle === '' || bkAuthor === '') {
        error.style.display = 'block';
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

    // add books to ui
    static addUi = () => {
      let result = '';
      if (Books.getBooksLs() === null) {
        allBks.innerHTML = '<h3 class="empty">There are no books available !</h3>';
        return;
      }
      if (books.length === 0) {
        allBks.innerHTML = '<h3 class="empty">There are no books available !</h3>';
        return;
      }
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
}

document.addEventListener('DOMContentLoaded', () => {
  // add books to the dom after the page has loaded
  Books.addUi();
  // add book method
  Books.addBooks();
  // delete book method
  Books.deleteBk();
});
