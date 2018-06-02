const ManagerDataFileModel = require('../models/manager-data-file-model');

function ReadDataRoute() {
  this.start = app => {
    app.get('/', (req, res) => {
      res.send('Hi, thank you to access my page.');
    });

    app.get('/api/get-config', (req, res) => {
      ManagerDataFileModel.getDataByAPI(req, res);
    });
  };
};

module.exports = new ReadDataRoute();