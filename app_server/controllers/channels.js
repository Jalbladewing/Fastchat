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
        channel: responseBodyChannel,
        myVar: 'My Data'
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
    var pathMessages = '/channels/' + req.params.channelid + '/messages';

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

/* POST Create channel*/
module.exports.createChannel = function(req, res){
    var path = '/channels';
    var postData = {
        name : req.body.name,
        description : req.body.description,
    };

    var requestOptions = { 
        url: apiOptions.server + path,
        method: 'Post',
        json: postData
    };
  
    request(requestOptions, function(err,response,body){
      if (response.statusCode === 201) {
          res.redirect('/newChannel');
      }
  
    });
  };

/* PUT Create channel*/
module.exports.modifyChannel = function(req, res){
    var path = '/channels/' + req.params.channelid;
    var putData = {
        name : req.body.name,
        description : req.body.description,
    };

    var requestOptions = { 
        url: apiOptions.server + path,
        method: 'Put',
        json: putData
    };
  
    request(requestOptions, function(err,response,body){
      if (response.statusCode === 200) {
          res.redirect('/editChannel/' + req.params.channelid);
      }
  
    });
  };

/* DELETE Remove channel*/
module.exports.deleteChannel = function(req, res){
    var path = '/channels/' + req.params.channelid;

    var requestOptions = { 
        url: apiOptions.server + path,
        method: 'Delete',
        json: {},
        qs: {}
    };
  
    request(requestOptions, function(err,response,body){
      if (response.statusCode === 204) {
          res.redirect('/');
      }
  
    });
  };