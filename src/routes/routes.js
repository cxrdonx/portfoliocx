const express = require ('express');
const projectsController = require('../controllers/projectsController');
const router = express();

router.post('/save', projectsController.save);
router.get('/all', projectsController.getProjects);
router.get('projects/:id', projectsController.getProject);
royter.get('/projects/:title', projectsController.getProjectByTitle);
module.exports = router