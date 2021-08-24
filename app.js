const libraryContainer = document.querySelector('#library');
const form = document.querySelector('#form');

// on load, add all localStorage to Library.books 
// 
// render
window.addEventListener('load', () => {
    Library.clearRender();
    let keys = Object.keys(localStorage);
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
        Library.books.push((JSON.parse(localStorage[keys[i]])));
    }
    Library.render();
});

// SUBMIT
form.addEventListener('submit', (e) => {
    e.preventDefault;
    Library.clearRender();
    // make new book from inputs
    let titleInput = document.querySelector('#title');
    let authorInput = document.querySelector('#author');
    let pagesInput = document.querySelector('#pageno');
    let completedInput = (document.querySelector('#completed').checked) ? 'Completed' : 'Incomplete';
    // add to library
    let inputs = [titleInput, authorInput, pagesInput];
    
    
    
    // Check each input and add/remove red border, add/remove border warning 
    function decorateInputs() {
        inputs.forEach(elt => {
            let warningMessage = `<span class="empty-warning">This field is required</span>`;
        
        if (elt.value == '') {
            elt.classList.add('border-warning');
            (!elt.previousElementSibling.innerHTML.includes(warningMessage)) ? // if no warning message, add warning message
            elt.previousElementSibling.innerHTML += warningMessage : '';

            // else, non-empty input, remove red border and warning message
            // since warning message always accompanies red border, sufficient to just check for red border
        } else if  (elt.classList.contains('border-warning')) { 
            elt.classList.remove('border-warning'); 
            elt.previousElementSibling.innerHTML = elt.previousElementSibling.innerHTML.split('<')[0];
            }
        
    })
    }
    // make empty inputs have red border
    // remove red border if field was previously empty and is now filled
    if (inputs.map(elt => elt.value).includes('')) {
        decorateInputs();
        Library.clearRender();
        Library.render();

        // don't add the empty book, return early
        return;
    }
    
    // when book successfully added, reset all borders, leave none red
    decorateInputs();

    const new_book = new Book(titleInput.value, authorInput.value, pagesInput.value, completedInput);
    Library.addToLibrary(new_book);

    // add new book to localStorage
    localStorage.setItem(`${new_book.title}`, JSON.stringify(new_book));

    // render library
    Library.render();
    //clear form inputs
    form.reset();
});

// book and library methods
function Book(Title, Author, Pages, Completed) {
    this.title = Title;
    this.author = Author;
    this.pages = Pages;
    this.completed = Completed;
}

// Library methods, 
// addToLibrary, removeFromLibrary, render, clearRender, 
// toggle, remove button EventListeners
const Library = {
    books : [],
    addToLibrary(book) {
        this.books.push(book);
    },
    removeFromLibrary(book) {
        Library.books = this.books.filter(item => item !== book);
        localStorage.removeItem(book.title);
    }, 
    render() {
        // add localStorage to Library.books
        // for al
        //localStorage.forEach(item => console.log(item));

        // renders all books in Library.books
        Library.books.forEach(book => {

        const card = document.createElement('div');
        card.classList.add('card'); 

        const removeBtn = document.createElement('div');
        removeBtn.classList.add('remove-btn');
        removeBtn.innerHTML = 'remove';

        const titleText = document.createElement('div');
        titleText.innerHTML = `<b>Title</b>: ${book.title}`;

        const authorText = document.createElement('div');
        authorText.innerHTML = `<b>Author</b>: ${book.author}`;

        const pageText = document.createElement('div');
        pageText.innerHTML = `<b>Page number</b>: ${book.pages}`;

        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('btn');
        toggleBtn.classList.add('toggle-btn');
        toggleBtn.style.marginTop = '20px';
        toggleBtn.innerText = `${book.completed}`;
        (book.completed == 'Completed') ? toggleBtn.classList.add('btn-primary') : toggleBtn.classList.add('btn-secondary');

        card.appendChild(removeBtn);
        card.appendChild(titleText);
        card.appendChild(authorText);
        card.appendChild(pageText);
        card.appendChild(toggleBtn);
        libraryContainer.appendChild(card);

        // TOGGLE
        toggleBtn.addEventListener('click', (e) => {
            let btn = e.target;
            btn.classList.toggle('btn-primary');
            btn.classList.toggle('btn-secondary');
            (btn.innerText == 'Completed') ? btn.innerText = 'Incomplete' : btn.innerText = 'Completed';
            console.log(this.books);
        });

        // REMOVE
        removeBtn.addEventListener('click', () => {
            let bookTitle = titleText.innerHTML.split('</b>: ')[1]
            let bookToRemove = Library.books.find(book => book.title === bookTitle);
            Library.removeFromLibrary(bookToRemove);
            Library.clearRender();
            Library.render();
            
        });

        });
    },
    clearRender() {
        libraryContainer.innerHTML = '';
    }
}

// Local Storage
// localStorage.clear();
console.log(localStorage);

// window.localStorage.clear()