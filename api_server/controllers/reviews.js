var locations = require('../models/locations');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

module.exports.reviewsList = function(req, res) {
    Loc.findById(req.params.locationid, function(err, location) {
        if(err)
        {
          //Dar respuesta al error
          return res
          .status(404)
          .send({message: 'No location with this id'});
        }else
        {
          if(!location)
          {
            //Informar que location está vacío
            return res
            .status(400)
            .send({message: 'Bad Request'});
          }else
          {
            return res
            .status(200)
            .send(location.reviews);
          }
        }
      });  
};

module.exports.reviewsFindById = function(req, res) {
    Loc.findById(req.params.locationid, function(err, location) {
        var review;
        if(err)
        {
          //Dar respuesta al error
          return res
          .status(404)
          .send({message: 'No location with this id'});
        }else
        {
          if(!location)
          {
            //Informar que location está vacío
            return res
            .status(400)
            .send({message: 'Bad Request'});
          }else
          {
            if (location.reviews && location.reviews.length > 0) 
            {
                review = location.reviews.id(req.params.reviewid);

                if(!review)
                {
                    //Informar que review está vacío
                    return res
                    .status(400)
                    .send({message: 'No review with this id'});
                }else
                {
                    return res
                    .status(200)
                    .send(review);
                }
            }else 
            {
                return res
                .status(400)
                .send({message: 'No reviews found'});
            }
          }
        }
      });  
};

module.exports.reviewsUpdate = function(req, res) {
    return res
    .status(200)
    .send({message: 'reviewsUpdate', locationid: req.params.locationid, reviewid: req.params.reviewId});
};

module.exports.reviewsCreate = function(req, res) {
    return res
    .status(201)
    .send({message: 'reviewsCreate', locationid: req.params.locationid});
};

module.exports.reviewsDelete = function(req, res) {
    return res
    .status(204)
    .send({message: 'reviewsDelete', locationid: req.params.locationid, reviewid: req.params.reviewId});
};