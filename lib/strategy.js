"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Strategy = /** @class */ (function () {
    function Strategy() {
    }
    Strategy.prototype.send = function (templateId, data) { };
    Strategy.extractMergeValueMeta = function (rawTemplate) {
        var toCamelCase = require('case').camel;
        return rawTemplate
            .split('\n')
            .filter(function (line) { return line.startsWith('['); })
            .map(function (line) { return line
            .slice(1, line.length - 1)
            .split(':', 2); })
            .reduce(function (acc, curr) {
            acc[toCamelCase(curr[0])] = curr[1].trim();
            return acc;
        }, {});
    };
    Strategy.fillMergeValueTemplate = function (rawTemplate, params) {
        var toCamelCase = require('case').camel;
        /** Remove meta */
        rawTemplate = rawTemplate
            .split('\n')
            .filter(function (line) { return !line.startsWith('['); })
            .join('\n');
        /** Extract unique mergeValues */
        var mergeValues = Strategy.extractMergeValues(rawTemplate);
        /** Replace mergeValues with payloadValues */
        for (var i = mergeValues.length - 1; i >= 0; i--) {
            var mv = mergeValues[i];
            var param = params[toCamelCase(mv.slice(2, mv.length - 2))];
            mv = mv
                .replace(/\*/g, '\\*')
                .replace(/\|/g, '\\|');
            if (param) {
                rawTemplate = rawTemplate.replace(new RegExp(mv, 'g'), param);
                mergeValues.splice(i, 1);
            }
        }
        if (mergeValues.length) {
            throw new Error('Missing merge values');
        }
        return rawTemplate;
    };
    /**
     * Aux
     */
    Strategy.extractMergeValues = function (text) {
        return text
            .match(/\*\|(\w*)\|\*/g)
            .reduce(function (acc, curr) {
            if (!acc.includes(curr)) {
                acc.push(curr);
            }
            return acc;
        }, []);
    };
    return Strategy;
}());
exports.Strategy = Strategy;
//# sourceMappingURL=strategy.js.map