'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var https = require("https");
var Agathias = require("agathias");
var strategy_1 = require("../lib/strategy");
var Facebook = /** @class */ (function () {
    function Facebook(options) {
        this.templatesPath = options.templatesPath;
        this.type = 'facebook';
        this.logger = Agathias.getChild('facebook');
        this.pageAccessToken = options.pageAccessToken;
    }
    Facebook.prototype.send = function (templateId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var recipients, rawTemplate, template, templatesToSend;
            return __generator(this, function (_a) {
                this.logger.debug({ templateId: templateId, data: data });
                if (data.to === undefined || data.payload === undefined) {
                    return [2 /*return*/, Promise.reject(new Error('Missing parameters'))];
                }
                recipients = Array.isArray(data.to) ? data.to : [data.to];
                try {
                    rawTemplate = fs.readFileSync(this.templatesPath + "/" + templateId + ".txt", {
                        encoding: 'utf-8'
                    });
                }
                catch (error) {
                    return [2 /*return*/, Promise.reject(error)];
                }
                template = strategy_1.Strategy.fillMergeValueTemplate(rawTemplate, data.payload);
                templatesToSend = recipients.map(function (recipient) { return ({
                    to: recipient,
                    template: template
                }); });
                if (process.env.NODE_ENV !== 'production') {
                    this.logger.debug({ templatesToSend: templatesToSend });
                    return [2 /*return*/, Promise.resolve(templatesToSend)];
                }
                return [2 /*return*/, Promise.all(templatesToSend.map(function (data) {
                        return _this.sendHelper(data.recipient, data.template);
                    }))];
            });
        });
    };
    Facebook.prototype.sendHelper = function (recipient, template) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var options = {
                hostname: 'graph.facebook.com',
                path: '/v2.6/me/messages?access_token=' + _this.pageAccessToken,
                port: 443,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            var body = {
                messaging_type: 'UPDATE',
                recipient: {
                    id: recipient
                },
                message: {
                    text: template
                }
            };
            var req = https.request(options, function (res) {
                var data = '';
                res.on('data', function (chunk) { return data += chunk; });
                res.on('end', function () { return resolve(data); });
            });
            req.on('error', function (error) { return reject(error); });
            req.write(JSON.stringify(body).replace(/\\\\n/g, '\\n'));
            req.end();
        });
    };
    return Facebook;
}());
module.exports = Facebook;
//# sourceMappingURL=facebook.js.map