// test-setup.spec.js
const sinon = require('sinon');
const expect = require('chai').expect;

const ReadDataService = require('../services/read-data-service');
const ManagerDataFileModel = require('../models/manager-data-file-model');

describe('## READ FILES ##', () => {
  
  it('simple test to read checkout.json', done => {
    ReadDataService.readData('./fixtures/checkout.json').then(result => {
      if (result && result.error) { throw result; }
      expect(result).to.include.all.keys('production', 'development', 'staging');
      done();
    }).catch(err => {
      done();
    })
  });

  /**
   * Case 01
   * 
   * Output:
   * {
   *    anpl: {
   *      production: {
   *        ... data
   *      },
   *      staging: {
   *        ... data
   *      },
   *      development: {
   *        ... data
   *      }
   *    },
   *    bkbe: {
   *      production: {
   *        ... data
   *      },
   *      staging: {
   *        ... data
   *      },
   *      development: {
   *        ... data
   *      }
   *    }      
   * }
  */
  it('[Case 01] should be have a 3 objects with name (production/staging/development)', done => {
    const callback = (error, result, options) => {
      expect(result.anpl).to.include.all.keys('production', 'development', 'staging');
      expect(result.bkbe).to.include.all.keys('production', 'development', 'staging');
      done();
    };

    ReadDataService.getConfig('checkout', null, null, {
        extension: 'json',
        options: null,
        callback
    }); 
  });

  /**
   * Case 02
   * 
   * Output:
   * {
   *  production: {
   *    .. data
   *  },
   *  staging: {
   *    ... data
   * }
  */
  it('[Case 02] should have all envs by siteId', done => {
    const callback = (error, result, options) => {
      expect(result).to.include.all.keys('production');
      done();
    };

    ReadDataService.getConfig('checkout', 'anpl', 'production', {
        extension: 'json',
        commands: {only_env: true},
        callback
    }); 
  });

  /**
   * Case 03
   * 
   * Output:
   * {
   *    ... data   
   * }
  */
  it('[Case 03] should have a key payment', done => {
    const callback = (error, result, options) => {
      expect(result).to.include.all.keys('payment');
      done();
    };

    ReadDataService.getConfig('checkout', 'anpl', 'production', {
        extension: 'json',
        options: null,
        callback
    }); 
  });

});