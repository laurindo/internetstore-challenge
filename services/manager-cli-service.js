const UtilsService = require('./utils-service');
const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;

const getConfigParams = () => {
    const args = process.argv.splice(2, process.argv.length);
    
    if (!UtilsService.isMod(args.length) && args.length > 0) {
        throw new Error(ERRORS.help);
        return;
    }

    return UtilsService.breakArrayInObject(args);
};

exports.getConfigParams = getConfigParams;