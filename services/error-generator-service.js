const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;

exports.generate = (message = ERRORS.default, status = 400, error = {}) => {
  return { 
    message, 
    status,
    error
  };
};