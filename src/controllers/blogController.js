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

       updateBlog: function(req, res){
        var id = req.params.id;
        var update = req.body;
        Blog.findByIdAndUpdate(id, update, (err, blogUpdated) =>{
            if(err) return res.status(500).send({message:'a error as ocurred'});
            if(!blogUpdated) return res.status(404).send({message:'nothing to update'});
            return res.status(200).send({blogUpdated});
        }
        );
         },

       uploadImage: function(req, res){
        var blogId = req.params.id;
        var file_name = 'No subido...';
        if(req.files){        
            var file_path = req.files.image.path;
            console.log("path:");
            console.log(file_path);
            var file_split = file_path.split('\\');
            var file_name = file_split[1];
           var ext_split = file_name.split('\.');
            var file_ext = ext_split[1];
           if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
                blogId.findByIdAndUpdate(blogId, {image:file_name},{new: true},(err, blogUpdated) =>{
                   if(err) return res.status(500).send({message:'error'});
                   if(!blogUpdated) return res.status(404).send({message:'noid'});
                   return res.status(200).send({
                       blog: blogUpdated
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

}

module.exports = controller;