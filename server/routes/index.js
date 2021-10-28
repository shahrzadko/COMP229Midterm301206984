// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let book = require('../models/books');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
