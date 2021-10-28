// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {title: 'Details',
  books : book })
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  
  let createdBook = book ({
      
      "Title" :req.body.Title,
      "Description" : req.body.Description,
      "Price" : req.body.Price,
      "Author" : req.body.Author,
      "Genre" : req.body.Genre
  });
  book.create(createdBook, (err) => {
      if(err)
      {
          return console.error(err);
          res.end(err);
      }
      else
      {
          //refresh the list
          res.redirect('/books');
      }
  });

})

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {
  let id = req.params.id;
  book.findById(id, (err, bookToUpdate) => {
      if(err)
      {
          return console.error(err);
          res.end(err);
      }
      else
      {
          //show the update view
          res.render('books/details', {title: 'Details', 
          books : bookToUpdate})
      }
  })
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {
  let id = req.params.id;
  let updatedBook = book ({
      "_id" : id,
      "Title" :req.body.Title,
      "Description" : req.body.Description,
      "Price" : req.body.Price,
      "Author" : req.body.Author,
      "Genre" : req.body.Genre
  });
  book.updateOne({_id: id}, updatedBook, (err) => {
      if(err)
      {
          return console.error(err);
          res.end(err);
      }
      else
      {
          //refresh the contact list
          res.redirect('/books');
      }
  });

})

// GET - process the delete by user id
router.get('/delete/:id', (req,res,next)=>{
  let id = req.params.id;
  book.remove({_id: id}, (err) => {
      if(err)
      {
          return console.error(err);
          res.end(err);
      }
      else
      {
          //refresh the contact list
          res.redirect('/books');
      }

  });
});




module.exports = router;
