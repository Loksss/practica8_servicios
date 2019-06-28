var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
//var _ = require("underscore");

var User = require("../../../database/collections/user");

//var jwt = require("jsonwebtoken");

router.post('/user', (req, res) => {
    //Ejemplo de validacion
    if (req.body.name == "" && req.body.email == "") {
      res.status(400).json({
        "msn" : "llene los campos de name y email"
      });
      return;
    }
    var user = {
      nombre : req.body.nombre,
      password : req.body.password,
      email : req.body.email
    };
    var userData = new User(user);
  
    userData.save().then( (rr) => {
      res.status(200).json({
        "id" : rr._id,
        "msn" : "usuario registrado"
      });
    });
  });
  
  router.get('/user', (req, res, next)=> {
    User.find({}).exec((error, docs) => {
      res.status(200).json(docs);
  })
  });
  
  router.delete(/user\/[a-z0-9]{1,}$/, (req, res) => {
    var url = req.url;
    var id = url.split("/")[2];
        User.find({_id : id}).remove().exec( (err, docs) => {
        res.status(200).json(docs);
    });
  });
  module.exports = router;
