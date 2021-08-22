const libraryContainer = document.querySelector('#library');
const form = document.querySelector('#form');

// form submit event
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
    
    function resetLabel(label) {
        switch (label) {
            case titleInput:
                label.innerHTML = titleInput.innerHTML;
                break;

            case authorInput:
                label.innerHTML = authorInput.innerHTML;
                break;

            case pagesInput:
                label.innerHTML = pagesInput.innerHTML;
                break;
            
        }
    }
    // make empty inputs have red border
    // remove red border if field was previously empty and is now filled
    if (inputs.map(elt => elt.value).includes('')) {
        inputs.forEach(elt => {
            let warningMessage = `<span class="empty-warning">This field is required</span>`;
            if (elt.classList.contains('border-warning')) {
                elt.classList.remove('border-warning');
                resetLabel(elt.previousSibling);
            }

            if (elt.value == '') {
                elt.classList.add('border-warning');
                (!elt.previousElementSibling.innerHTML.includes(warningMessage)) ?
                elt.previousElementSibling.innerHTML += warningMessage : '';
            }

            
            Library.clearRender();
            Library.render();
        })
        // don't add the empty book, return early
        return;
    }
    

    const new_book = new Book(titleInput.value, authorInput.value, pagesInput.value, completedInput);
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

        const card = document.createElement('div');
        card.classList.add('card'); 

        const titleText = document.createElement('div');
        titleText.innerText = `Title: ${book.title}`;

        const authorText = document.createElement('div');
        authorText.innerText = `Author: ${book.author}`;

        const pageText = document.createElement('div');
        pageText.innerText = `Page number: ${book.pages}`;

        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('btn');
        toggleBtn.classList.add('toggle-btn');
        toggleBtn.innerText = `${book.completed}`;
        (book.completed == 'Completed') ? toggleBtn.classList.add('btn-primary') : toggleBtn.classList.add('btn-secondary');

        card.appendChild(titleText);
        card.appendChild(authorText);
        card.appendChild(pageText);
        card.appendChild(toggleBtn);
        libraryContainer.appendChild(card);

        //toggle completed button
        toggleBtn.addEventListener('click', (e) => {
            let btn = e.target;
            btn.classList.toggle('btn-primary');
            btn.classList.toggle('btn-secondary');
            (btn.innerText == 'Completed') ? btn.innerText = 'Incomplete' : btn.innerText = 'Completed'; 
        });

        });
    },
    clearRender() {
        libraryContainer.innerHTML = '';
    }
}

