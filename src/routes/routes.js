const express = require ('express');
const projectsController = require('../controllers/projectsController');
const router = express();

router.post('/save', projectsController.save);
router.get('/all', projectsController.getProjects);
router.get('projects/:id', projectsController.getProject);
module.exports = router