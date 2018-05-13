'use strict';

const BaseRouter = require('../core-module/base/base.router');
const {sayHelloWorld} = require('./demo.action');

class DemoRouter extends BaseRouter {

    constructor(){
        super('/demo');

        this._routerM.get('/hello_world', this.helloWorld);
    }

    helloWorld(req, res) {
        res.send(sayHelloWorld())
    }

}

module.exports = DemoRouter;
