const bookApp = {};

// Gets book list from the third-party API using AJAX request
bookApp.getList = (listName) => {

        $.ajax({
        url: `https://api.nytimes.com/svc/books/v3/lists/${listName}.json?api-key=bMG46sv2E3bGGar6zGp9djz6GRhQy78B`,
        method: 'GET',
        dataType: 'json',

        // Once the Ajax request is resolved successfully, use .then method to return a value that is stored in the result parameter
        }).then((res) => {
            
            // The result parameter initially contains an object, and the information that we needed is in an array called results 
            // Created a variable called bookRes to store the array
            const bookRes = res.results.books;
            console.log(res.results.books);

            // Empties the text of the bookList div before forEach runs a loop
            $('.bookList').text("");

            // Use the forEach method to loop through the array, with a callback function containing the elements of the array, which are then stored in the parameter of 'el'
            bookRes.forEach((el) => {

                // The data is then appended to the div of booklist
                    $('.bookList').append(`
                        <div class="bookContainer">
                            <div class="rankContainer">
                                <img src="${el.book_image}" alt="${el.description}">
                            </div>
                            <div class="infoContainer">
                                <p class="ranking">${el.rank}</p>
                                <h2>${el.title}</h2>
                                <h3>${el.author}</h3>
                                <p class="bookDescription">Book Description:</p>
                                <p class="bookDescription">${el.description}</p>
                                <button href="${el.amazon_product_url}" class="productUrl">Get a copy!</button>
                            </div>
                        </div>
                    `);
                })
            })
    }

// Button that listens to input and updates the value
bookApp.eventListener = () => {
    $('input').on('change', function() {
        const bookInput = $(this).val();

        bookApp.getList(bookInput)
        console.log(bookInput);
    })
}

// Scroll button for the header to top of page to start reading
bookApp.scroll = () => {
    $('button').on('click', function() {
    
        $('html').animate( {
            scrollTop: $('main').offset().top}, 1000);
    });
};

// To initialize the app
bookApp.init = () => {
    bookApp.scroll();
    bookApp.eventListener();
    bookApp.getList();
}

// Document ready
$(function() {
    bookApp.init();
})

// TO DO: Add three more book categories
// TO DO: Add button in the end, it should appear after the list is generated. Might have to setTimeOut
// TO DO: Re-style some elements