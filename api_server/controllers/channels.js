var channels = require('../models/channels');
var mongoose = require('mongoose');
var Cha = mongoose.model('Channel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

/* GET findOne. */
module.exports.findOne = function(req, res) {
    Cha.findOne().exec( function (err, channel) {
        //sendJSONresponse(res, 200, location);
        return res
        .status(200)
        .send(channel);
    });
};

module.exports.channelsList = function(req, res) {
  Cha.find({}, function(err, channels) {
    if(err)
    {
      //Dar respuesta al error
      return res
      .status(404)
      .send({message: 'Error en la petición'});
    }else
    {
      if(!channels)
      {
        //Informar que locations está vacío
        return res
        .status(200)
        .send({message: 'No channels found'});
      }else
      {
        return res
        .status(200)
        .send(channels);
      }
    }
  });
};

module.exports.channelsCreate = function(req, res) {
  Cha.create( {
    name: req.body.name,
    description: req.body.description,
}, function(err, channel) {
    
    if(err)
    {
      return res
      .status(400)
      .send(err);
    }

    return res
    .status(201)
    .send(channel);
  })
};

module.exports.channelsFindById = function(req, res) {
  Cha.findById(req.params.channelid, function(err, channel) {
    if(err)
    {
      //Dar respuesta al error
      return res
      .status(404)
      .send({message: 'No channel with this id'});
    }else
    {
      if(!channel)
      {
        //Informar que location está vacío
        return res
        .status(400)
        .send({message: 'Bad Request'});
      }else
      {
        return res
        .status(200)
        .send(channel);
      }
    }
  });
};

module.exports.channelsUpdate = function(req, res) {
  Cha.findById(req.params.channelid,function(err, channel) {
    if(err)
    {
      //Dar respuesta al error
      return res
      .status(404)
      .send({message: 'No channel with this id'});
    }else
    {
      if(!channel)
      {
        //Informar que location está vacío
        return res
        .status(400)
        .send({message: 'Bad Request'});
      }else
      {
        channel.name = req.body.name;
        channel.description = req.body.description;

        channel.save(function(err, location) {
          if (err) 
          {
            return res
          .status(400)
          .send({message: 'Bad Request'});

          } else {
            return res
            .status(200)
            .send(channel);
          }
        });
        
      }
    }
  });
};

module.exports.channelsDelete = function(req, res) {
  Cha.findByIdAndRemove(req.params.channelid, function (err, channel) {
    if(err)
    {
      //Informar del error
      return res
      .status(404)
      .send({message: "error"});
    }else if (!channel)
    {
      //Informar del error
      return res
      .status(404)
      .send({message: "channelid not found"});
    }
    //Informar del exito
    return res
    .status(204)
    .send(null);
    
  })
};