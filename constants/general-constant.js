exports.ERRORS = {
    error_on_perform_mod: 'Error on perform function MOD',
    default: 'Some error happenend',
    error_parse: 'It was not possible to parse file',
    options_not_be_empty: 'Options should not be empty',
    data_empty: 'Data is empty',
    some_error_happened: 'Happened some error',
    name_and_extension_required: 'Config Name and Extension are required',
    help: `
    You probably forgot some argument. 
    
    [HELP]
    -cn configName:     represent the file's name       (checkout/config/forms_customer)
    -si siteId:         represent site name             (bkbe/anpl/bkit)
    -ev environment:    represent environment name      (production/staging/development)
    -ex extension:      represent file extension        (yaml/json)
    -cm commands:       I can pass extra commands       ({ 'only_env': true })
    `
};

exports.CLI_PARAMS = {
    cn: '-cn',
    si: '-si',
    ex: '-ex',
    ev: '-ev',
    cm: '-cm'
};

exports.EXTENSIONS = {
    json: 'json',
    yml: 'yml',
    yaml: 'yaml'
};

exports.SITES = ['anpl', 'bkbe', 'bkit'];

exports.ENV = {
    prod: 'production',
    qa: 'staging',
    dev: 'development'
};

exports.FIXTURE_PATH = './fixtures';