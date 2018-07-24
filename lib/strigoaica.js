'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Agathias = require("agathias");
var logger = Agathias.getChild('strigoaica');
var Strigoaica = /** @class */ (function () {
    function Strigoaica(options) {
        var _this = this;
        this.templatesPath = options.templatesPath;
        this.strategies = options.strategies.map(function (s) {
            var strategyOptions = {
                templatesPath: _this.templatesPath + "/" + s.type
            };
            var strategy;
            try {
                strategy = require("strigoaica-" + s.type);
            }
            catch (e) {
                throw new Error("Strategy " + s.type + " not recognized");
            }
            return new strategy(Object.assign(strategyOptions, s.options));
        });
    }
    /**
     * Send to all active strategies
     * @param {string} templateId
     * @param {object} data
     * @param {(string|string[])} strategies
     * @returns {Promise<number[]>}
     */
    Strigoaica.prototype.send = function (templateId, data, strategies) {
        if (strategies === void 0) { strategies = 'all'; }
        logger.debug({ templateId: templateId, data: data, strategies: strategies });
        strategies = Array.isArray(strategies) ? strategies.join('|') : strategies;
        return Promise.all(this.strategies
            .filter(function (s) { return strategies === 'all' || strategies.includes(s.type); })
            .map(function (s) { return s.send(templateId, data); }));
    };
    return Strigoaica;
}());
module.exports = Strigoaica;
//# sourceMappingURL=strigoaica.js.map