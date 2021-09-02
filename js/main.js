const getBooks = document.getElementById('get-books');
const searchInput = document.getElementById('search-input');
document.getElementById('spinner').style.display='none';
const loadBookArchive = () => {
    const searchByName = searchInput.value;
        // error masssage;
        if(searchByName ===''){
            document.getElementById('errors').innerText='Search Field Empty';
        }
        else{
            /*---show spinner---*/
             document.getElementById('spinner').style.display='block';
            /*  'clear error msg' */
            document.getElementById('errors').innerText='';
            
            const url = `http://openlibrary.org/search.json?q=${searchByName}`
            fetch(url)
                .then(res => res.json())
                .then(data =>displayBookArchive(data.docs))
                /*----clear---*/
                searchInput.value=""
                document.getElementById('get-books').innerHTML='';
        }
    }

        const displayBookArchive = books => {
         /* hide spinner */
         document.getElementById('spinner').style.display='none';
       /*----each book total----*/
        document.getElementById('total').innerText=`Total: ${books.length} Books`
        if(books.length===0){
            document.getElementById('errors').innerText='No Result Found'
        }
        else{
            books.forEach(book => {
                document.getElementById('errors').innerText='';
                const div = document.createElement('div');
                div.classList.add('col')
                div.innerHTML = `
                    <div class="card h-100">
                    <img  src="https://covers.openlibrary.org/b/id/${book?.cover_i?book?.cover_i:554106}-M.jpg" class="card-img-top h-75 bg-success" alt="Books image">
                    <div class="card-body bg-dark text-warning">
                    <p class="card-title">Book Name : <b>${book?.title?book.title:'N/a'}</b></p>
                    <p>Authour Name : <b>${book.author_name}</b></p>
                    <p>Publisher : <b>${book.publisher}</b></p>
                    <p>First Publish Year : <b>${book?.first_publish_year?book.first_publish_year:'N/a'}</b></p>
                    </div>
                </div>
                    `
                getBooks.appendChild(div);
        
            });
        }
   
}

