const libraryContainer = document.querySelector('#library');
const form = document.querySelector('#form');

// form submit event
form.addEventListener('submit', (e) => {
    e.preventDefault;
    Library.clearRender();
    // make new book from inputs
    let titleInput = document.querySelector('#title').value;
    let authorInput = document.querySelector('#author').value;
    let pagesInput = document.querySelector('#pageno').value;
    let completedInput = (document.querySelector('#completed').checked) ? 'Completed' : 'Incomplete';
    // add to library
    const new_book = new Book(titleInput, authorInput, pagesInput, completedInput);
    Library.addToLibrary(new_book);
    // render library
    Library.render();
    //clear form inputs
    form.reset();
})

// book and library methods
function Book(Title, Author, Pages, Completed) {
    this.title = Title;
    this.author = Author;
    this.pages = Pages;
    this.completed = Completed;
}

const Library = {
    books : [],
    addToLibrary(book) {
        this.books.push(book);
    },
    removeFromLibrary(book) {
        Library.books = this.books.filter(item => item !== book);
    }, 
    render() {
        // renders all books in Library.books
        Library.books.forEach(book => {
            libraryContainer.innerHTML +=  `<div class="card">        
            <div>Title: ${book.title}</div>
            <div>Author: ${book.author}</div>
            <div>Page number: ${book.pages}</div>
            <div>${book.completed}</div>
        </div>`; 
        })
    },
    clearRender() {
        libraryContainer.innerHTML = '';
    }
}

