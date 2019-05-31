const express = require('express');
const router = express.Router();
const dbPost = require('../posts/postDb');

// These are extensions of main route /api/posts
//---------------------------------------------------------------------------------//

router.get('/', (req, res) => {

    dbPost.get()
    .then(posts => {
        res.status(200).json({posts});
    })
    .catch(err => {
        res.status(404).json({message: "Error grabbing posts...", err})
    })
});

//---------------------------------------------------------------------------------//

router.get('/:id', validatePostId, (req, res) => {
    const {id} = req.params; // THIS IS THE POST ID, not the USER_ID

    dbPost.getById(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(404).json({message: "ERROR GETTING POSTS!"});
    })
});

//---------------------------------------------------------------------------------//


router.delete('/:id', validatePostId, (req, res) => {
    const {id} = req.params; // THIS IS THE POST ID, not the USER_ID

    dbPost.remove(id)
    .then(record => {
        res.status(200).json({message: "DELETE SUCCESS!! :)"});
    })
    .catch(err => {
        res.status(500).json({message: "ERROR DELETING POST"});
    })
});

//---------------------------------------------------------------------------------//


router.put('/:id', validatePostId, validatePost, (req, res) => {
    const {id} = req.params; // THIS IS THE POST ID, not the USER_ID

    const changes = {
        text: req.body.text
    }

    dbPost.update(id, changes)
    .then(count => {
        dbPost.getById(id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({message: "CANNOT FIND BY ID", err});
        })
    })
    .catch(err => {
        res.status(500).json({message: "ERROR UPDATING POST", err});
    })
});

//---------------------------------------------------------------------------------//


// custom middleware

function validatePostId(req, res, next) {
    const {id} = req.params;

    dbPost.getById(id)
    .then(post => {
        if (!post) {
            res.status(404).json({message: "POST with that ID not FOUND"});
        } else {
            next();
        }
    })
    .catch(err => {
        res.status(500).json({message: "Error getting ID of POST.", err})
    })
};

// Checks if post have body or text field within body - next will follow else USED FOR POST REQ
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