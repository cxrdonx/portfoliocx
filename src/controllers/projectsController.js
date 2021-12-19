const nodemailer = require('nodemailer');
const {google} = require('googleapis');

'use strict'
var vaccine = require('../models/proyects');
var mongoose = require('mongoose');
const Projects = require('../models/proyects');
var fs = require('fs');
const proyects = require('../models/proyects');
var path = require('path');

const CLIENT_ID = '993748911568-7c65j18ccf4n0jem6g5qi3gc1ee1ubqd.apps.googleusercontent.com';
const CLIENT_SECRET ='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';
const REDIRECT_URI ='https://developers.google.com/oauthplayground';    
const REFRESH_TOKEN ='1//04Sd6F6RZmy8-CgYIARAAGAQSNwF-L9Ir5Lazlb5jHYs2QDDIsUtsNVWGh6rKmWw3KoFOoaTbvgZXyAqC19D0CTnUjstdUTWwoHw';
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});
var controller = {
    save: function(req, res){
        var project = new Projects();
        var params = req.body;
          project.name = params.name;
          project.description = params.description;
          project.category = params.category;
          project.langs = params.langs;
          project.links = params.links;
          project.image = params.image;

            project.save((err, projectStored) =>{
                if(err) return res.status(500).send({message:'internal server error'});
                if(!projectStored) return res.status(404).send({message:'could not save'});
                return res.status(200).send({project:projectStored});
            });

        },

        getProject: function(req, res){
            var projectId = req.params.id;
           if(projectId == null) return res.status(400).send({message:'the ID does not exist'});
           Projects.findById(projectId, (err, project) =>{
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
             
         sendEmail: async function(req, res){
            const{email, affair, name, message} = req.body;     
             try{
                const accesToken = await oauth2Client.getAccessToken();
                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'j.cardona.covenant@gmail.com',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accesToken
                    }
                });
                const mailOptions ={
                    from: email,
                    to: 'jose.eduardo.cardona@gmail.com',
                    subject: affair,
                    tex: message,
                    html: `<h2>${email}</h2>
                          <h3>Empresa: ${name}</h3>
                           <p>${message}</p>`
                };
                console.log(mailOptions);
                const result = await transport.sendMail(mailOptions);
                return result;
             
             }catch(error){
                 return error;
             }
                    
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