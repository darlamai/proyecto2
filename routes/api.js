'use strict'

// archivo de ruteador, administra rutas de los endpoints.
// se tiene el middleware de las rutas, y se ingresan los controladores


const express = require('express');

const { body } = require('express-validator');

var api =express.Router();//manejador de rutas.

var middleware = require("../middleware/middleware");

var UsersController = require("../controllers/users");

var BooksController=require("../controllers/books");

var AuthController = require("../controllers/auth");

//endpoints


///Login
api.post('/login',[body("email").not().isEmpty(), body("pass").not().isEmpty()],
                   AuthController.login_user);



api.post('/logout',  middleware.userprotectUrl, AuthController.logout);



//Usuarios
api.get('/user', middleware.userprotectUrl, UsersController.userlist);

api.get('/user/:iduser', middleware.userprotectUrl,  UsersController.userSingular);

api.post('/user', middleware.userprotectUrl,[
    body("iduser").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body('apellido').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('email').not().isEmpty(),
    body('idbooks').not().isEmpty(),
    body('pass').not().isEmpty()

],UsersController.createuser);

//Update

api.put('/user/:iduser',  middleware.userprotectUrl,[
    body("iduser").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body('apellido').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('email').not().isEmpty(),
    body('idbooks').not().isEmpty(),
    body('pass').not().isEmpty()
]  ,UsersController.updateuser);

// Delete
api.delete('/user/:iduser', middleware.userprotectUrl, UsersController.deleteuser);



///Libros///////////////////////////////////////////////////////////////////////////////////////////////////////////

api.get('/book', middleware.userprotectUrl, BooksController.booklist);

api.get('/book/:idbook', middleware.userprotectUrl,  BooksController.bookSingular);

api.post('/book', middleware.userprotectUrl,[
    body("idbook").not().isEmpty(),
    body("titulo").not().isEmpty(),
    body('autor').not().isEmpty(),
    body('paginas').not().isEmpty(),
    body('idusers').not().isEmpty()

],BooksController.createBook);

//Update

api.put('/book/:idbook',  middleware.userprotectUrl,[
    body("idbook").not().isEmpty(),
    body("titulo").not().isEmpty(),
    body('autor').not().isEmpty(),
    body('paginas').not().isEmpty(),
    body('idusers').not().isEmpty()
]  ,BooksController.updateBook);

// Delete
api.delete('/book/:idbook', middleware.userprotectUrl, BooksController.deleteBook);





module.exports= api;

