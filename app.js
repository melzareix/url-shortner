const express = require('express');
const path = require('path');
const apiv1 = require('./routes/apiv1');
const mongoose = require('mongoose');
const Url = require('./models/url');

const app = express();
const port = process.env.PORT || 3000;

const db = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/url-shortner';
mongoose.connect(db);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', apiv1);

app.get(/^\/0*[1-9]\d*(\/?)$/, function (req, res, next) {
    Url.findOne({
        shortendId: parseInt(req.url.slice(1))
    }, function (err, url) {
        if (err) {
            return next(err);
        }
        if (!url) {
            return res.json({
                status: 'This url is not on the database.'
            });
        }
        url.hitCount++;
        url.save(function (err, url) {
            if (err) {
                return next(err);
            }
            return res.redirect(301, url.original);
        })
    });
});

app.use(function (err, req, res) {
    res.status(404).json({
        status: err.toString()
    });
});

app.use(function (req, res) {
    res.status(404).json({
        status: 'Invalid path.'
    });
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
})