var util    = require('util');


var domain         = process.env.ES_DOMAIN,
    user           = process.env.ES_USER,
    password       = process.env.ES_PASSWORD,
    indexName      = process.env.ES_INDEX_NAME,
    collectionName = process.env.ES_COLLECTION_NAME;


module.exports.getUrl = function (authed) {
    var prefix = authed ? util.format('%s:%s@', user, password) : '';

    return util.format('http://%s%s/%s/%s/', prefix, domain, indexName,
         collectionName);
};
