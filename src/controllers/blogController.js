'use strict'
var Blog = require('../models/blog');

var controller = {
    saveBlog: function(req, res){
        var blog = new Blog();
        var params = req.body;
        blog.title = params.title;
        blog.content = params.content;
        blog.image = params.image;
        blog.links = params.links;

          blog.save((err, blogStored) => {
               if(err)return res.status(500).send({message: 'Error al guardar el blog'});
               if(!blogStored)return res.status(404).send({message: 'No se ha guardado el blog'});
               return res.status(200).send({blog: blogStored});
          });
    },
       getBlog: function(req,res){
            var id = req.params.id;
            if(id == null) return res.status(400).send({message: 'not exist'});
            Blog.findById(id, (err, blog) =>{
                if(err) return res.status(500).send({message:'error returning data'});
                if(!id) return res.status(404).send({message: "does not exist"});
                return res.status(200).send({blog});
            });      
       },
       
       getBlogs: function(req, res){
           Blog.find({}).exec((err, blog)=>{
               if(err) return res.status(500).send({message:'error'});
               if(!blog) return res.status(404).send({message:'nothing to show'});
               return res.status(200).send({blog});
           });
       },
       
       deleteBlog: function(req, res){
        var id = req.params.id;
        if(id == null) return res.status(400).send({message:'Wrong or inexistent id'});
        Blog.findByIdAndRemove(id,(err, blogDeleted) =>{
          if(err) return res.status(500).send({message:'a error as ocurred'});
          if(!blogDeleted) return res.status(404).send({message:'nothing to delete'});
          return res.status(200).send({blogDeleted}); 
        });

       },

}

module.exports = controller;