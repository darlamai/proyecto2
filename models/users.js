'use strict'

const mongoose= require('mongoose');
var Schema = mongoose.Schema;

// sirve para crear datos
var UserSchema =Schema({
     iduser:{
          type:Number,
          required:true,
          validate:{
               validator: Number.isInteger,
               message:'{VALUE} is not a integer for iduser'
          }},
     nombre: String,
     apellido: String,
     email:String,
     pass: String,
     edad: Number,
     fecha: Date,
     idbooks: [{ type: Number }] // Relación con libros

});

module.exports=mongoose.model('usuarios',UserSchema);



