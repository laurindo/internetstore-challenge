const expect = require('chai').expect;
const UtilsService = require('../services/utils-service');

describe('## UTILS SERVICE ##', () => {
  it('should be a YAML extension file', () => {
    const isYAML = UtilsService.isYML({ extension: 'yaml' });
    expect(isYAML).to.equal(true);
  });
  
  it('should be a YML extension file', () => {
    const isYML = UtilsService.isYML({ extension: 'yml' });
    expect(isYML).to.equal(true);
  });

  it('should not be a YML extension file', () => {
    const isYML = UtilsService.isYML();
    expect(isYML).to.equal(undefined);
  });

  it('should be a JSON extension file', () => {
    const isJSON = UtilsService.isJSON({ extension: 'json' });
    expect(isJSON).to.equal(true);
  });

  it('should not be a JSON extension file', () => {
    const isJSON = UtilsService.isJSON();
    expect(isJSON).to.equal(undefined);
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
});