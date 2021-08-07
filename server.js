const express = require("express");
const cors = require('cors');
const API = require('./routes/apiRoutes');

function createServer() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/api', API);
    return app;
}

module.exports = { createServer };