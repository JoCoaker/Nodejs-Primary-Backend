'use strict';

const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: new Date()
    },
    updated: {
        type: Date,
        default: new Date()
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});
demoSchema.pre('update', next => {
    this.updated = new Date();
    next();
});

const Demo = mongoose.model('Demo', demoSchema);

module.exports = Demo;
