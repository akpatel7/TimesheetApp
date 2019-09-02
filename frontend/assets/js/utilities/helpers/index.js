import React from 'react';
import moment from 'moment';
//import _ from 'lodash';

export const agoDate = date => {
    if (moment().isSame(moment(date), 'day'))       return moment(date).fromNow();
    else if (moment().isSame(moment(date), 'year')) return moment(date).format('ddd, D MMM');
    else                                            return moment(date).format('MMM YYYY');
};

export const hasPropertyTree = (obj, ...keys) => !!getPropertyTree(obj, false, ...keys);

export const getPropertyTree = (obj, defaultValue, ...keys) => {
    if (!obj) return defaultValue;
    if (!keys.length) return obj;
    const [ key, ...otherKeys ] = keys;
    return getPropertyTree(obj[key], defaultValue, ...otherKeys);
};

export const pluralize = word => {
    const lastLetter = word.slice(-1);

    if (lastLetter === 'y') return word.slice(0, -1) + 'ies';
    else                    return word + 's';
};

export const mergeObjs = (objA, objB) => {
    let mergedObj = { ...objB };
    Object.keys(objA).forEach(keyA => {
        if (objB[keyA]) {
            mergedObj[keyA] = { ...objA[keyA], ...objB[keyA] };
        } else {
            mergedObj[keyA] = objA[keyA];
        }
    });

    return mergedObj;
};

export const mergeObjsTwo = (objA, objB) => {
    const res = { ...objA };

    for (let k in res) {
        if (objB[k]) {
            res[k] = mergeObjs(res[k], objB[k]);
        }
    }

    for (let k in objB) {
        if (res[k]) {
            res[k] = objB[k];
        } else {
            res[k] = mergeObjs(res[k], objB[k]);
        }
    }

    return res;
};

//ie. replaceElement([a, b, c], 2, Q) => [a, Q, c]
export const replaceElement = (arr, i, value) =>
    arr.map((el, k) => (i === k) ? value : el);

export const splice = (arr, i, x = 1) => {
    arr.splice(i, x); return arr;
};

export const arrayEquals = (a, b, cb) =>
    !a.some(v1 => !b.some(v2 => cb(v1, v2)))
        && !b.some(v2 => !a.some(v1 => cb(v1, v2)));

//are 2 pages essentially the same.
//Note: is there a nicer way to write this? It's pretty ugly and verbose.
export const arePagesSimilar = ({ query }, { query: query2 }) => {
    return objEq(query, query2);
};

// Converts to title case.
export const capFirst = str =>
    (str.length > 0)
    ?   str.charAt(0).toUpperCase() + str.slice(1)
    :   '';

export const objEq = (a, b) =>
    Object.keys(a).every(k => b[k] === a[k])
    && Object.keys(b).every(k => b[k] === a[k]);

//returns an object from permissions and the model passed, to readably check authorization:
//ie. { to: { change: true, view: true, assign_to_asset: false } }
//using it: userIsAuthorized.to.assign_to_asset
export const getAuthState = (permissions, model) => ({
    to: permissions
        ? permissions[model].reduce(
            (obj, perm) => ({ ...obj, [perm]: true }),
            {}
        )
        : {}
});

export const snakeToCamel = str => str.replace(/\_([^_]+)/g, (_, p1) => capFirst(p1));

//Checkes whether a value is matched for a query
export const matchesQuery = (value, query) =>
    Object.keys(query).every(k =>
        ['page', 'perpage', 'sortby', 'with_workspaces'].indexOf(k) !== -1 //page and perpage return true / are ignored.
        || (k === 'tag' && value.tags.some(t => t.name.indexOf(query[k]) !== -1)) //specifically to handle tags...
        || (k === 'type' && value.type.name.indexOf(query[k]) !== -1) //specifically to handle types...
        || (k === 'id' && query.id.indexOf(value.id) !== -1) //ids are split with commas
        || (typeof value[k] === 'string' && value[k].indexOf(query[k]) !== -1) //query is a substr of value
    );

export const convertQueryToSearch = (query, exclude = [], unnamed = 'name') => {
    exclude = [ 'page', 'perpage', 'sortBy', ...exclude];
    let searchText = '';
    for (let k in query) {
        if (exclude.indexOf(k) === -1) {
            if (k === unnamed) {
                searchText += query[k];
            } else {
                if (searchText.length) searchText += ' ';
                searchText += `${k}=${query[k]}`;
            }
        }
    }
    return searchText;
};

// Parse a search string query and returns an object.
export function parseQuery(options) {
    let {
        query = '',
        args = [],
        aliases,
        unnamedArg = 'name'
    } = options;
    let parsedQuery = {};
    const pattern = /(\s\s+)|([:;,])/g;

    // Replace multiple spaces and SOME symbols with single spaces.
    query = query
        .toLowerCase()
        .replace(pattern, ' ');
    let queryArgs = query.split(' ');

    // Assign known arguments
    queryArgs.forEach(arg => {
        if (arg.indexOf('=') !== -1) {
            let [attr, value] = arg.split('=');

            if (args.indexOf(attr) !== -1) {
                // If aliases is defined, use alias names.
                if (aliases && aliases[attr]) {
                    parsedQuery[aliases[attr]] = value;
                    query = query.replace(arg, '');
                    return;
                }
                // Otherwise use arguments names.
                parsedQuery[attr] = value;
            }
            query = query.replace(arg, '');
        }
    });

    // Assign the left over args minus spaces to restArg.
    if (unnamedArg) {
        if (query) parsedQuery[unnamedArg] = query;
    }
    return parsedQuery;
}

// Parse qsring and return key-value pairs.
export function parseQString(qString) {
    let qObject = {};

    qString.replace(
        /([^?=&]+)(=([^&]*))?/g,
        ($0, $1, $2, $3) => qObject[$1] = $3
    );

    return qObject;
}

// Get object and construct a qstring out of it.
export function createQString(qObject = {}, ignoreKeys = []) {
    let qString = '';

    Object.keys(qObject)
    .filter(
        k => ignoreKeys.indexOf(k) === -1
    ).forEach(
        (key, i) => {
            let prefix = i === 0
                ? '?'
                : '&';
            qString += `${prefix}${key}=${qObject[key]}`;
        }
    );

    return qString;
}

// Exclude keys from objects or values from arrays.
// Returns new Object/Array.
export const excludeKeys = (object, keysToExclude = []) => {
    if (
        !(
            (typeof object === 'object' && object !== null) ||
            Array.isArray(object)
        ) ||
        !Array.isArray(keysToExclude)
    ) return;

    let filterArray = array =>
        array.filter(k =>
            keysToExclude.indexOf(k) === -1
        );

    if (Array.isArray(object)) return [...filterArray(object)];

    let res = {};
    filterArray(Object.keys(object))
        .forEach(k => res[k] = object[k]);

    return res;
};

// Pick provided keys from Object.
// Returns a new Object.
export const pickKeys = (object, keysToPick = []) => {
    if (
        typeof object !== 'object' ||
        object === null ||
        !Array.isArray(keysToPick)
    ) return;

    let res = {};
    keysToPick.forEach(k => res[k] = object[k]);
    return res;
};

// Range a la Python.
export const range = (begin, end, interval=1) => {
    // If just 1 argument is received, then function
    // ala Python.
    if (arguments.length === 1) {
        end = begin;
        begin = 0;
    }

    const array = [];
    for (let i = begin; i < end; i += interval) {
        array.push(i);
    }

    return array;
};

export function randInt(begin, end) {
    return begin + parseInt((Math.random() * (end - begin)), 10);
}

export function randChoice(array) {
    // Get a random index number.
    const n = randInt(0, array.length - 1);

    return array[n];
}

// Capitalize string.
// capitalize('one two three-four five_six') => 'One Two Three Four Five Six'.
export function capitalize(string) {
    if (typeof string !== 'string') return;
    return string
        .split(/[-_ ]/)
        .filter(i => !!i)
        .map(i => i = i[0].toUpperCase() + i.slice(1))
        .join(' ');
}

export function decamelize(string, separator = ' ') {
    return string.replace(/([A-Z])/g, function($1){
        return separator + $1.toLowerCase();
    });
};

export const insertIntoArray = (val, arr, cond = (a, b) => a === b, toBegin=false) => {
    let found = false;
    let newArr = arr.map(v => {
        if (!cond(v, val)) return v;

        found = true;
        return val;
    });

    // Add to begining of array if specified.
    if (!found) {
        if (toBegin) newArr.unshift(val);
        else newArr.push(val);
    }

    return newArr;
};

export function mapToContentTypes(permissions) {
    return permissions.reduce((contentTypes, permission) => {
        const contentType = contentTypes.find(c => c.id === permission.content_type);
        if (contentType) {
            contentType.permissions.push(permission);
        } else {
            contentTypes.unshift({
                id: permission.content_type,
                model: permission.model,
                permissions: [permission]
            });
        }
        return contentTypes;
    }, []);
};

export const objectHasEmptyValues = obj =>
    Object.keys(obj).length !== Object.values(obj).filter(v => !!v).length;

export const arrayHasEmptyItems = arr =>
    arr.length !== arr.filter(item => !!item).length;

export const arrayHasDuplications = arr =>
    arr.some((field, index) => arr.indexOf(field) !== index);

//returns the icon that represents the sorting status of the column
export const orderByIcon = (iconKey, orderBy) => {
    if (iconKey === orderBy)
        return <i className="fa fa-sort-asc" />;
    else if (`-${ iconKey }` === orderBy)
        return <i className="fa fa-sort-desc" />;
    else
        return <i className="fa fa-sort" />;
};

export const stopPropagation = fnc => e => {
    fnc();
    e.stopPropagation();
};

export const base64Encode = string => {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let out = '';
    let i = 0;
    let len = string.length;
    let { c1, c2, c3 } = {};
    while (i < len) {
        c1 = string.charCodeAt(i++) & 0xff;
        if (i === len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt((c1 & 0x3) << 4);
            out += '==';
            break;
        }
        c2 = string.charCodeAt(i++);
        if (i === len) {
            out += CHARS.charAt(c1 >> 2);
            out += CHARS.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += CHARS.charAt((c2 & 0xF) << 2);
            out += '=';
            break;
        }
        c3 = string.charCodeAt(i++);
        out += CHARS.charAt(c1 >> 2);
        out += CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += CHARS.charAt(c3 & 0x3F);
    }
    return out;
};

export const getBase64ImagePrefix = string => {
    const imageExtension = string.split('.').pop();
    const prefix = ext => `data:image/${ ext };base64,`;

    switch (imageExtension) {
        case 'gif':
            return prefix('gif');
        case 'jpeg':
        case 'jpg':
            return prefix('jpeg');
        case 'svg':
            return prefix('svg+xml');
        case 'png':
            return prefix('png');
        case 'ico':
            return prefix('vnd.microsoft.icon');
        default: return prefix(imageExtension);
    }
};


/*
 * Given an account object, returns either
 * first and last name, or the username.
 */
export const getAccountName = account => (
    account.firstName
        ? `${ account.firstName } ${ account.lastName }`
        : account.username
);

/*
    I'm not proud of it but it does it's job.
    It constructs an object like this from account permissions:
    {
        assets: ['view', 'edit'],
        commits: ['view', 'edit', 'delete']
        ...
    }
*/
export const remapPermissions = permissions => {
    if (!permissions.reduce) return [];

    return permissions.reduce((newPermissions, { codename, contentType: { model } }) => {
        if (!newPermissions[model]) newPermissions[model] = [];
        newPermissions[model].push(codename.replace(`_${ model }`, ''));

        return newPermissions;
    }, {});
};
/*
export const remapPermissions = permissions =>
    _.mapValues(
        _.mapKeys(
            _.groupBy(
                _.unionBy(permissions, 'id'),
                ('contentType')
            ),
            value => value[0].model
        ),
        values => values.map(v => v.codename
            .replace(`_${v.model}`, '')
        )
    );
*/
