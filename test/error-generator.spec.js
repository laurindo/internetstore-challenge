const expect = require('chai').expect;
const ErrorGeneratorService = require('../services/error-generator-service');
const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;

describe('## ERROR GENERATOR ##', () => {
  it('test generate function', () => {
    expect(ErrorGeneratorService.generate()).include.any.keys('message', 'status', 'error');
  });

  it('should return the correct message error', () => {
    const errorDetails = { error: 'Error on get MOD' };
    const errorReturned = ErrorGeneratorService.generate(ERRORS.error_on_perform_mod, 500, errorDetails);
    expect(errorReturned.message).equal('Error on perform function MOD');
    expect(errorReturned.status).equal(500);
    expect(errorReturned.error.error).equal(errorDetails.error);
  });

  it('should return default message', () => {
    const errorReturned = ErrorGeneratorService.generate();
    expect(errorReturned.message).equal('Some error happenend');
  });

  it('should return default status 400 error', () => {
    const errorReturned = ErrorGeneratorService.generate();
    expect(errorReturned.status).equal(400);
  });

  it('should return default error details', () => {
    const errorReturned = ErrorGeneratorService.generate();
    expect(typeof errorReturned.error).equal('object');
  });
});
