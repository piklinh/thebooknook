const bookApp = {};

bookApp.scroll = function(event) {
    $('button').on('click', function(event) {
    
        $('html').animate( {
            scrollTop: $('main').offset().top}, 1000);
    });
};

// TO DO: Is there a way to use this instead of listing it on the URL
bookApp.key = "bMG46sv2E3bGGar6zGp9djz6GRhQy78B"

// Gets book list from the third-party API using AJAX request 

// bookApp.getFormatData = function(data){
//     data.forEach(result => {
//     });
// }


// Type parameter will return data based on given variable 
// Create variables for each book category that was created specifically for type 
const pictureBooks = "picture-books";
const childrenMiddleGrade = "childrens-middle-grade";
const seriesBooks = "series-books";

// Create a generic api calling function called getList which will accept 1 parameter which is type -  it will get the data which is passed from parameter 

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
            console.log(result.results);

            // Use the forEach method to loop through the array
            // It contains a callback function with each element of the array
            // The elements of the array are stored into the parameter of el
            res.forEach((el) =>{
                console.log(el);

                // The data is then appended to the div of booklist
                // TO-DO: To append the items properly into the HTML (e.g. button)
                    $('.bookList').append(`
                        <div>
                            <p>${el.rank}</p>
                            <h2>${el.book_details[0].title}</h2>
                            <p>${el.book_details[0].author}</p>
                            <p>Book Description: ${el.book_details[0].description}</p>
                            <button>${el.amazon_product_url}</button>   
                        </div>
                    `);

                })

            })
}

// function for all radio buttons - Will pass type on radio button selection - the type will be passed through get list function - b

bookApp.radioButtonChangeHandler = function (type) {
    bookApp.getList(type)
}

// changehandler function of radio button to push the each type variable -b

$('#pictureBook').on('change', function () {
    bookApp.radioButtonChangeHandler(pictureBooks)
});

$('#childrenBook').on('change', function () {
    const childrenBookRes = bookApp.radioButtonChangeHandler(childrenMiddleGrade)
});

$('#seriesBook').on('change', function () {
    const seriesBookRes = bookApp.radioButtonChangeHandler(seriesBooks)
});

// TO-DO: Figure out a way to hide/empty/detach the information that is not needed in the app
// TO-DO: Leaving the commented out area below as we try to figure out how to resolve this

// When User clicked on the input of 'bookCategory', the input that is checked will return a value
// The value will be stored in a variable called radioValue

// $("input[name='bookCategory']").click(function() {
//     const radioValue = $("input[name='bookCategory']:checked").val();

// // If radioValue is pictureBook, it should hide/empty/detach the results of the others
//     if (radioValue === 'pictureBook') {
//         console.log('This is picture book');
//         $('childrenBookRes').hide();
//         $('seriesBookRes').hide();
//     } else if (radioValue === 'childrenBook') {
//         $('pictureBookRes').hide();
//         $('seriesBookRes').hide();
//     } else (radioValue === 'seriesBook')
//         $('pictureBookRes').hide();
//         $('childrenBookRes').hide();
// })


// To initialize the app
bookApp.init = function() {
    bookApp.scroll();
    bookApp.getList();
    // bookApp.displayList();
}

// Document ready
$(function() {
    bookApp.init();
})