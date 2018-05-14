'use strict';

const BaseRouter = require('../core-module/base/base.router');
const {sayHelloWorld, create, findOne, findAll} = require('./demo.action');

/**
 * Class DemoRouter
 */
class DemoRouter extends BaseRouter {

    /**
     * Constructor
     */
    constructor(){
        // Prefix
        super('/demo');

        // Routes
        this._routerM.get('/hello_world', this.helloWorld);
        this._routerM.post('/', this.create);
        this._routerM.get('/', this.findAll);
        this._routerM.get('/:_id', this.findOne);
    }

    helloWorld(req, res) {
        res.send(sayHelloWorld());
    }

    async create(req, res) {
        const result = await create(req.body.name);
        res.send(result);
    }
    async findOne(req, res) {
        const doc = await findOne(req.params._id);
        res.send({demo: doc});
    }
    async findAll(req, res) {
        const docs = await findAll();
        res.send({demos: docs});
    }

}

module.exports = DemoRouter;
