'use strict';

/**
 * Imports
 */
const Router = require('express').Router;


class BaseRouter {

    constructor(prefix) {
        this.mPrefix = prefix;
        this.mRouter = Router();
    }

    checkRequired(required, req) {
        for (let i = 0; i < required.length; i++) {
            if (!req.body[required[i]])
                return false;
        }
        return true;
    }

}

module.exports = BaseRouter;
