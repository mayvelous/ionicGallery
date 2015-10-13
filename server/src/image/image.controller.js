'use strict';

var path   = require('path');
var logger = require('mm-node-logger')(module);
var Image  = require('./image.model.js');

function findByUser(req, res) {
    return Image.find({user: req.query.userId}, function (err, images) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            return res.json(images);
        }
    });
}

function create(req, res) {
    var image = new Image();
    image.fileName = req.files.image.name;
    image.url = path.join(req.body.url, req.files.image.path);
    image.user = req.body.userId;

    image.save(function(err, image) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.status(201).json(image);
        }
    });
}

function deleteImage(req, res) {
    Image.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            logger.error(err.message);
            return res.status(500).send(err);
        } else {
            res.sendStatus(204);
        }
    });
}

module.exports = {
    findByUser: findByUser,
    create: create,
    delete: deleteImage
};