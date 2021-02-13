'use strict';

const get = function (object, path_string) {
    const path = path_string.split(".").slice(1);
    for (let i = 0; i < path.length && object !== undefined; i++)
        if (path[i])
            object = object[path[i]];
    return object;
};
