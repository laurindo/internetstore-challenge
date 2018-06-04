const expect = require('chai').expect;
const ReadDataFactoryService = require('../services/read-data-factory-service');
const MergeDataService = require('../services/merge-data-service');
const GeneralConstants = require('../constants/general-constant');
const ENV = GeneralConstants.ENV;
const ERRORS = GeneralConstants.ERRORS;

const envProd = ENV.prod;
const envStaging = ENV.qa;
const envDevelopment = ENV.dev;

const bkbe = {
  production: {
    payment: {
      ideal: {
        active: false
      }
    }
  }
};

const objEnv = {
  production: {
    stepStyle: 'multi'
  },
  staging: {
    klarna: {
      baseUri: 'https://checkout.testdrive.klarna.com'
    }
  },
  development: {
    klarna: {
      baseUri: 'https://checkout.testdrive.klarna.com'
    }
  }
};

describe('## MERGE DATA ##', () => {
  it('should merge data', () => {
    const mergedData = MergeDataService.merge({ siteId: 'anpl', extension: 'json' }, { env: 'production' });
    expect(mergedData.siteId).to.be.equal('anpl');
    expect(mergedData.extension).to.be.equal('json');
    expect(mergedData.env).to.be.equal('production');
  });

  it('should to validate {} merge data', () => {
    const mergedData = MergeDataService.merge({});
    expect(mergedData.siteId).to.be.equal(undefined);
  });

  it('should to validate NULL merge data', () => {
    const mergedData = MergeDataService.merge(null);
    expect(mergedData.siteId).to.be.equal(undefined);
  });

  it('should to merge ENVs to object siteId(bkbe)', () => {
    const mergedDataProduction = MergeDataService.mergeEnv(objEnv, envProd, bkbe);
    const mergedDataStaging = MergeDataService.mergeEnv(objEnv, envStaging, bkbe);
    const mergedDataDevelopment = MergeDataService.mergeEnv(objEnv, envDevelopment, bkbe);

    expect(mergedDataProduction).to.include.all.keys('payment', 'stepStyle');
    expect(mergedDataProduction.stepStyle).to.be.equal('multi');
    expect(mergedDataProduction.payment).to.include.all.keys('ideal');

    expect(mergedDataStaging).to.include.all.keys('klarna');
    expect(mergedDataStaging.klarna.baseUri).to.be.equal('https://checkout.testdrive.klarna.com');

    expect(mergedDataDevelopment).to.include.all.keys('klarna');
    expect(mergedDataDevelopment.klarna.baseUri).to.be.equal('https://checkout.testdrive.klarna.com');
  });

  it('should return error message to try merge env', () => {
    const mergeError = MergeDataService.mergeEnv(null, envDevelopment, bkbe);
    expect(mergeError.message).to.be.equal(ERRORS.error_parse);
    expect(mergeError.status).to.be.equal(500);
    expect(mergeError).to.include.all.keys('error');
  });

  it('should to merge all environment inside sites', () => {
    const mock_all_sites = {"anpl":{"production":{"payment":{"p24":{"active":true,"symbol":"p24","position":1},"klarna_invoice":{"active":false,"symbol":"klarna","label":true,"position":15},"klarna_finance":{"active":false,"symbol":"klarna","label":true,"position":16},"cash_on_delivery":{"active":false,"symbol":"cash_on_delivery","label":true,"position":9},"santander":{"active":false,"symbol":"","position":8},"billpay":{"active":false,"symbol":"billpay","label":true,"position":4},"billpay_invoice":{"active":false,"symbol":"billpay","label":true,"position":3},"billpay_paylater":{"active":false,"symbol":"paylater","label":true,"position":5},"directtransfer":{"active":false,"symbol":"directtransfer","position":6},"moneyorder":{"active":false,"symbol":"moneyorder","label":true,"position":4},"paypal":{"active":true,"symbol":"paypal","position":3},"creditcard":{"active":true,"symbol":"creditcard","label":true,"config":{"availableTypes":["visa","mastercard"]},"position":2},"voucherPayment":{"active":true,"symbol":"voucher","label":true,"position":12}}},"staging":{"test":"test"}},"bkbe":{"production":{"payment":{"ideal":{"active":false,"symbol":"ideal","position":17},"klarna_invoice":{"active":false,"symbol":"klarna","label":true,"position":15},"klarna_finance":{"active":false,"symbol":"klarna","label":true,"position":16},"cash_on_delivery":{"active":false,"symbol":"cash_on_delivery","label":true,"position":9},"santander":{"active":false,"symbol":"","position":8},"billpay":{"active":false,"symbol":"billpay","label":true,"position":"4"},"billpay_invoice":{"active":false,"symbol":"billpay","label":true,"position":3},"billpay_paylater":{"active":false,"symbol":"paylater","label":true,"position":5},"directtransfer":{"active":false,"symbol":"directtransfer","position":6},"moneyorder":{"active":true,"symbol":"moneyorder","label":true,"position":7},"paypal":{"active":true,"symbol":"paypal","position":1},"creditcard":{"active":true,"symbol":"creditcard","label":true,"config":{"availableTypes":["visa","mastercard"]},"position":2},"voucherPayment":{"active":true,"symbol":"voucher","label":true,"position":12}}}}};
    const mock_all_envs = {"production":{"stepStyle":"multi","stepperNav":true,"steps":{"0":{"name":"Cart","inNav":false,"pay":false},"1":{"name":"Step1","inNav":false,"pay":false,"loggedIn":{"name":"Address","inNav":true,"label":"checkout_address","id":"1"}},"2":{"name":"Payment","inNav":true,"label":"checkout_payment","pay":true,"id":"2"},"3":{"name":"Overview","inNav":true,"label":"checkout_overview","id":"3","pay":false},"4":{"name":"Confirmation","pay":false,"inNav":false}},"payment":{"ideal":{"active":false,"symbol":"ideal","position":17},"klarna_invoice":{"active":false,"symbol":"klarna","label":true,"position":15},"klarna_finance":{"active":false,"symbol":"klarna","label":true,"position":16},"cash_on_delivery":{"active":true,"symbol":"cash_on_delivery","label":true,"position":9},"santander":{"active":false,"symbol":"","position":8},"billpay":{"active":true,"symbol":"billpay","label":true,"position":"4"},"billpay_invoice":{"active":true,"symbol":"billpay","label":true,"position":3},"billpay_paylater":{"active":true,"symbol":"paylater","label":true,"position":5},"directtransfer":{"active":true,"symbol":"directtransfer","position":6},"moneyorder":{"active":true,"symbol":"moneyorder","label":true,"position":7},"paypal":{"active":true,"symbol":"paypal","position":1},"creditcard":{"active":true,"symbol":"creditcard","label":true,"config":{"availableTypes":["visa","mastercard"]},"position":2},"voucherPayment":{"active":true,"symbol":"voucher","label":true,"position":12}},"klarna":{"ordersName":"klarna_checkout","active":false,"merchantId":"2468","sharedSecret":"ryckZqFxB75WQ3o","baseUri":"https://checkout.klarna.com","contentType":"application/vnd.klarna.checkout.aggregated-order-v2+json","fetchUri":"/checkout/orders/","confirmationUri":"/checkout/klarna/confirmation.html","pushUri":"/checkout/klarna/confirm/klarnacheckout?klarna_order={checkout.order.uri}"}},"staging":{"klarna":{"baseUri":"https://checkout.testdrive.klarna.com"}},"development":{"klarna":{"baseUri":"https://checkout.testdrive.klarna.com"}}};
    const factory = ReadDataFactoryService.load('json');
    const result = factory.mergeResultByEachENVList(mock_all_sites, mock_all_envs);

    // ANPL
    expect(result.anpl.production.stepStyle).to.be.equal('multi');
    expect(result.anpl).to.include.all.keys('production', 'staging', 'development');
    expect(result.anpl.production.payment).to.include.any.keys('p24', 'klarna_invoice', 'klarna_delivery', 'santander');

    // BKBE
    expect(result.bkbe).to.include.all.keys('production', 'staging', 'development');
    expect(result.bkbe.production.payment).to.include.any.keys('ideal', 'klarna_invoice', 'klarna_delivery', 'santander');

  });

  it('should return error on try get all environment inside sites', () => {
    const factory = ReadDataFactoryService.load('json');
    const error = factory.mergeResultByEachENVList();
    expect(error).to.include.any.keys('status');
  });
});
