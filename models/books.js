'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({

    idbook:{
        type:Number,
        required:true,
        validate:{
             validator: Number.isInteger,
             message:'{VALUE} is not a integer for iduser'
        }},

    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    paginas: {
        type: Number,
        required: true
    },

    idusers: [{ type: Number }] // Relación con libros
    //idusers: { type: Number, required:true, ref: 'usuarios' } // Relación con usuario
});

module.exports = mongoose.model('books', BookSchema);
