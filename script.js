const bookApp = {};

// Gets book list from the third-party API using AJAX request
bookApp.getList = (listName) => {

        $.ajax({
        url: `https://api.nytimes.com/svc/books/v3/lists/${listName}.json?api-key=bMG46sv2E3bGGar6zGp9djz6GRhQy78B`,
        method: 'GET',
        dataType: 'json',

        }).then((res) => {
            
            // Empties the text of the bookList div
            $('.bookList').empty();
            bookApp.displayList(res.results.books);

            const bookData = res.results.books;
            })
    }

bookApp.displayList = (bookRes) => {
    
    // Use the forEach method to loop through the array, with a callback function containing the elements of the array, which are then stored in the parameter of 'el'
    bookRes.forEach((el) => {

        const dataFromBookRes = el;
        // console.log(dataFromBookRes);

        // The data is then appended to the div of booklist
            $('.bookList').append(`
                <div class="bookContainer ${el.primary_isbn10}">
                    <div class="imageContainer">
                        <img src="${el.book_image}" alt="${el.description}">
                    </div>

                    <div class="contentContainer"> 
                        <div class="infoContainer">
                            <p class="ranking">${el.rank}</p>
                            <h2>${el.title}</h2>
                            <h3>${el.author}</h3>
                            <p class="bookDescription">Book Description:</p>
                            <p class="bookDescription bookDetails">${el.description}</p>
                            <a href="${el.amazon_product_url}" class="productUrl" target="_blank" rel="noopener noreferrer">Get a copy!</a>
                        </div>
                        <div class="buttonContainer">
                            <button class="addBook"><i class="fas fa-heart" value="${el.primary_isbn10}"></i></button>
                        </div>
                    </div>
                </div>
            `);
        })

        bookApp.addFav();
}

bookApp.addFav = () => {

    const dbRef = firebase.database().ref("fav");
        const $addBook = $('.addBook');

        $addBook.on('click', function(e, bookData) {
            
            // const btn = e.target.attributes.value.value;
            const btn = e.target;
            
            console.log(bookData);
            // console.log(btn);

            // const selectedBook = $(`.${btn}`).html();
            // console.log(selectedBook);

            // dbRef.push(selectedBook); 

            // console.log(selectedBook);
            // bookRes.forEach((el) => {
            //     // console.log(image);
    
            //     const bookToDb = {
            //         key: el.primary_isbn10,
            //         image: el.book_image,
            //         title: el.title,
            //         author: el.author
            //     }
    
            //     dbRef.push(bookToDb);
            // })

        })
}
// Button that listens to input and updates the value
bookApp.bookCategoryButton = () => {
    $('.bookCategoryButton').on('click', function(event) {
        event.preventDefault();
        const bookInput = $(this).val();

        bookApp.getList(bookInput)
    })
}

// Scroll button for the header to top of page to start reading
bookApp.scroll = () => {
    $('startButton').on('click', function() {
        $('html').animate( {
            scrollTop: $('main').offset().top}, 1000);
    });
};

// To initialize the app
bookApp.init = () => {
    bookApp.bookCategoryButton();
    bookApp.getList('picture-books');
}

// Document ready
$(function() {
    bookApp.init();
})

// TO DO: Managed to target specific item in displayed list to push to Firebase. To append data from Firebase to be displayed as saved/to-read list at the bottom of the page in a new section