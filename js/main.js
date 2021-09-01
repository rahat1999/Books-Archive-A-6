const getBooks = document.getElementById('get-books')
const searchInput = document.getElementById('search-input');

const loadBookArchive = () => {
    const searchByName = searchInput.value;
    // error masssage;
    if(searchByName ===''){
        document.getElementById('errors').innerText='Search Field Empty'
    }
    else{

        document.getElementById('errors').innerText=''
        const url = `http://openlibrary.org/search.json?q=${searchByName}`
        fetch(url)
            .then(res => res.json())
            .then(data =>displayBookArchive(data.docs))
          /*----clear input tex-t---*/
            searchInput.value=""
            document.getElementById('get-books').innerHTML=''
    }
    }
    

const displayBookArchive = books => {
    // console.log(books)
        if(books.length===0){
            document.getElementById('errors').innerText='Result not Found'
        }
        else{
            books.forEach(book => {
                document.getElementById('errors').innerText=''
                const div = document.createElement('div')
                div.classList.add('col')
                div.innerHTML = `
                    <div class="card h-100">
                    <img  src="https://covers.openlibrary.org/b/id/${book?.cover_i?book?.cover_i:554106}-M.jpg" class="card-img-top h-75" alt="Books image">
                    <div class="card-body bg-dark text-warning text-center">
                    <h5 class="card-title">${book.title}</h5>
                    <h5>${book.author_name}</h5>
                    <h5>${book.first_publish_year}</h5>
                    </div>
                </div>
                    `
                getBooks.appendChild(div)
        
            });
        }
   
}

