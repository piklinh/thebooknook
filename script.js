

$.ajax({
    url:'https://api.nytimes.com/svc/books/v3/lists?api-key=bMG46sv2E3bGGar6zGp9djz6GRhQy78B',
    method: 'GET',
    dataType: 'json',
    data: {
        list: 'picture-books',
    }
        }).then(function(result) {
        // console.log(result.results[0].book_details[0].title);
            console.log(result);
        });