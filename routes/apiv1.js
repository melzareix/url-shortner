const express = require('express');
const router = express.Router();

router.get('/whoami', function () {
    res.end('2');
});

module.exports = router;