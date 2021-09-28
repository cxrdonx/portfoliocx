'use strict'
var vaccine = require('../models/proyects');
var mongoose = require('mongoose');
const Projets = require('../models/proyects');
var controller = {
    save: function(req, res){
        var project = new Projets();
        var params = req.body;
          project.name = params.name;
          project.description = params.description;
          project.category = params.category;
          project.langs = params.langs;
          project.image = params.image;

            project.save((err, projectStored) =>{
                if(err) return res.status(500).send({message:'internal server error'});
                if(!projectStored) return res.status(404).send({message:'could not save'});
                return res.status(200).send({project:projectStored});
            });

        },

        getProject: function(req, res){
            var project = req.params.id;
           if(project == null) return res.status(400).send({message:'the ID does not exist'});
           project.findbyId(project, (err, project) =>{
                if(err) return res.status(500).send({message:'error returning data'});
                if(!project) return res.status(404).send({message: "does not exist"});
                return res.status(200).send({project});
            });
           
        },
        getProjects: function(req, res){
            Projets.find({}).exec((err, project)=>{
                if(err) return res.satatus(500).send({message:"error returning data"});
                if(!project) return res.status(404).send({message:"there is nothing to show"});
                return res.status(200).send({project});
            });
        },

        getByTitle: function(req, res){
            var title = req.params.title;
            if(title == null) return res.status(400).send({message:'the title does not exist'});
            Projets.find({title:title}, (err, project) =>{
                if(err) return res.status(500).send({message:'error returning data'});
                if(!project) return res.status(404).send({message: "does not exist"});
                return res.status(200).send({project});
            });
               
        },
         delete: function(req, res){
         var project = req.params.id;
                if(project == null) return res.status(400).send({message:'the ID does not exist'});
                Projets.findByIdAndRemove(project, (err, project) =>{
                 if(err) return res.status(500).send({message:'error returning data'});
                 if(!project) return res.status(404).send({message: "does not exist"});
                 return res.status(200).send({project});
                });
                
            },

            
             
           sendEmail: function(req, res){
               const{email, name, message} = req.body;
               

             
           },




        uploadImage: function(req, res){
             var project = new Projets();
             var params = req.body;
             var file_name = 'No subido...';
             if(req.files){        
                 var file_path = req.files.image.path;
                 var file_split = file_path.split('\\');
                 var file_name = file_split[2];
                var ext_split = file_name.split('\.');
                 var file_ext = ext_split[1];
                if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
                     project.image = file_name;
                    project.save((err, projectStored) =>{

                        if(err) return res.status(500).send({message:'internal server error'});
                        return res.status(200).send({project:projectStored});
                     });
                }else{

                     return removeFilesOfUploads(res, file_path, 'extension not valid');
             }
        }else{

                 return res.status(200).send({message:'no files to upload'});
             }
         },


                

    }

module.exports = controller;