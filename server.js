#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var logger = require("agathias");
var config_1 = require("./config/config");
var port = config_1.config.port;
var app = require('./app');
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    logger.info("Strigoaica listening on :" + bind);
    if (process.env.NODE_ENV === 'development') {
        logger.debug('Development mode');
    }
    app.init(server);
}
//# sourceMappingURL=server.js.map