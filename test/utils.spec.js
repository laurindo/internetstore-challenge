const expect = require('chai').expect;
const UtilsService = require('../services/utils-service');
const GeneralConstant = require('../constants/general-constant');
const FIXTURE_PATH = GeneralConstant.FIXTURE_PATH;

describe('## UTILS SERVICE ##', () => {
  it('should return correct file name #01', () => {
    const fileName = UtilsService.getFileName('checkout', 'anpl');
    expect(fileName).to.equal('checkout_anpl');
  });

  it('should return correct file name #02', () => {
    const fileName = UtilsService.getFileName('checkout');
    expect(fileName).to.equal('checkout');
  });

  it('should return correct path name #JSON', () => {
    const pathName = UtilsService.getPathName('checkout', 'json');
    expect(pathName).to.equal(`${FIXTURE_PATH}/checkout.json`);
  });

  it('should return correct path name #YML', () => {
    const pathName = UtilsService.getPathName('checkout', 'yml');
    expect(pathName).to.equal(`${FIXTURE_PATH}/checkout.yml`);
  });

  it('should return correct path name #YAML', () => {
    const pathName = UtilsService.getPathName('checkout', 'yaml');
    expect(pathName).to.equal(`${FIXTURE_PATH}/checkout.yaml`);
  });

  it('should be a YAML extension file', () => {
    const isExtensionYAML = UtilsService.isExtensionYML({ extension: 'yaml' });
    expect(isExtensionYAML).to.equal(true);
  });
  
  it('should be a YML extension file', () => {
    const isExtensionYML = UtilsService.isExtensionYML({ extension: 'yml' });
    expect(isExtensionYML).to.equal(true);
  });

  it('should not be a YML extension file', () => {
    const isExtensionYML = UtilsService.isExtensionYML();
    expect(isExtensionYML).to.equal(undefined);
  });

  it('should be a JSON extension file', () => {
    const isExtensionJSON = UtilsService.isExtensionJSON({ extension: 'json' });
    expect(isExtensionJSON).to.equal(true);
  });

  it('should not be a JSON extension file', () => {
    const isExtensionJSON = UtilsService.isExtensionJSON();
    expect(isExtensionJSON).to.equal(undefined);
  });

  it('should to validate if object is a typeof string', () => {
    const jsonFormatString = UtilsService.dataIsString('{\'only_env\': \'true\'}');
    expect(jsonFormatString).to.equal(true);
  });

  it('should to validate if object is NOT a typeof string', () => {
    const jsonFormatString = UtilsService.dataIsString({ only_env: true });
    expect(jsonFormatString).to.equal(false);
  });

  it('should return null to check if data is string', () => {
    const jsonFormatString = UtilsService.dataIsString();
    expect(jsonFormatString).to.equal(null);
  });

  it('should to validate if data is object', () => {
    const isObj = UtilsService.isObject({ only_env: true });
    expect(isObj).to.equal(true);
  });

  it('should return object command parsed', () => {
    const parsedJSON = UtilsService.validateCommandsJSON('{\'only_env\': \'true\'}');
    expect(typeof parsedJSON).to.equal('object');
  });

  it('should return only object command', () => {
    const parsedJSON = UtilsService.validateCommandsJSON({ only_env: true });
    expect(typeof parsedJSON).to.equal('object');
  });

  it('should return object with default attribute TRUE if it\'s YML', () => {
    const defaultAttr = UtilsService.validateCommandsJSON({ siteId: 'default', extension: 'yml' });
    expect(typeof defaultAttr).to.equal('object');
    expect(defaultAttr.default).to.equal(true);
  });

  it('should return object with empty attribute for siteId and if it\'s YML extension', () => {
    const defaultAttr = UtilsService.validateCommandsJSON({ siteId: '', extension: 'yml' });
    expect(typeof defaultAttr).to.equal('object');
    expect(defaultAttr.default).to.equal(true);
  });

  it('should return NULL if siteId is default and extension is JSON', () => {
    const defaultAttr = UtilsService.validateCommandsJSON({ siteId: 'default', extension: 'json' });
    expect(defaultAttr).to.equal(null);
  });

  it('should to validate operation MOD', () => {
    const result1 = UtilsService.isMod(3);
    const result2 = UtilsService.isMod(6);
    const result3 = UtilsService.isMod(null);
    const result4 = UtilsService.isMod(4, 4);
    const result5 = UtilsService.isMod(null, null);
    const result6 = UtilsService.isMod(undefined, undefined);
    const result7 = UtilsService.isMod(3, 6);
    const result8 = UtilsService.isMod(6, 3);
    const result9 = UtilsService.isMod(0);
    const result10 = UtilsService.isMod(0, 0);

    expect(result1).to.equal(false);
    expect(result2).to.equal(true);
    expect(result3).to.equal(false);
    expect(result4).to.equal(true);
    expect(result5).to.equal(false);
    expect(result6).to.equal(false);
    expect(result7).to.equal(false);
    expect(result8).to.equal(true);
    expect(result9).to.equal(false);
    expect(result10).to.equal(false);
  });

});