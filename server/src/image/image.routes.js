var image          = require('./image.controller.js');
var authentication = require('../authentication/authentication.controller.js');

function setImageRoutes(app) {
    app.route('/images')
        .post(authentication.isAuthenticated, image.create)
        .get(authentication.isAuthenticated, image.findByUser);

    app.route('/images/:id').delete(authentication.isAuthenticated, image.delete);

}

module.exports = setImageRoutes;