const express = require ('express');
const projectsController = require('../controllers/projectsController');
const blogController = require('../controllers/blogController');
const router = express();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.post('/save', projectsController.save);
router.get('/all', projectsController.getProjects);
router.get('/projects/:id', projectsController.getProject);
router.post('/image', projectsController.uploadImage);
router.post('/send-email', projectsController.sendEmail);
router.put('/update',projectsController.findByIdAndUpdate);
router.post('/send-image/:id', multipartMiddleware, projectsController.uploadImage);
router.get('/get-image/:image', projectsController.getImage );
router.post('/save-blog', blogController.saveBlog);
router.get('/all-blogs', blogController.getBlogs);
router.get('/blog/:id', blogController.getBlog);
router.delete('/delete-blog/:id', blogController.deleteBlog);
module.exports = router
