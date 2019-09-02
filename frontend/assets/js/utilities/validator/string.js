export const stringConsistsOf = (string, types) => {
    // Passed arguments check.
    if (
        typeof string !== 'string' ||
        !types || !types.length || !Array.isArray(types)
    ) {
        console.warn('stringConsistsOf | check passed arguments!');
        return false;
    }

    const TYPES = {
        letters: 'a-zA-Z',
        numbers: '1-9',
        spaces: ' '
    };

    // Check if there are any wrong types passed.
    let wrongTypes = types.filter(type => !TYPES[type]);

    if (wrongTypes.length) {
        console.error(
            'String validator | wrong types passed: ',
            wrongTypes.join(', ')
        );
        return false;
    }

    const getRegExpFromTypes = () => {
        let typeParams = types
            .map(type => TYPES[type])
            .join('');

        return new RegExp(`^$|^[${ typeParams }]+$`);
    };

    return getRegExpFromTypes().test(string);
};

export const stringHasLengthInRange = (string, min = 2, max = 20) => {
    if (typeof string !== 'string') {
        console.error('stringHasLengthInRange | arg "string" must be a non-empty string');
        return false;
    }
    if (string.length >= min && string.length <= max) return true;
    return false;
};

export const stringIsValidOSPath = (operatingSystem, path) => {
    // Arguments check.
    if (typeof path !== 'string' || !operatingSystem) {
        console.error('stringIsValidOSPath | check arguments they must be a non-empty strings');
        return false;
    }

    switch (operatingSystem) {
        case 'Windows_NT':
            return stringIsValidWindowsPath(path);
        case 'linux':
        case 'macOSX':
        default:
            return stringIsValidUnixPath(path);
    }
};

export const stringIsValidWindowsPath = string =>
    (/([a-z]:)?(\\[^<>:"\/|?*]+)+\\?$/i).test(string);

export const stringIsValidUnixPath = string =>
    (/^(\/[^\0]*)/).test(string);

export const stringIsValidIPAddress = string => {
    if (typeof string !== 'string') {
        console.error('stringIsValidIPAddress | check argument "string" it must be a non-empty string');
        return false;
    }
    const re = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return re.test(string);
};

export const stringIsValidEmail = string => {
    if (typeof string !== 'string') {
        console.error('stringIsValidEmail | check argument "string" it must be a non-empty string');
        return false;
    }
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(string);
};
