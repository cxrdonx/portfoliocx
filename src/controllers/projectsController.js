'use strict'
var vaccine = require('../models/proyects');
var mongoose = require('mongoose');
const Projects = require('../models/proyects');
var fs = require('fs');
const proyects = require('../models/proyects');
var path = require('path');
var controller = {
    save: function(req, res){
        var project = new Projects();
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
            Projects.find({}).exec((err, project)=>{
                if(err) return res.satatus(500).send({message:"error returning data"});
                if(!project) return res.status(404).send({message:"there is nothing to show"});
                return res.status(200).send({project});
            });
        },

        getByTitle: function(req, res){
            var title = req.params.title;
            if(title == null) return res.status(400).send({message:'the title does not exist'});
            Projects.find({title:title}, (err, project) =>{
                if(err) return res.status(500).send({message:'error returning data'});
                if(!project) return res.status(404).send({message: "does not exist"});
                return res.status(200).send({project});
            });
               
        },
         delete: function(req, res){
         var project = req.params.id;
                if(project == null) return res.status(400).send({message:'the ID does not exist'});
                Projects.findByIdAndRemove(project, (err, project) =>{
                 if(err) return res.status(500).send({message:'error returning data'});
                 if(!project) return res.status(404).send({message: "does not exist"});
                 return res.status(200).send({project});
                });
                
            },          
             
           sendEmail: function(req, res){
               const{email, name, message} = req.body;          
           },

           findbyId: function(req, res){
                var project = req.params.id;
                if(project == null) return res.status(400).send({message:'the ID does not exist'});
                Projects.findById(project, (err, project) =>{
                 if(err) return res.status(500).send({message:'error returning data'});
                 if(!project) return res.status(404).send({message: "does not exist"});
                 return res.status(200).send({project});
                });
                
            },

           findByIdAndUpdate: function(req, res){
                    var projectId = req.params.id;
                    var update = req.body;
                    Projects.findByIdAndUpdate(projectId, update, (err, projectUpdated) =>{
                               if(err)return res.status(500).send({message: 'error'});
                               if(!projectUpdated) return res.status(400).send({message:'noid'});
                               return res.status(200).send({
                                   project: projectUpdated
                               });
           });
        },


        uploadImage: function(req, res){
             var projectId = req.params.id;
             var file_name = 'No subido...';
             if(req.files){        
                 var file_path = req.files.image.path;
                 var file_split = file_path.split('\\');
                 var file_name = file_split[1];
                var ext_split = file_name.split('\.');
                 var file_ext = ext_split[1];
                if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
                     proyects.findByIdAndUpdate(projectId, {image:file_name},{new: true},(err, projectUpdated) =>{
                        if(err) return res.status(500).send({message:'error'});
                        if(!projectUpdated) return res.status(404).send({message:'noid'});
                        return res.status(200).send({
                            project: projectUpdated
                        });
                    });
                }else{

                    fs.unlink(file_path, (err) =>{
                        if(err) return res.status(200).send({message:'extension not valid'});
                    });
                }
             } else{
                return res.status(200).send({meessage: file_name});
            }
        },

        getImage: function(req,res) {
            var file = req.params.image;
            var path_file = './uploads/' + file;
            fs.exists(path_file, (exists) =>{
              if(exists){
                  return res.sendFile(path.resolve(path_file));
              }else{
                  return res.status(200).send({
                      message: "image dont exists"
                  });
              }
            });
        }
        
}
module.exports = controller;