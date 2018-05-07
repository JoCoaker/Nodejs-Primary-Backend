'use strict';

/**
 * Imports
 */
const Router = require('express').Router;


class BaseRouter {

    constructor(prefix) {
        this._prefix = prefix;
        this._mRouter = Router();
    }

    getRouter() {
        return this._mRouter;
    }

    getPrefix() {
        return this._prefix;
    }

    _checkRequired(required, req) {
        for (let i = 0; i < required.length; i++) {
            if (!req.body[required[i]])
                return false;
        }
        return true;
    }

}

module.exports = BaseRouter;
