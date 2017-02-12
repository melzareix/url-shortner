const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Url = require('../models/url');

mongoose.connect('mongodb://localhost:27017/url-shortner');


router.get('/shorten/:weburl*', function (req, res, next) {
    const orignalUrl = req.params['weburl'] + req.params[0];
    if (validateUrl(orignalUrl)) {

        Url.findOne({
            original: orignalUrl
        }, function (err, url) {
            console.log(url);
            if (err) {
                return next(err);
            }
            if (url) { // url exists already
                res.json({
                    original_url: orignalUrl,
                    shortened_url: req.get('host') + '/' + url.shortendId
                });
            } else {
                new Url({
                    original : orignalUrl
                }).save(function (err, url) {
                    if (err) {
                        return next(err);
                    }
                    return res.json({
                        original_url: orignalUrl,
                        shortened_url: req.get('host') + '/' + url.shortendId
                    });
                })
            }
        });
    }else{
        res.json({
            status : 'Invalid URL'
        });
    }
   
});

router.use(function(err, req, res, next){
    console.log(err);
    res.send('Oops');
});
/*
    Regex for URL validation
    https://gist.github.com/dperini/729294
*/
var validateUrl = function (url) {
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
}
module.exports = router;