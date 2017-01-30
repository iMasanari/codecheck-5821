"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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
var request = require("request");
var ackey = '869388c0968ae503614699f99e09d960f9ad3e12';
function main(argv) {
    return __awaiter(this, void 0, void 0, function () {
        var responses, nameAndCount, popular;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(argv.map(function (keyword) {
                        return getArchives(keyword, { rows: 1, wt: 'json', ackey: ackey });
                    }))];
                case 1:
                    responses = _a.sent();
                    nameAndCount = responses.map(function (response, i) { return ({
                        name: argv[i],
                        count: +response.result.numFound
                    }); });
                    popular = nameAndCount.reduce(function (a, b) { return a.count > b.count ? a : b; });
                    // 出力
                    console.log(JSON.stringify(popular));
                    return [2 /*return*/];
            }
        });
    });
}
function getArchives(keyword, param) {
    var paramArray = Object.keys(param).map(function (key) { return key + "=" + param[key]; });
    var url = "http://54.92.123.84/search?q=" + encodeURIComponent("Body:" + keyword) + "&" + paramArray.join('&');
    return new Promise(function (done) {
        request.get({ url: url, json: param.wt === 'json' }, function (error, response, body) { done(body.response); });
    });
}
module.exports = main;
