const expect = require('chai').expect;
const ManagerCLIService = require('../services/manager-cli-service');
const GeneralConstant = require('../constants/general-constant');
const ERRORS = GeneralConstant.ERRORS;

describe('## MANAGER CLI SERVICE ##', () => {
  it('test default process arg', () => {
    const processEnvArguments = process.argv;
    const result = ManagerCLIService.getConfigParams(processEnvArguments);
    expect(result).include.any.keys('--reporter', 'spec');
  });

  it('test generate function', () => {
    const processEnvArguments = ['first_param', 'second_param', '-cn', 'checkout'];
    const result = ManagerCLIService.getConfigParams(processEnvArguments);
    expect(result).include.any.keys('-cn', 'checkout');
  });

  it('should return specific error', () => {
    const processEnvArguments = [];
    const result = ManagerCLIService.getConfigParams(processEnvArguments);
    console.log(result);
    expect(result.message).equal(ERRORS.error_need_pass_params);
    expect(result.status).equal(400);
  });

  it('should return default error', () => {
    const result = ManagerCLIService.getConfigParams();
    console.log(result);
    expect(result.message).equal(ERRORS.default);
    expect(result.status).equal(500);
  });
});
