const fs = require('fs');
const yaml = require('js-yaml');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const GeneralConstant = require('../constants/general-constant');
const EXTENSIONS = GeneralConstant.EXTENSIONS;
const SITES = GeneralConstant.SITES;

const readData = async pathName => {
    const data = await readFile(pathName, 'utf8').catch(err => { return err });
    try {
        return JSON.parse(data);
    } catch (e) {
        return { err: e, detail: data };
    }
};

const readAllPromises = async options => {
    let sitesMerged = {};       // make a merge between files config
    let promises = [];          // list of array to be resolved using Promise.all
    let promiseResults = null;  // results of resolved promises

    // For each site I need to get the data inside the .json or .yaml
    SITES.forEach(async site => {
        let res = readData(getPathName(`${options.configName}_${site}`, options.extension));
        promises.push(res); 
    });

    // Get all promises resolved inside array
    promiseResults = await Promise.all(promises);
    promiseResults.forEach(result => {
        if (result && !result.err) {
            sitesMerged = Object.assign({}, sitesMerged, result);
        }
    });

    return sitesMerged;
};

const readFileJSON = async options => {
    let result = null;
    let err = null;
    
    if (options.siteId) {
        result = await readData(options.pathName);
    } else {
        let merged = {};
        result = await readAllPromises(options);
        let result1 = await readData(getPathName(`${options.configName}`, options.extension));
        Object.keys(result).forEach(key => {
            if (result[key][options.environment]) {
                merged = Object.assign({}, result1[options.environment], result[key][options.environment]);
                console.log(merged);
            }
            Object.assign({}, result1[options.environment], result[key][options.environment]);   
        });
        console.log(result1)
    }

    options.callback(null, result, options);
};

const readFileYML = options => {
    try {
        const callback = options.callback;
        const config = yaml.safeLoad(fs.readFileSync(options.pathName, 'utf8'));
        const indentedJson = JSON.stringify(config, null, 4);
        callback(null, indentedJson, options);
    } catch (e) {
        console.log(e);
        callback(e);
    }
};

const proxyReadFile = options => {
    if (options.extension === EXTENSIONS.json) {
        readFileJSON(options);
    } else if (options.extension === EXTENSIONS.yml || options.extension === EXTENSIONS.yaml) {
        readFileYML(options);
    }
};

const getFileName = (configName, siteId) => {
    if (configName && siteId) {
        return `${configName}_${siteId}`;
    } else if (configName) {
        return `${configName}`;
    }
    return null;
};

const getPathName = (fileName, extension) => {
    return `./config-files/${fileName}.${extension}`;
};

/**
 * @param {string} configName   - file name
 * @param {string} siteId       - name site
 * @param {string} configName   - file name
*/
/*const getConfig = (configName, siteId, extension, environment = 'production', command, callback) => {
    const fileName = getFileName(configName, siteId);
    const pathName = getPathName(fileName, extension);
    const options = {
        pathName,
        configName, 
        siteId,
        environment, 
        extension,
        command
    };

    if (!fileName) {
        callback({ error: 'At least configName is required' });
    }

    // Call File Stream to read the path file and execute callback
    proxyReadFile(options, callback);

};*/

const getConfig = (configName, siteId, environment = 'production', options) => {
    const fileName = getFileName(configName, siteId);
    const pathName = getPathName(fileName, options.extension);
    options = Object.assign({}, options, {
        pathName,
        configName, 
        siteId,
        environment
    });

    if (!fileName) {
        options.callback({ error: 'Config Name and Extension are required' });
    }

    // Call File Stream to read the path file and execute callback
    proxyReadFile(options);

};

exports.getConfig = getConfig;
exports.proxyReadFile = proxyReadFile;
exports.readFileJSON = readFileJSON;
exports.readFileYML = readFileYML;