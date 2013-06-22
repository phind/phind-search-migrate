var common  = require('./common');

var restify = require('restify'),
    request = require('request');

var port = process.env.PORT ||  5001;

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));


server.post('/search', function (req, res) {
    console.log('Search query', req.body);

    request.get({
        url: common.getUrl(false) + '_search',
        qs: {
            q: req.body.query,
            size: 500
        },
        json: {}
    }, function (err, resp, body) {
        if (err || resp.statusCode !== 200) {
            return res.send(500);
        }

        var hits = (body.hits && body.hits.hits) || [];
        hits = hits.map(function (each) {
            return each._id;
        });

        res.send(200, hits);
    });
});

server.post('/update', function (req, res) {
    request.put({
        url: common.getUrl(true) + req.body.post_id,
        json: req.body
    }, function (err, resp, body) {
        if (err || (resp.statusCode !== 200 && resp.statusCode !== 201)) {
            return res.send(500);
        }

        res.send(200);
    });
});

server.listen(port, function () {
    console.log('Server started.');
});
