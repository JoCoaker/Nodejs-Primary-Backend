'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');

const CONFIG = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

/**
 * Sign Token and return it.
 *
 * @param _id {string}
 * @param data {string}
 * @returns {string}
 */
exports.signToken = async (_id, data) => {
    const rsaPrivateKey = fs.readFileSync('../../../config/keys/' + CONFIG.jwt.privateKey);

    return jwt.sign({}, rsaPrivateKey, {
        algorithm: 'RS256',
        expiresIn: '1d',
        subject: _id,
        data: data
    });
};