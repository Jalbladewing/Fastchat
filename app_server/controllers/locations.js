var request = require('request'); 
var apiOptions = { 
  server: 'http://localhost:3000/api'
};

/*var renderLocationsPage = function(req, res, responseBodyChannel, responseBodyMessage) { 
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi', 
        pageHeader:
        {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        channels: responseBodyChannel,
        messages: responseBodyMessage
    });
  
  };*/

  var renderChannelPage = function(req, res, responseBodyChannelList, responseBodyChannel, responseBodyMessage) { 
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi', 
        pageHeader:
        {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        channels: responseBodyChannelList,
        channel: responseBodyChannel,
        messages: responseBodyMessage
    });
  
  };


/* GET home page. */
/*module.exports.homelist = function(req, res, next) {
    var pathChannel = '/channels';
    var pathMessages = '/channels/5ce03b6d0a1ee63e983e0582/messages';
    var requestOptionsChannel = { 
        url: apiOptions.server + pathChannel,
        method: 'GET',
        json: {},
        qs: {}
    };

    var requestOptionsMessage = { 
        url: apiOptions.server + pathMessages,
        method: 'GET',
        json: {},
        qs: {}
    };

    request(requestOptionsChannel, function(err, response, responseBodyChannel) { 
        request(requestOptionsMessage, function(err, response, responseBodyMessage) { 
            renderLocationsPage(req, res, responseBodyChannel, responseBodyMessage); 
        });
    });
}*/

/* GET home page. */
module.exports.homelist = function(req, res, next) {
    var pathChannelList = '/channels';
    var pathChannel = '/channels/5ce03b6d0a1ee63e983e0582';
    var pathMessages = '/channels/5ce03b6d0a1ee63e983e0582/messages';
    var requestOptionsChannelList = { 
        url: apiOptions.server + pathChannelList,
        method: 'GET',
        json: {},
        qs: {}
    };

    var requestOptionsChannel = { 
        url: apiOptions.server + pathChannel,
        method: 'GET',
        json: {},
        qs: {}
    };

    var requestOptionsMessage = { 
        url: apiOptions.server + pathMessages,
        method: 'GET',
        json: {},
        qs: {}
    };
    request(requestOptionsChannelList, function(err, response, responseBodyChannelList) { 
        request(requestOptionsChannel, function(err, response, responseBodyChannel) { 
            request(requestOptionsMessage, function(err, response, responseBodyMessage) { 
                renderChannelPage(req, res, responseBodyChannelList, responseBodyChannel, responseBodyMessage); 
            });
        });
    });
}

/* POST 'Add review' page */
module.exports.addMessage = function(req, res){
    var path = '/channels/5ce03b6d0a1ee63e983e0582/messages';
    var postData = {
        author : 'Jose',
        messageText : req.body.messageText,
    };

    var requestOptions = { 
        url: apiOptions.server + path,
        method: 'Post',
        json: postData
    };
  
    request(requestOptions, function(err,response,body){
      if (response.statusCode === 201) {
          res.redirect('/');
      }
  
    });
  };

/* GET 'Location info' page. */
module.exports.locationInfo = function(req, res, next) {
    res.render('location-info', { title: 'Location info' });
}

/* GET 'Add review' page. */
module.exports.addReview = function(req, res, next) {
    res.render('location-review-form', { title: 'Add review' });
}