const express = require('express');
const router = express.Router();
const db = require('../users/userDb');

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

// checks if the provided id matches one within database
function validateUserId(req, res, next) {
    const { id } = req.body;

    db.getById(id)
        .then(user => {
            console.log(user);
            req.user = user
            next(req.user); // sending new req.user to next function needed?
        })
        .catch(err => {
            res.status(400).json({ message: "invalid user id", err });
        })
};

// Checks if user have body or name field within body - next will follow else
function validateUser(req, res, next) {
    const body = req.body;
    const { name } = req.body;

    if (!body) {
        res.status(400).json({ message: "missing post data" });
    } else {
        if (!name) {
            res.status(400).json({ message: "missing required name field" });
        } else {
            next();
        }
    }
};

// Checks if post have body or text field within body - next will follow else
function validatePost(req, res, next) {
    const body = req.body;
    const { text } = req.body;

    if (!body) {
        res.status(400).json({ message: "missing post data" });
    } else {
        if (!text) {
            res.status(400).json({ message: "missing required text field" });
        } else {
            next();
        }
    }
};

module.exports = router;
