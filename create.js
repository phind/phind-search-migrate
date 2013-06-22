var common  = require('./common');

var request = require('request'),
    async   = require('async')

request.del(common.getUrl(true), function () {

    request.get({
        url: 'http://phind.org/.json',
        json: {}
    }, function (err, resp, body) {
        async.eachLimit(body, 2, function (each, callback) {
            console.log('Saving', each);
            request.put({
                url: common.getUrl(true) + each.post_id,
                json: each
            }, function (err, resp, body) {
                console.log(err, resp.body);
                callback(err);
            });
        }, function (err) {
            console.log('Finished', err);
        });
    });

});
