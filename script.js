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
bookApp.getList = function() {

        $.ajax({
            url:'https://api.nytimes.com/svc/books/v3/lists?api-key=bMG46sv2E3bGGar6zGp9djz6GRhQy78B',
            method: 'GET',
            dataType: 'json',
            data: {
                ////// TO-DO: Find out how to get multiple lists and display when radio button clicked
                list: 'picture-books',
            }
                }).then(function(result) {
                ///// TO DO: Need some kind of loop here to get each result
                // TEST CODE: console.log(result.results[0].book_details[0].title);
                    console.log(result); 
                });

    };

bookApp.displayList = function() {

// To grab the value from the radio button
////// TO DO: Need to connect the value to the result from the AJAX API
////// TO DO: To display one default list first

    // On change, grab the selected item from input
    $('input').on('change', function(event) {
        const grabItem = $(this).val();
        console.log(grabItem);
    });

    /////// To append book details with either forEach() or map()
    // const ranking = 
    // const title = 
    // const author =
    // const description =
    // const purchaseLink = 
}

// To initialize the app
bookApp.init = function() {
    bookApp.scroll();
    bookApp.getList();
    bookApp.displayList();
}

// Document ready
$(function() {
    bookApp.init();
})