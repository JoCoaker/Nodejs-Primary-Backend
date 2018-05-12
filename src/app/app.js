'use strict';

const fs = require('fs');
const express = require('express');
const Server = require('http').Server;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const DemoRouter = require('./demo-module/demo.router');

const CONFIG = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
const DATABASE = JSON.parse(fs.readFileSync('./config/database.json', 'utf8'));

/**
 * Class App
 */
class App {

    /**
     * Constructor
     */
    constructor() {
        this._appM = express();
        this._serverM = Server(this._appM);

        // this._initDatabase();
        this._initApp();
        this._addRouters();
    }

    /**
     * Starts the server.
     */
    start() {
        // Start server.
        this._serverM.listen(CONFIG.port, () => {
            console.log('Server running on port ' + CONFIG.port);
        });
    }

    /**
     * @private
     * Connect to MongoDB Database.
     *
     */
    _initDatabase() {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://' + DATABASE.host + ':' + DATABASE.port + '/' + DATABASE.name, {}).catch((err) => {
            console.log('Failed to connect to MongoDB: \n\r' + err);
            return process.exit(1);
        });
    }

    /**
     * @private
     * Setup the Application.
     */
    _initApp() {
        this._appM.use(bodyParser.json());
        this._appM.use(bodyParser.urlencoded({extended: false}));
        this._appM.use(helmet());

        // Setup cors.
        this._appM.use(cors());
        this._appM.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Expose-Headers', 'X-Requested-With, Token-Refresh');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    /**
     * @private
     * Add routes to application.
     */
    _addRouters() {
        // Create Routers.
        const demo = new DemoRouter();

        // Add Routes to app.
        this._appM.use(demo.getPrefix(), demo.getRouter());
    }
}

module.exports = App;
