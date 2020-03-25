"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var vue_1 = require("vue");
var vuex_1 = require("vuex");
vue_1.default.use(vuex_1.default);
var storageKey = 'todo-list';
exports.default = new vuex_1.default.Store({
    state: {
        lists: [],
    },
    getters: {
        getListById: function (state) { return function (id) { return state.lists.find(function (item) { return item.id == id; }); }; },
    },
    mutations: {
        setLists: function (state, list) {
            state.lists = list;
        },
        createList: function (state, newList) {
            state.lists.push(newList);
        },
        updateList: function (state, newList) {
            state.lists = state.lists.map(function (item) {
                return item.id == newList.id ? newList : item;
            });
        },
        removeList: function (state, id) {
            state.lists = state.lists.filter(function (item) { return item.id != id; });
        }
    },
    actions: {
        fetchLists: function (_a) {
            var commit = _a.commit;
            try {
                var list = JSON.parse(localStorage.getItem(storageKey));
                if (list)
                    commit('setLists', list);
            }
            catch (e) {
                console.log(e);
            }
        },
        saveLists: function (_a) {
            var state = _a.state;
            localStorage.setItem(storageKey, JSON.stringify(state.lists));
        },
        createList: function (_a, list) {
            var commit = _a.commit, dispatch = _a.dispatch;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            list.id = Date.now(); //TODO hash+timestamp
                            commit('createList', list);
                            return [4 /*yield*/, dispatch('saveLists')];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, list.id];
                    }
                });
            });
        },
        updateList: function (_a, list) {
            var commit = _a.commit, dispatch = _a.dispatch;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            commit('updateList', list);
                            return [4 /*yield*/, dispatch('saveLists')];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        removeList: function (_a, id) {
            var commit = _a.commit, dispatch = _a.dispatch;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            commit('removeList', id);
                            return [4 /*yield*/, dispatch('saveLists')];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
    }
});
//# sourceMappingURL=store.js.map