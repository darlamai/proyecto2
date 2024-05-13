'use strict'

// el middleware es un controlador, es tener un metodo que hace un proceso en particular,
// la diferencia con un controlador es que lo exportas para que pueda ser importado 

// entre la entrada de los datos y el proceso que se ejecuta con api.post(...,middleware,..)

require('dotenv').config();

var jwt=require("jsonwebtoken");

var Sessions = require("../models/accesstoken");

var middleware={
    userprotectUrl: function(req, res, next){

        const token= req.headers['x-curso2024-access-token']

        if(token){

            jwt.verify(token, process.env.KEY, (err,decoded) =>{
                if(err) {
                    return res.status(401).send({
                        status:401,
                        message:"Token no válido"
                    });

                }else{
                    req.decoded =decoded;
                    Sessions.findOne({user:req.decoded.user.email,key: token, active:true})
                    .then( sesion=>{
                        if(!sesion){
                            return res.status(401).send({
                                status:401,
                                message:"Sesión no encontrada"
                            });
                        }

                        next();

                })

                .catch(error =>{
                    console.error(error);
                    return res.status(500).send({
                        status:500,
                        message:"Error detectado"
                    });



                });

                }

            });


        } else {

            return res.status(400).send({
                status:400,
                message:"Datos no válidos"
            })

        }
     

    }
};


module.exports=middleware;
