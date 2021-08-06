// add middlewares here related to actions
const Action = require('./actions-model');

const validateActionId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const action = await Action.get(id);
        console.log(action);
        if (action) {
            req.action = action;
            next();
        } else {
            next({
                status: 404,
                message: "action not found",
            })
        }
    } catch (err) {
        next(err);
    }
};

async function validateAction(req, res, next) {
    const { notes, description, completed, project_id } = req.body;
    if (!notes || !notes.trim()) {
      res.status(400).json({
        message: "missing required notes field",
      });
    } else if (!description || !description.trim()) {
      res.status(400).json({
        message: "missing required description field",
      });
    } else {
      req.notes = notes.trim();
      req.description = description.trim();
      req.completed = completed;
      req.project_id = project_id;
      next();
    }
  }

  module.exports = {
    validateActionId,
    validateAction
}