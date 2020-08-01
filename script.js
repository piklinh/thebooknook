const bookApp = {};

bookApp.scroll = function(event) {
    $('button').on('click', function(event) {
    
        $('html').animate( {
            scrollTop: $('main').offset().top}, 1000);
    });
};
 

// // Type parameter will return data based on given variable - b

// // variables for book category created for type - b
const pictureBooks = "picture-books";
const childrenMiddleGrade = "Childrens Middle Grade Hardcover";
const seriesBooks = "Series Books";


// // TO DO: Is there a way to use this instead of listing it on the URL
// bookApp.key = "bMG46sv2E3bGGar6zGp9djz6GRhQy78B"

// // Gets book list from the third-party API using AJAX request 
// // 

// // Create a generic api calling function called getList which will accept 1 parameter which is type -  it will get the data which is passed from parameter 

bookApp.getList = function(type) {


        $.ajax({
            url:'https://api.nytimes.com/svc/books/v3/lists?api-key=bMG46sv2E3bGGar6zGp9djz6GRhQy78B',
            method: 'GET',
            dataType: 'json',
            data: {
                ////// TO-DO: Find out how to get multiple lists and display when radio button clicked - solved 
                list: `${type}`, 
                // "picture-books"
            }

                }).then(function(result) {
                ///// TO DO: Need some kind of loop here to get each result
                
                // TEST CODE: console.log(result.results[0].book_details[0].title);
                    // bookApp.getFormatData(result)
                let showResults = result.results.map(val => (val))
                console.log( showResults);

                let amazon =  showResults.map(val => (val.amazon_product_url))
                // console.log(amazon);

                let bookDetails = showResults.map(val => (val.book_details[0].author))
                // console.log(bookDetails);
                

                });

    };

// 
//     // function for all radio buttons - Will pass type on radio button selection - the type will be passed through get list function - b

    bookApp.radioButtonChangeHandler = function (type) {
        bookApp.getList(type)
    }


//     // changehandler function of radio button to push the each type variable -b
    
    $('#pictureBook').on('change', function () {
        bookApp.radioButtonChangeHandler(pictureBooks)
    });
    
    $('#childrenBook').on('change', function () {
        bookApp.radioButtonChangeHandler(childrenMiddleGrade)
    });
    
    $('#seriesBook').on('change', function () {
        bookApp.radioButtonChangeHandler(seriesBooks)
    });


// bookApp.displayList = function() {

// // To grab the value from the radio button
// ////// TO DO: Need to connect the value to the result from the AJAX API
// ////// TO DO: To display one default list first

//     // On change, grab the selected item from input 
//     // $('input').on('change', function(event) {
//     //     const grabItem = $(this).val();
//     //     console.log(grabItem);
//     // });

//     /////// To append book details with either forEach() or map()

//     // 
//     //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> $.each to result to iterate through array  -  create template literals use this function<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//     // const ranking = 
//     // const title = 
//     // const author =
//     // const description =
//     // const purchaseLink = 
// }

// // To initialize the app
bookApp.init = function() {
    bookApp.scroll();
    bookApp.getList();
    // bookApp.displayList();
}




// Document ready
$(function() {
    bookApp.init();
})