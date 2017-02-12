const express = require('express');
const router = express.Router();
const Url = require('../models/url');

router.get('/shorten/:weburl*', function (req, res, next) {
    const orignalUrl = req.params['weburl'] + req.params[0];
    var shortenedUrl;
    if (validateUrl(orignalUrl)) {
        Url.findOne({
            original: orignalUrl
        }, function (err, url) {
            if (err) {
                return next(err);
            }
            if (url) { // url exists already
                shortenedUrl = req.get('host') + '/' + url.shortendId;
                return res.json({
                    status: 'OK',
                    original_url: orignalUrl,
                    shortened_url: shortenedUrl
                });
            } else { // create new url record
                new Url({
                    original: orignalUrl
                }).save(function (err, url) {
                    if (err) {
                        next(err);
                    }
                    shortenedUrl = req.get('host') + '/' + url.shortendId;
                    return res.json({
                        status: 'OK',
                        original_url: orignalUrl,
                        shortened_url: shortenedUrl
                    });
                });
            }
        });

    } else {
        res.json({
            status: 'Invalid URL.'
        });
    }

});

/*
    Error handling middleware
*/

router.use(function (err, req, res, next) {
    res.json({
        status: 'Failed to connect to database.'
    });
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