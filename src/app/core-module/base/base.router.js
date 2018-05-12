'use strict';

/**
 * Imports
 */
const Router = require('express').Router;


class BaseRouter {

    constructor(prefix) {
        this._prefixM = prefix;
        this._routerM = Router();
    }

    getRouter(){
        return this._routerM;
    }

    getPrefix(){
        return this._prefixM;
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
