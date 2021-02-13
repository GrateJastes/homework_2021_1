'use strict';

/**
 * Extract property from an object by given property name.
 * @param {object} object - any object to operate with
 * @param {string} path_string - full path to the needed property
 * @return {object} requested property
 */

const get = (object, path_string) => {
    const path = path_string.split(".").slice(1);
    for (let i = 0; i < path.length && object !== undefined; i++)
        if (path[i])
            object = object[path[i]];
    return object;
};
