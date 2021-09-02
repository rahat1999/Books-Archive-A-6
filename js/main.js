/*-----global-------*/
const getBooks = document.getElementById('get-books');
const inputField = document.getElementById('input-field');
document.getElementById('spinner').style.display='none';

const loadBookArchive = () => {
    const searchByName = inputField.value;
        // error masssage;
        if(searchByName ===''){
            document.getElementById('errors').innerText='Search Field Empty';
            document.getElementById('total').innerText='';
            getBooks.innerHTML=''
        }
        else{
            /*---show spinner---*/
             document.getElementById('spinner').style.display='block';
            /*  'clear error msg' */
            document.getElementById('errors').innerText='';
            
            const url = `https://openlibrary.org/search.json?q=${searchByName}`
            fetch(url)
                .then(res => res.json())
                .then(data =>displayBookArchive(data))  
                /*----clear dom---*/
                document.getElementById('total').innerText=''
                inputField.value=""
                document.getElementById('get-books').innerHTML='';
        }
    }

        const displayBookArchive = data => {
            /*---- total result----*/
            document.getElementById('total').innerText=`Total Result Found: ${data.numFound}`
            const books =data.docs
         /* ------hide spinner------- */
         document.getElementById('spinner').style.display='none';
        if(books.length===0){
            document.getElementById('errors').innerText='No Result Found ☠';
        }
        else{
            books.forEach(book => {
                document.getElementById('errors').innerText='';
                const div = document.createElement('div');
                div.classList.add('col')
                div.innerHTML =`
                <div class="card h-100 p-2 rounded-2">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i:554106}-M.jpg" class="card-img-top" alt="...">

                    <div class="card-body bg-secondary">
                        <li class="card-text text-light">Book Name : <b class="text-warning">${book?.title?book.title:'N/a'}</li>
                        <li class="card-text text-light">Authour Name: <b class="text-warning">${book.author_name}</li>
                        <li class="card-text text-light">First Publish Year : <b class="text-warning">${book?.first_publish_year?book.first_publish_year:'N/a'}<b></li>
                    </div>
                </div>`
                
                getBooks.appendChild(div);
        
            });
        }
   
}

