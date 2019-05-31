const express = require('express');
const router = express.Router();
const db = require('../users/userDb');
const dbPost = require('../posts/postDb');

// These are extensions of main route /api/users
//---------------------------------------------------------------------------------//

router.post('/', validateUser, (req, res) => {

    db.insert(req.body)
    .then(user => {
        res.status(201).json({message: `Added ${user.name} successful.`})
    })
    .catch(err => {
        res.status(400).json({message: "Added FAIL."});
    })
});

//---------------------------------------------------------------------------------//

router.post('/:id/posts', validateUserId, (req, res) => {
    console.log("within POST");
    const {id} = req.params;
    const {text} = req.body;

    const post = {
        user_id: id,
        text: text
    }

    dbPost.insert(post)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        res.status(400).json({message: "Error Posting!"});
    })
});

//---------------------------------------------------------------------------------//


router.get('/', (req, res) => {
    db.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(404).json({message: "NOT FOUND!"});
    })
});

//---------------------------------------------------------------------------------//


router.get('/:id', validateUserId, (req, res) => {
    const {id} = req.params;

    db.getById(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(404).json({message: "User not found or DNE!"});
    })

});

//---------------------------------------------------------------------------------//


router.get('/:id/posts', (req, res) => {

});

//---------------------------------------------------------------------------------//


router.delete('/:id', (req, res) => {

});

//----------------------------------------------------------------------------------//


router.put('/:id', (req, res) => {

});

//---------------------------------------------------------------------------------//


//custom middleware

// checks if the provided id matches one within database
function validateUserId(req, res, next) {
    const { id } = req.params;

    db.getById(id)
        .then(user => {
            console.log(user);
            req.user = user
            if (!user) {
                res.status(404).json({message: "NO USER WITH THAT ID!"})
            } else {
                next(); // sending new req.user to next function needed?
            }
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
