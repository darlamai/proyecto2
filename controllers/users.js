'use strict'

const { validationResult }=require("express-validator");

const bcrypt =require('bcrypt');

var Users =require('../models/users');
var Books =require('../models/books');

var controller ={

    userlist: function(req,res){

        Users.find({}).populate('idbooks').then(usuarios =>{
            return res.status(200).send({
                status:200,
                message:"Usuarios listados",
                data:usuarios
            });
        }).catch( error=>{
            console.error(error);
            return res.status(500).send({
                status:500,
                message:"Error detectado"
            });
        });
      
    },

    userSingular: function(req,res){
        var params=req.params;
        var iduser=params.iduser;

        Users.findOne({iduser:parseInt(iduser)})
        .populate('idbooks')
        .then(usuarios => {
            return res.status(200).send({
                status: 200,
                message: "Información de usuario",
                data:usuarios
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({
                status:500,
                message:"Error detectado"
            });
        });

    },

    createuser: function(req, res){

       const errors= validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).send({
                status:400,
                errors: errors.array()
            });
        }


        var data =req.body;
        var iduser=parseInt(data.iduser)

        if (!data.fecha) {
            data.fecha = new Date(); // Fecha actual
        }



        //Usuario existente

        Users.findOne({iduser:parseInt(iduser)})
        .then(usuarios => {
            //validación de usuario duplicado
            if(usuarios){

            return res.status(400).send({
                status: 400,
                message: "Usuario ya existente"
            });
            }else{ 
                
            //crypt el password

            const saltRounds =10;

            bcrypt.genSalt(saltRounds, function(err,salt){
                bcrypt.hash(data.pass, salt, function(err, hash){
                    // store hash in your password DB.
                    var create_user= new Users();
       
                    create_user.iduser =iduser;
                    create_user.nombre= data.nombre;
                    create_user.apellido=data.apellido;
                    create_user.edad=data.edad;
                    create_user.email=data.email;
                    create_user.idbooks=data.idbooks;
                    create_user.fecha=data.fecha,
                    create_user.pass=hash;
        
                    create_user.save()
                    .then((result) => {
                        
                        return res.status(200).send({
                            status:200,
                            message:"Información de usuario",
                            data:result
                        });
            
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).send({
                            status:500,
                            message:"Error detectado"
                        });
                    });
                });

            })

            
        }
    })
    .catch(error => {
        console.error(error);
        return res.status(500).send({
            status:500,
            message:"Error detectado"
        });
    });

    },

    updateuser: function(req, res){

        const errors= validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).send({
                status:400,
                errors: errors.array()
            });
        }

        var params = req.params;
        var iduser =params.iduser;
        var data= req.body;

        
        const saltRounds =10;

        bcrypt.genSalt(saltRounds, function(err,salt){
            bcrypt.hash(data.pass, salt, function(err, hash){

                var update_user={
                    iduser:data.iduser,
                    nombre: data.nombre,
                    apellido:data.apellido,
                    edad:data.edad,
                    email:data.email,
                    fecha:data.fecha,
                    pass:hash,
                    idbooks:data.idbooks
        
                }
        
                delete update_user.iduser;
        
                Users.findOneAndUpdate({iduser:parseInt(iduser)}, update_user,{new:true})
                .then(usuarios => {
        
                    if(!usuarios){
                        return res.status(404).send({
                            status:404,
                            message:"Usuario no encontrado"
                        });
        
                    }
                    return res.status(200).send({
                        status: 200,
                        message: "Usuario actualizado"
                    });
                })
                .catch(error => {
                    console.error(error);
                    return res.status(500).send({
                        status:500,
                        message:"Error detectado"
                    });
                });


            });
            });



    },

    deleteuser: function(req, res){

        var params = req.params;
        var iduser =parseInt(req.params.iduser);
  
        Users.findOneAndDelete({iduser:parseInt(iduser)})
        .then(usuarios => {
            if(!usuarios){
                return res.status(200).send({
                    status:200,
                    message:"Usuario no encontrado"
                });
            }

            return res.status(200).send({
                status: 200,
                message: "Usuario eliminado"
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({
                status:500,
                message:"Error detectado"
            });
        });




    },





};

module.exports=controller;