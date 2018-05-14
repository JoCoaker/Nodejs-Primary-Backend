'use strict';

const Demo = require('../core-module/documents/demo');

/**
 * Example function for an action.
 *
 * @returns {string}
 */
exports.sayHelloWorld = () => {
  return 'hello world!';
};

/**
 * Creates a new Document.
 *
 * @param name
 * @returns {Promise<*>}
 */
exports.create = async (name) => {
  const demo = new Demo({name});
  return await demo.save();
};

/**
 * Finds the specified Document.
 *
 * @param _id
 * @returns {Promise<{}>}
 */
exports.findOne = async (_id) => {
  try {
      const doc = await Demo.find({'_id': _id})
      //.populate({})
          .select('_id name')
          .exec();

      return doc;
  }catch (e) {
      console.log('Error findOne');
      return {};
  }
};

/**
 * Finds all Documents.
 *
 * @returns {Promise<void>}
 */
exports.findAll = async () => {
        const docs = await Demo.find()
            .sort({'created': -1})
            //.populate({})
            .select('_id name')
            .exec();

        return docs;
};
