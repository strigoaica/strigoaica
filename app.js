'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var logger = require("agathias");
var express = require("express");
var bodyParser = require("body-parser");
var config_1 = require("./config/config");
var app = express();
app.init = initialize;
app.use(bodyParser.json());
app.get('/', function (req, res) { return res.sendStatus(200); });
app.post('/send', function (req, res) {
    if (req.body.templateId === undefined ||
        req.body.data === undefined) {
        return res.sendStatus(400);
    }
    app.strigoaica
        .send(req.body.templateId, req.body.data, req.body.strategies)
        .then(function (result) { return res.send(result); })
        .catch(function (error) {
        if (error.message === 'Missing parameters') {
            return res.status(400).send('Missing parameters');
        }
        if (error.message === 'Missing merge values') {
            return res.status(400).send('Missing merge values');
        }
        logger.error(error);
        return res.sendStatus(500);
    });
});
function initialize() {
    /**
     * Logging
     */
    if (process.env.NODE_ENV !== 'test') {
        logger.init();
    }
    /**
     * Strigoaica
     */
    var Strigoaica = require('./lib/strigoaica');
    var options = {
        templatesPath: config_1.config.templatesPath,
        strategies: Object.keys(config_1.config.strategies).map(function (key) { return ({
            type: key,
            options: config_1.config.strategies[key]
        }); })
    };
    app.strigoaica = new Strigoaica(options);
}
module.exports = app;
//# sourceMappingURL=app.js.map