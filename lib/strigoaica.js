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
            if (s.type === 'gmail') {
                var Gmail = require('../strategies/gmail');
                return new Gmail(Object.assign(strategyOptions, {
                    auth: {
                        user: s.options.user,
                        pass: s.options.pass
                    }
                }));
            }
            if (s.type === 'facebook') {
                var Facebook = require('../strategies/facebook');
                return new Facebook(Object.assign(strategyOptions, {
                    pageAccessToken: s.options.pageAccessToken
                }));
            }
            // if (s.type === 'sendgrid') {
            //   const Sendgrid = require(path.join(__dirname, '../strategies/sendgrid'))
            //   return new Sendgrid(Object.assign({
            //     auth: {
            //       apiKey: s.options.auth.apiKey
            //     }
            //   }, strategyOptions))
            // }
            // if (s.type === 'maildev') {
            //   const MailDev = require(path.join(__dirname, '../strategies/maildev'))
            //   return new MailDev(Object.assign({
            //     port: s.options.port
            //   }, strategyOptions))
            // }this.type = 'gmail'
            throw new Error("Strategy " + s.type + " not recognized");
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