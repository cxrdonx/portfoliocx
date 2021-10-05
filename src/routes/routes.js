const express = require ('express');
const projectsController = require('../controllers/projectsController');
const router = express();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.post('/save', projectsController.save);
router.get('/all', projectsController.getProjects);
router.get('projects/:id', projectsController.getProject);
router.post('/image', projectsController.uploadImage);
router.post('/send-email', projectsController.sendEmail);
router.put('/update',projectsController.findByIdAndUpdate);
router.post('/send-image/:id', multipartMiddleware, projectsController.uploadImage);
router.get('/get-image/:image', projectsController.getImage );
module.exports = router
