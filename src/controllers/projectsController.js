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
          project.langs = params.category;

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
                
          }

         }
           
    }

module.exports = controller;