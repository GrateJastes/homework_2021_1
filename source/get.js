'use strict';

/**
 * Extract property from an object by given property name.
 * @param {object} object - any object to operate with
 * @param {string} pathString - full path to the needed property
 * @return {object} requested property
 */
const get = (object, pathString) => {
    const path = pathString.split('.').slice(1);
    if (!path.length)
        return undefined;
    path.every(property => object = object[property]);
    return object;
};
