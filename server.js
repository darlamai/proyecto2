'use strict'


// se monta el servidor sirviéndose del modulo express el cual permite hacer
// el escucha

const mongoose= require('mongoose');
var app= require('./app');
var port= 3000;

mongoose.Promise=global.Promise;
mongoose.connect("mongodb+srv://darlynludena963:Gve90dyDNZaZRPuK@cluster0.urmlopv.mongodb.net/curso2024", {useNewUrlParser: true, useUnifiedTopology:true})
        .then(
            () => {
                console.log(" Conexión a la base de datos  establecida con éxito");
                var server= app.listen(port,()=>{
                    console.log(`Example app listening on port ${port}`)
                });

                server.timeout=120000;
            }
        )
        .catch(err => console.log(err));


