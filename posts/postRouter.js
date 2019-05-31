const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET SUCCESS!')
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;