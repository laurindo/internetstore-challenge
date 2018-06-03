const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;

const UtillService = require('./services/utils-service');
const GeneralConstant = require('./constants/general-constant');
const ReadDataService = require('./services/read-data-service');
const ManagerCLIService = require('./services/manager-cli-service');
const ManagerDataFileModel = require('./models/manager-data-file-model');
const ReadDataRoute = require('./routes/read-data-route');
const CLI_PARAMS = GeneralConstant.CLI_PARAMS;

/**
 * export NODE_ENV=dev  - development
 * export NODE_ENV=qa   - staging
 * export NODE_ENV=prod - production
*/
dotenv.load({
    path: UtillService.getEnvironment()
});

/**
 * Parse application/json
*/
app.use(bodyParser.json());

/**
 * Routes to test API
*/
ReadDataRoute.start(app);

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});

/**
 * START CLI
*/
//ManagerDataFileModel.start();