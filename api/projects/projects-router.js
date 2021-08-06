// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");
const router = express.Router();
const { validatePost, validateProjectId, validateProject } = require("./projects-middleware")

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console,log(error);
            res.status(500).json({
                message: 'Error retrieving the projects',
            })
        })
})

router.get('/:id', validateProjectId, (req, res, next) => {
    res.json(req.project);
});

router.post('/', validatePost, (req, res, next) => {
    Project.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(next);
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(project => {
            res.status(400).json(project)
        })
        .catch(next);
});

router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(project => {
            res.json(req.project);
        }) 
        .catch(next);
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(next);
  });


module.exports = router;