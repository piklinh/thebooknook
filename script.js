const bookApp = {};

bookApp.scroll = function(event) {
    $('button').on('click', function(event) {
    
        $('html').animate( {
            scrollTop: $('main').offset().top}, 1000);
    });
};


// // TO DO: Is there a way to use this instead of listing it on the URL
// bookApp.key = "bMG46sv2E3bGGar6zGp9djz6GRhQy78B"

// Type parameter will return data based on given variable 
// Create variables for each book category that was created specifically for type 
const pictureBooks = "picture-books";
const childrenMiddleGrade = "childrens-middle-grade";
const seriesBooks = "series-books";

// // Gets book list from the third-party API using AJAX request 
// // Create a generic api calling function called getList which will accept 1 parameter which is type -  it will get the data which is passed from parameter 


bookApp.getList = function(type) {

        $.ajax({
        url:'https://api.nytimes.com/svc/books/v3/lists?api-key=bMG46sv2E3bGGar6zGp9djz6GRhQy78B',
        method: 'GET',
        dataType: 'json',
        data: {
            list: `${type}`, 
            }

        // Once the Ajax request is resolved successfully, use .then method to return a value that is stored in the result parameter
        }).then(function(result) {
            
            // The result parameter initially contains an object, and the information that we needed is in an array called results 
            // Created a variable called res to store the array
            const res = result.results;

            // Empties the text of the bookList div before forEach runs a loop
            $('.bookList').text("");

            // Use the forEach method to loop through the array
            // It contains a callback function with each element of the array
            // The elements of the array are stored into the parameter of el
            res.forEach((el) =>{

                // The data is then appended to the div of booklist
                    $('.bookList').append(`
                        <div class="bookContainer">
                            <div class="rankContainer">
                                <p class="ranking">${el.rank}</p>
                            </div>
                            <div class="infoContainer">
                                <h2>${el.book_details[0].title}</h2>
                                <h3>${el.book_details[0].author}</h3>
                                <p class="bookDescription">Book Description:</p>
                                <p class="bookDescription">${el.book_details[0].description}</p>
                                <button class="productUrl"><a href="${el.amazon_product_url}">Get a copy!</a></button>   
                            </div>
                        </div>
                    `);
                })
            })
}

// function for all radio buttons - Will pass type on radio button selection - the type will be passed through get list function - b

bookApp.radioButtonChangeHandler = function (type) {
    bookApp.getList(type)

// changehandler function of radio button to push the each type variable -b
    
    $('#pictureBook').on('change', function () {
        bookApp.radioButtonChangeHandler(pictureBooks);
    });
    
    $('#childrenBook').on('change', function () {
      bookApp.radioButtonChangeHandler(childrenMiddleGrade) 
    });
    
    $('#seriesBook').on('change', function () {
        bookApp.radioButtonChangeHandler(seriesBooks)
    });
}


// To initialize the app
bookApp.init = function() {
    bookApp.scroll();
    bookApp.getList();
}

// Document ready
$(function() {
    bookApp.init();
})