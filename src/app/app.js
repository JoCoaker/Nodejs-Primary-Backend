'use strict';

const fs = require('fs');
const express = require('express');
const Server = require('http').Server;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const CONFIG = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
const DATABASE = JSON.parse(fs.readFileSync('./config/database.json', 'utf8'));

class App {

    constructor() {
        this._mApp = express();
        this._mServer = Server(this._mApp);

        this._initDatabase();
        this._initApp();

        this._mServer.listen(CONFIG.port, () => {
            console.log('Server running on port ' + CONFIG.port);
        });
    }

    _initDatabase() {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://' +DATABASE.host + ':'+ DATABASE.port + '/' + DATABASE.name, {
        }).catch((err) => {
            console.log('Failed to connect to MongoDB: \n\r' + err);
            return process.exit(1);
        });
    }

    _initApp() {
        this._mApp.use(bodyParser.json());
        this._mApp.use(bodyParser.urlencoded({extended: false}));
        this._mApp.use(helmet());

        // cors
        this._mApp.use(cors());
        this._mApp.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Expose-Headers', 'X-Requested-With, Token-Refresh');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

}

module.exports = App;
