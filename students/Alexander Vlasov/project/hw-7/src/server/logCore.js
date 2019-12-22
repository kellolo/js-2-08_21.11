let logInfo = {
    POST: function(req) {
        return req.body.id_product
    },
    PUT: function(req) {
        return +req.params.id
    },
    DELETE: function(req) {
        return +req.params.id
    }
}

module.exports = logInfo