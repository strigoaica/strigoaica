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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("supertest");
describe('General test', function () {
    test('It should response the GET method', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app).get('/').expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Facebook strategy', function () {
    test('It should return Bad Request (no params)', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app).post('/send').expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('It should return Bad Request (missing body values)', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .post('/send')
                        .send({
                        templateId: 'example',
                        strategies: 'facebook'
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('It should return Bad Request (missing data values)', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .post('/send')
                        .send({
                        templateId: 'example',
                        strategies: 'facebook',
                        data: {}
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    /**
     * example:
     * Hello, *|name|*!
     */
    test('It should return Bad Request (missing merge values)', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .post('/send')
                        .send({
                        templateId: 'example',
                        strategies: 'facebook',
                        data: {
                            to: '666',
                            payload: {}
                        }
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('It should return enriched example template (1 recipient)', function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        templateId: 'example',
                        strategies: 'facebook',
                        data: {
                            to: '666',
                            payload: {
                                name: 'Sasha Grey'
                            }
                        }
                    };
                    return [4 /*yield*/, request(app)
                            .post('/send')
                            .send(data)
                            .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveLength(1);
                    expect(response.body[0]).toHaveLength(1);
                    expect(response.body[0][0]).toHaveProperty('to', '666');
                    expect(response.body[0][0]).toHaveProperty('template', 'Hello, Sasha Grey!');
                    return [2 /*return*/];
            }
        });
    }); });
    test('It should return enriched example template (2 recipients)', function () { return __awaiter(_this, void 0, void 0, function () {
        var data, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        templateId: 'example',
                        strategies: 'facebook',
                        data: {
                            to: [
                                '666',
                                '999'
                            ],
                            payload: {
                                name: 'Sasha Grey'
                            }
                        }
                    };
                    return [4 /*yield*/, request(app)
                            .post('/send')
                            .send(data)
                            .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveLength(1);
                    expect(response.body[0]).toHaveLength(2);
                    expect(response.body[0][0]).toHaveProperty('to', '666');
                    expect(response.body[0][0]).toHaveProperty('template', 'Hello, Sasha Grey!');
                    expect(response.body[0][1]).toHaveProperty('to', '999');
                    expect(response.body[0][1]).toHaveProperty('template', 'Hello, Sasha Grey!');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Gmail strategy', function () {
    test('It should return Bad Request (no params)', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app).post('/send').expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('It should return Bad Request (missing body values)', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .post('/send')
                        .send({
                        templateId: 'example',
                        strategies: 'gmail'
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('It should return Bad Request (missing data values)', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .post('/send')
                        .send({
                        templateId: 'example',
                        strategies: 'gmail',
                        data: {}
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    /**
     * example:
     * [SUBJECT: I am an example]
     * <div style="text-align:center">
     *   <h1 style="font-weight:initial">
     *     <strong>*|ANSWER|*</strong>
     *   </h1>
     *
     *   <h2 style="font-weight:initial">
     *     <strong>*|LONG_ANSWER|*</strong>
     *   </h2>
     * </div>
     */
    test('It should return Bad Request (missing merge values)', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .post('/send')
                        .send({
                        templateId: 'example',
                        strategies: 'gmail',
                        data: {
                            from: 'strigoaica@gmail.com',
                            to: 'john.smith@gmail.com,jane.smith@gmail.com',
                            payload: {}
                        }
                    })
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('It should return enriched example template (1 recipient)', function () { return __awaiter(_this, void 0, void 0, function () {
        var processedTemplate, data, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    processedTemplate = '<divstyle="text-align:center"><h1style="font-weight:initial"><strong>42</strong></h1><h2style="font-weight:initial"><strong>0011010000110010</strong></h2></div>';
                    data = {
                        templateId: 'example',
                        strategies: 'gmail',
                        data: {
                            from: 'strigoaica@gmail.com',
                            to: 'john.smith@gmail.com,jane.smith@gmail.com',
                            payload: {
                                answer: 42,
                                longAnswer: '0011010000110010'
                            }
                        }
                    };
                    return [4 /*yield*/, request(app)
                            .post('/send')
                            .send(data)
                            .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveLength(1);
                    expect(response.body[0]).toContainAllKeys([
                        'from',
                        'to',
                        'subject',
                        'html'
                    ]);
                    expect(response.body[0].html.replace(/\s/g, '')).toEqual(processedTemplate);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=app.test.js.map