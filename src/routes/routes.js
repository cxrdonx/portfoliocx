const express = require ('express');
const projectsController = require('../controllers/projectsController');
const router = express();

router.post('/save', projectsController.save);
router.get('/all', projectsController.getProjects);
router.get('projects/:id', projectsController.getProject);
router.post('/image', projectsController.uploadImage);
router.post('/send-email', projectsController.sendEmail);
module.exports = router