'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var yaml = require("js-yaml");
var config;
exports.config = config;
if (!config) {
    loadConfigFile();
}
function loadConfigFile() {
    var configPath = process.env.CONFIG_PATH || path.join(__dirname, '..', 'strigoaica.yml');
    var extConfig = {};
    /**
     * Add Defaults
     */
    exports.config = config = {
        port: 1337,
        templatesPath: path.join(__dirname, '..', 'templates'),
        strategies: {}
    };
    /**
     * Load External Config File
     */
    try {
        extConfig = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
    /**
     * Populate/ Overwrite in-memory config
     */
    exports.config = config = Object.assign(config, extConfig);
    if (!extConfig.strategies) {
        console.error(new Error('At least 1 strategy must be provided'));
        process.exit(1);
    }
}
//# sourceMappingURL=config.js.map