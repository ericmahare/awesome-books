/* eslint-disable linebreak-style */
// get dom elements
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#btn-add');
const allBks = document.querySelector('#all-books');
const error = document.querySelector('#error');

// get data from the local storage
let books = JSON.parse(localStorage.getItem('books'));

const fetchData = () => {
  let result = '';
  if (localStorage.getItem('books') === null) {
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
// add books to the dom after the page has loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

// store data to local storage
function storeBksToLs(bks) {
  const dataToStore = JSON.stringify(bks);
  localStorage.setItem('books', dataToStore);
  fetchData();
}

// add new books
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
  if (localStorage.getItem('books') === null) {
    bks = [];
  } else {
    bks = JSON.parse(localStorage.getItem('books'));
  }
  bks.push(newBook);

  books = bks;
  // store books to local storage
  storeBksToLs(bks);
  // update DOM
  fetchData();
  // clear the input fields
  title.value = '';
  author.value = '';
});

// delete books
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-xmark')) {
    const id = parseInt(e.target.dataset.id, 10);
    const bks = books.filter((book) => book.id !== id);
    books = bks;
    // update DOM content
    fetchData();
    // store updated data to local storage
    storeBksToLs(bks);
  }
});
