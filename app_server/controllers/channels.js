var request = require('request'); 
var moment = require('moment');
var apiOptions = { 
  server: 'http://localhost:3000/api'
};

  var renderHomePage = function(req, res, responseBodyChannelList) { 
    res.render('homePage', {
        title: 'Fastchat',
        channels: responseBodyChannelList,
    });
  
  };

  var renderChannelPage = function(req, res, responseBodyChannelList, responseBodyChannel) { 
    res.render('chatChannel', {
        title: 'Fastchat',
        channels: responseBodyChannelList,
        channel: responseBodyChannel
    });
  
  };

  var renderChannelMessages = function(req, res, responseBodyChannelList, responseBodyMessage) { 
    res.render('chatMessages', {
        title: 'Fastchat',
        channels: responseBodyChannelList,
        messages: responseBodyMessage,
        moment: moment
    });
  
  };

  var renderNewChannelPage = function(req, res, responseBodyChannelList) { 
    res.render('newChannel', {
        title: 'Fastchat',
        channels: responseBodyChannelList,
    });
  
  };

  var renderEditChannelPage = function(req, res, responseBodyChannelList, responseBodyChannel) { 
    res.render('editChannel', {
        title: 'Fastchat',
        channels: responseBodyChannelList,
        channel: responseBodyChannel
    });
  
  };
  

/* GET home page. */
module.exports.homelist = function(req, res, next) {
    var pathChannelList = '/channels';

    var requestOptionsChannelList = { 
        url: apiOptions.server + pathChannelList,
        method: 'GET',
        json: {},
        qs: {}
    };

    request(requestOptionsChannelList, function(err, response, responseBodyChannelList) { 
        renderHomePage(req, res, responseBodyChannelList); 
    });
}

/* GET channel page */
module.exports.enterChannel = function(req, res, next) {
    var pathChannelList = '/channels';
    var pathChannel = '/channels/' + req.params.channelid;

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
    request(requestOptionsChannelList, function(err, response, responseBodyChannelList) { 
        request(requestOptionsChannel, function(err, response, responseBodyChannel) { 
            renderChannelPage(req, res, responseBodyChannelList, responseBodyChannel); 
        });
    });
}

  /* GET messages from a channel */
  module.exports.channelMessages = function(req, res, next) {
    var pathChannelList = '/channels';
    var pathMessages = '/channels/5ce03b6d0a1ee63e983e0582/messages';

    var requestOptionsChannelList = { 
        url: apiOptions.server + pathChannelList,
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
        request(requestOptionsMessage, function(err, response, responseBodyMessage) { 
            renderChannelMessages(req, res, responseBodyChannelList, responseBodyMessage); 
        });
    });

    
}

/* GET new channel page. */
module.exports.newChannel = function(req, res, next) {
    var pathChannelList = '/channels';

    var requestOptionsChannelList = { 
        url: apiOptions.server + pathChannelList,
        method: 'GET',
        json: {},
        qs: {}
    };

    request(requestOptionsChannelList, function(err, response, responseBodyChannelList) { 
        renderNewChannelPage(req, res, responseBodyChannelList); 
    });
}

/* GET new channel page. */
module.exports.editChannel = function(req, res, next) {
    var pathChannelList = '/channels';
    var pathChannel = '/channels/' + req.params.channelid;

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
    request(requestOptionsChannelList, function(err, response, responseBodyChannelList) { 
        request(requestOptionsChannel, function(err, response, responseBodyChannel) { 
            renderEditChannelPage(req, res, responseBodyChannelList, responseBodyChannel); 
        });
    });
}


/* POST Add message to the chat*/
module.exports.addMessage = function(req, res){
    var path = '/channels/' + req.params.channelid + "/messages";
    var postData = {
        author : 'Unknown',
        messageText : req.body.messageText,
    };

    var requestOptions = { 
        url: apiOptions.server + path,
        method: 'Post',
        json: postData
    };
  
    request(requestOptions, function(err,response,body){
      if (response.statusCode === 201) {
          res.redirect('/channel/' + req.params.channelid);
      }
  
    });
  };