'use strict';

const BaseRouter = require('../core-module/base/base.router');

class DemoRouter extends BaseRouter {

    constructor(){
        super('/demo');

        this._routerM.get('/hello_world', this.helloWorld);
    }

    helloWorld(req, res) {
        res.send('Hello World!')
    }

}

module.exports = DemoRouter;