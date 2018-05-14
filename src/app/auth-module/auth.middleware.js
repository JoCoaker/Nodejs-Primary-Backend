'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');

const CONFIG = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

/**
 * Checks if the Authentication Token is present and verifies it.
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.verifyJWT = (req, res, next) => {
    if (!req.headers['x-access-token']) {
        return res.send({error: {code: 401}})
    }

    const rsaPrivateKey = fs.readFileSync('../../../config/keys/' + CONFIG.jwt.publicKey);

    jwt.verify(req.headers['x-access-token'], rsaPrivateKey, {algorithms: ['RS256']}, (err, payload) => {
        if (err) {
            return res.send({error: {code: 401}})
        }

        req.user = payload.data;
        next();
    });
};