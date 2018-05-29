const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;

exports.generate = (shortMsg = ERRORS.default, fullMsg = '', status = 400, options = {}) => {
  return { 
    error: shortMsg, 
    message: fullMsg, 
    details: options.details, 
    status: status
  };
};