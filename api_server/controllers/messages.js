var channels = require('../models/channels');
var mongoose = require('mongoose');
var Cha = mongoose.model('Channel');

module.exports.messagesList = function(req, res) {
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
            .send(channel.messages);
          }
        }
      });  
};

module.exports.messagesFindById = function(req, res) {
    Cha.findById(req.params.channelid, function(err, channel) {
        var message;
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
            //Informar que channel está vacío
            return res
            .status(400)
            .send({message: 'Bad Request'});
          }else
          {
            if (channel.messages && channel.messages.length > 0) 
            {
                message = channel.messages.id(req.params.messageid);

                if(!message)
                {
                    //Informar que message está vacío
                    return res
                    .status(400)
                    .send({message: 'No message with this id'});
                }else
                {
                    return res
                    .status(200)
                    .send(message);
                }
            }else 
            {
                return res
                .status(400)
                .send({message: 'No messages found'});
            }
          }
        }
      });  
};

module.exports.messagesUpdate = function(req, res) {
    return res
    .status(200)
    .send({message: 'messagesUpdate', channelid: req.params.channelid, messageid: req.params.messageid});
};

module.exports.messagesCreate = function(req, res) {
    return res
    .status(201)
    .send({message: 'messagesCreate', channelid: req.params.channelid});
};

module.exports.messagesDelete = function(req, res) {
    return res
    .status(204)
    .send({message: 'messagesDelete', channelid: req.params.channelid, messageid: req.params.messageid});
};