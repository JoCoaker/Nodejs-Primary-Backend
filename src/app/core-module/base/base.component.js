'use strict';

class BaseComponent {

    constructor(MongooseObject) {
        this._mMongooseObject = MongooseObject;
    }

    create(data) {
        throw new Error('NotYetImplementedException')
    }

    update(searchCriteria, data) {
        throw new Error('NotYetImplementedException')
    }

    remove(searchCriteria) {
        return new Promise((success, failure) => {

            this.findOne(searchCriteria, '_id')
                .then((document) => {
                    document.remove();
                    return success(true);
                })
                .catch((err) => {
                    return failure(err);
                });

        });
    }

    findOne(searchCriteria, query, populate = {}) {
        return new Promise((success, failure) => {

            this._mMongooseObject.findOne(searchCriteria)
                .populate(populate)
                .select(query)
                .exec((err, document) => {
                if (err) return failure(err);

                return success(document);
            });

        });
    }

    findAll(searchCriteria, query, populate = {}, sort = {'created': -1}) {
        return new Promise((success, failure) => {

            this._mMongooseObject.find(searchCriteria)
                .sort(sort)
                .populate(populate)
                .select(query)
                .exec((err, documents) => {
                    if (err) return failure(err);

                    return success(documents);
                });

        });
    }

}


/**
 * Exports
 */

module.exports = BaseComponent;