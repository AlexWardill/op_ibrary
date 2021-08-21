let myLibrary = [];

function Book(title_, author_, pages_, read_) {
    this.title = title_;
    this.author = author_;
    this.pages = pages_;
    this.read = read_;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function addBookToPage() {
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.innerText = book.title();
    })
}

const Hobbit = new Book('The Hobbit', 'J Tolkein', 349, true);
const Potter5 = new Book('Order of the Phoenix', 'JK Rowling', 579, true);

//addBookToLibrary(Hobbit);
//addBookToLibrary(Potter5);
/////////////////////////////////////////

const body = document.querySelector('body');
const modal = document.querySelector('#Modal')
const form = document.querySelector('form');
const formInputs = [
    ...document.querySelectorAll('input[type=text]'), 
    document.querySelector('input[type=number]'),
    document.querySelector('input[type=checkbox]')
]
const submitBtn = document.querySelector('#submit-btn');
const formData = new FormData(form);
const library = document.querySelector('#library');

form.addEventListener('submit', (e) => {
    e.preventDefault;
    makeNewBook();
    console.log("current library: " + myLibrary);

    renderLibrary();

    form.reset();
    return false;
});

function makeNewBook() {
    formData.append('title', document.querySelector('#title').value);
    formData.append('author', document.querySelector('#author').value);
    formData.append('number of pages', document.querySelector('#pageno').value);
    formData.append('completed', document.querySelector('#completed').checked);
    console.log(`completed.checked is ${document.querySelector('#completed').checked}`);
    // for(var pair of formData.entries()) {
    //     console.log(pair[0]+ ', '+ pair[1]);
    //  }
    //console.log(typeof(parseInt(formData.get('number of pages'))));
    const new_book = new Book(formData.get('title'), formData.get('author'), parseInt(formData.get('number of pages')), Boolean(document.querySelector('#completed').checked));
    //console.log(`boolean(formData.get('#completed)) = ${Boolean(formData.get('completed'))}`)
    addBookToLibrary(new_book);
}

function renderLibrary() {
    myLibrary.forEach(book => {
        console.log("book info: " + book.title, book.author, book.pages, book.read);
        let new_div = `<div class="card">        
        <div>Title: ${book.title}</div>
        <div>Author: ${book.author}</div>
        <div>Page number: ${book.pages}</div>
        <div id="completed-wrapper">
            <label for="card-checkbox">Completed</label>
            <input id="card-checkbox" type="checkbox" value="${book.read}">
        </div>
    </div>`;
        library.innerHTML += new_div;
    })
}

// add a property to each baok = 'rendered' : true/false
// so only render the books that haven't been rendered



