'use strict';

const mongoose = require('mongoose');

/**
 * Schema for MongoDB.
 */
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
/**
 * Update updated field on change.
 */
demoSchema.pre('update', next => {
    this.updated = new Date();
    next();
});

/**
 * Create Model Object.
 *
 * @type {Model}
 */
const Demo = mongoose.model('Demo', demoSchema);

module.exports = Demo;
