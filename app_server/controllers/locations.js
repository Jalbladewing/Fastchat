var request = require('request'); 
var apiOptions = { 
  server: 'http://localhost:3000/api'
};

var renderLocationsPage = function(req, res, responseBody) { 
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi', 
        pageHeader:
        {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        channels: responseBody 
    });
  
  };

/* GET home page. */
module.exports.homelist = function(req, res, next) {
    var path = '/channels';
    var requestOptions = { 
        url: apiOptions.server + path,
        method: 'GET',
        json: {},
        qs: {}
    };

    request(requestOptions, function(err, response, responseBody) { 
        renderLocationsPage(req, res, responseBody); 
    });
}

/* GET 'Location info' page. */
module.exports.locationInfo = function(req, res, next) {
    res.render('location-info', { title: 'Location info' });
}

/* GET 'Add review' page. */
module.exports.addReview = function(req, res, next) {
    res.render('location-review-form', { title: 'Add review' });
}