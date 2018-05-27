const ERROR_MSG = require('../constants/general-constant');

const isEVEN = value => {
    return value % 2 === 0;
};

const getConfigParams = () => {
    const args = process.argv.splice(2, process.argv.length);
    let config = {};
    let tempKey = '';

    if (!isEVEN(args.length)) {
        throw new Error(ERROR_MSG.ERRORS.help);
        return;
    }

    args.forEach(function (val, index, array) {
        if (isEVEN(index)) {
            config[val] = '';
            tempKey = val;
        } else {
            config[tempKey] = val;
        }
    });

    return config;
};

exports.getConfigParams = getConfigParams;