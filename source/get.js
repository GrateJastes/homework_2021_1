'use strict';

/**
 * Extract property from an object by given property name.
 * @param {object} object - any object to operate with
 * @param {string} pathString - full path to the needed property
 * @return {object} requested property
 * @throws {TypeError} if invalid input types are given
 * @throws {Error} if invalid property path is given
 */
const get = (object, pathString) => {
    if (typeof object !== 'object' || typeof pathString !== 'string')
        throw TypeError('Incorrect type');
    if (pathString[0] !== '.')
        throw Error('Property path invalid');

    if (pathString === '.')
        return object;

    return pathString.split('.')
        .slice(1)
        .reduce((resultProperty, propertyName) => {
            return resultProperty ? resultProperty[propertyName] : undefined
        }, object);
};
