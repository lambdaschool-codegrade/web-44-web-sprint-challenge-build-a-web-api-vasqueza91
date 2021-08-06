// Write your "actions" router here!
const express = require("express")

const router = express.Router();

const Action = require("./actions-model");
const { validateActionId, validateAction } = require("./actions-middlware")

router.get('/', (req, res) => {
    Action.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.get('/:id', validateActionId, (req, res, next) => {
    res.json(req.action);
});

router.post('/', (req, res) => {
    Action.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(400).json(error)
    })
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next);
});

router.delete('/:id', validateActionId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(action => {
            res.json(req.action);
        }) 
        .catch(next);
})

module.exports = router