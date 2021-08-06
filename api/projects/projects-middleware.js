// add middlewares here related to projects
const Project = require('./projects-model');

const validatePost = (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      next({
        status: 400,
        message: "missing required field",
      })
    } else {
      next();
    }
};

const validateProjectId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.get(id);
        console.log(project);
        if (project) {
            req.project = project;
            next();
        } else {
            next({
                status: 404,
                message: "project not found",
            })
        }
    } catch (err) {
        next(err);
    }
};

async function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (name && description) {
      req.name = name.trim();
      req.description = description.trim();
      req.completed = completed;
      next();
    } else {
      res.status(400).json({
        message: "missing required name field",
      });
    }
  }

module.exports = {
    validatePost,
    validateProjectId,
    validateProject
};