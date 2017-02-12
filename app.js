const express = require('express');
const logger = require('morgan');
const path = require('path');
const apiv1 = require('./routes/apiv1');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('api/v1', apiv1);

app.use(function (req, res) {
    res.json({
        status: 'Invalid path'
    });
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
})