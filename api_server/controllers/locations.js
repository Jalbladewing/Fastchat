var locations = require('../models/locations');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

/* GET findOne. */
module.exports.findOne = function(req, res) {
    Loc.findOne().exec( function (err, location) {
        //sendJSONresponse(res, 200, location);
        return res
        .status(200)
        .send(location);
    });
};

module.exports.locationsList = function(req, res) {
  Loc.find({}, function(err, locations) {
    if(err)
    {
      //Dar respuesta al error
      return res
      .status(404)
      .send({message: 'Error en la petición'});
    }else
    {
      if(!locations)
      {
        //Informar que locations está vacío
        return res
        .status(200)
        .send({message: 'No locations found'});
      }else
      {
        return res
        .status(200)
        .send(locations);
      }
    }
  });
};

module.exports.locationsCreate = function(req, res) {
  Loc.create( {
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1,
    }, {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2,
    }]
}, function(err, location) {
    
    if(err)
    {
      return res
      .status(400)
      .send(err);
    }

    return res
    .status(201)
    .send(location);
  })
};

module.exports.locationsFindById = function(req, res) {
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
        .send(location);
      }
    }
  });
};

module.exports.locationsUpdate = function(req, res) {
  return res
  .status(200)
  .send({message: 'locationsUpdate', locationid: req.params.locationid});
};

module.exports.locationsDelete = function(req, res) {
  Loc.findByIdAndRemove(req.params.locationid, function (err, location) {
    if(err)
    {
      //Informar del error
      return res
      .status(404)
      .send({message: "error"});
    }else if (!location)
    {
      //Informar del error
      return res
      .status(404)
      .send({message: "locationid not found"});
    }
    //Informar del exito
    return res
    .status(204)
    .send(null);
    
  })
};