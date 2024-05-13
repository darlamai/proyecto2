'use strict'

const { validationResult }=require("express-validator");

const bcrypt =require('bcrypt');

var Users =require('../models/users');
var Books =require('../models/books');

const controller = {
    booklist: function(req, res) {
        Books.find({}).populate('idusers')
            .then(libros => {
                return res.status(200).send({
                    status: 200,
                    message: "Libros listados",
                    data: libros
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado"
                });
            });
    },

    bookSingular: function(req, res) {
        var params = req.params;
        var idbook = params.idbook;

        Books.findOne({ idbook: parseInt(idbook) }).populate('idusers')
            .then(libro => {
                if (!libro) {
                    return res.status(404).send({
                        status: 404,
                        message: "Libro no encontrado"
                    });
                }
                return res.status(200).send({
                    status: 200,
                    message: "Información del libro",
                    data: libro
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado"
                });
            });
    },

    createBook: function(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({
                status: 400,
                errors: errors.array()
            });
        }

        var data = req.body;
        var idbook = parseInt(data.idbook);

        // Libro existente
        Books.findOne({ idbook: parseInt(idbook) })
            .then(libro => {
                // validación de libro duplicado
                if (libro) {
                    return res.status(400).send({
                        status: 400,
                        message: "Libro ya existente"
                    });
                } else {
                    var create_book = new Books();
                    create_book.idbook = data.idbook;
                    create_book.titulo = data.titulo;
                    create_book.autor = data.autor;
                    create_book.paginas = data.paginas;
                    create_book.idusers=data.idusers

                    create_book.save()
                        .then(result => {
                            return res.status(200).send({
                                status: 200,
                                message: "Información del libro",
                                data: result
                            });
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).send({
                                status: 500,
                                message: "Error detectado"
                            });
                        });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado"
                });
            });
    },

    updateBook: function(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({
                status: 400,
                errors: errors.array()
            });
        }

        var params = req.params;
        var idbook = params.idbook;
        var data = req.body;

        var update_book = {
            idbook:data.idbook,
            titulo: data.titulo,
            autor: data.autor,
            paginas: data.paginas,
            idusers:data.idusers
        };

        Books.findOneAndUpdate({ idbook: parseInt(idbook) }, update_book, { new: true })
            .then(libro => {
                if (!libro) {
                    return res.status(404).send({
                        status: 404,
                        message: "Libro no encontrado"
                    });
                }
                return res.status(200).send({
                    status: 200,
                    message: "Libro actualizado"
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado"
                });
            });
    },

    deleteBook: function(req, res) {
        var params = req.params;
        var idbook = parseInt(req.params.idbook);

        Books.findOneAndDelete({ idbook: parseInt(idbook) })
            .then(libro => {
                if (!libro) {
                    return res.status(404).send({
                        status: 404,
                        message: "Libro no encontrado"
                    });
                }
                return res.status(200).send({
                    status: 200,
                    message: "Libro eliminado"
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado"
                });
            });
    }
};

module.exports = controller;
