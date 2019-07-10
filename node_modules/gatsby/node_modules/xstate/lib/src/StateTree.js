"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var utils_2 = require("./utils");
var actions_1 = require("./actions");
var defaultStateTreeOptions = {
    resolved: false
};
var StateTree = /** @class */ (function () {
    function StateTree(stateNode, stateValue, options) {
        var _a;
        if (options === void 0) { options = defaultStateTreeOptions; }
        this.stateNode = stateNode;
        this.stateValue = stateValue;
        this.nodes = stateValue
            ? typeof stateValue === 'string'
                ? (_a = {},
                    _a[stateValue] = new StateTree(stateNode.getStateNode(stateValue), undefined),
                    _a) : utils_1.mapValues(stateValue, function (subValue, key) {
                return new StateTree(stateNode.getStateNode(key), subValue);
            })
            : {};
        var resolvedOptions = __assign({}, defaultStateTreeOptions, options);
        this.isResolved = resolvedOptions.resolved;
    }
    Object.defineProperty(StateTree.prototype, "done", {
        get: function () {
            var _this = this;
            switch (this.stateNode.type) {
                case 'final':
                    return true;
                case 'compound':
                    var childTree = this.nodes[utils_1.keys(this.nodes)[0]];
                    return childTree.stateNode.type === 'final';
                case 'parallel':
                    return utils_1.keys(this.nodes).every(function (key) { return _this.nodes[key].done; });
                default:
                    return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    StateTree.prototype.getDoneData = function (context, event) {
        if (!this.done) {
            return undefined;
        }
        if (this.stateNode.type === 'compound') {
            var childTree = this.nodes[utils_1.keys(this.nodes)[0]];
            if (!childTree.stateNode.data) {
                return undefined;
            }
            return utils_1.mapContext(childTree.stateNode.data, context, event);
        }
        return undefined;
    };
    Object.defineProperty(StateTree.prototype, "atomicNodes", {
        get: function () {
            var _this = this;
            if (this.stateNode.type === 'atomic' || this.stateNode.type === 'final') {
                return [this.stateNode];
            }
            return utils_1.flatten(utils_1.keys(this.value).map(function (key) {
                return _this.value[key].atomicNodes;
            }));
        },
        enumerable: true,
        configurable: true
    });
    StateTree.prototype.getDoneEvents = function (entryStateNodes) {
        var _this = this;
        // If no state nodes are being entered, no done events will be fired
        if (!entryStateNodes || !entryStateNodes.size) {
            return [];
        }
        if (entryStateNodes.has(this.stateNode) &&
            this.stateNode.type === 'final') {
            return [actions_1.done(this.stateNode.id, this.stateNode.data)];
        }
        var childDoneEvents = utils_1.flatten(utils_1.keys(this.nodes).map(function (key) {
            return _this.nodes[key].getDoneEvents(entryStateNodes);
        }));
        if (this.stateNode.type === 'parallel') {
            var allChildrenDone = utils_1.keys(this.nodes).every(function (key) { return _this.nodes[key].done; });
            if (childDoneEvents && allChildrenDone) {
                return childDoneEvents.concat(actions_1.done(this.stateNode.id));
            }
            else {
                return childDoneEvents;
            }
        }
        if (!this.done || !childDoneEvents.length) {
            return childDoneEvents;
        }
        // TODO: handle merging strategy
        // For compound state nodes with final child state, there should be only
        // one done.state event (potentially with data).
        var doneData = childDoneEvents.length === 1 ? childDoneEvents[0].data : undefined;
        return childDoneEvents.concat(actions_1.done(this.stateNode.id, doneData));
    };
    Object.defineProperty(StateTree.prototype, "resolved", {
        get: function () {
            return new StateTree(this.stateNode, this.stateNode.resolve(this.value), {
                resolved: true
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateTree.prototype, "paths", {
        get: function () {
            return utils_1.toStatePaths(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateTree.prototype, "absolute", {
        get: function () {
            var _this = this;
            var _stateValue = this.stateValue;
            var absoluteStateValue = {};
            var marker = absoluteStateValue;
            this.stateNode.path.forEach(function (key, i) {
                if (i === _this.stateNode.path.length - 1) {
                    marker[key] = _stateValue;
                }
                else {
                    marker[key] = {};
                    marker = marker[key];
                }
            });
            return new StateTree(this.stateNode.machine, absoluteStateValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateTree.prototype, "nextEvents", {
        get: function () {
            var _this = this;
            var ownEvents = this.stateNode.ownEvents;
            var childEvents = utils_1.flatten(utils_1.keys(this.nodes).map(function (key) {
                var subTree = _this.nodes[key];
                return subTree.nextEvents;
            }));
            return __spread(new Set(childEvents.concat(ownEvents)));
        },
        enumerable: true,
        configurable: true
    });
    StateTree.prototype.clone = function () {
        return new StateTree(this.stateNode, this.value);
    };
    StateTree.prototype.combine = function (tree) {
        var _this = this;
        var _a;
        if (tree.stateNode !== this.stateNode) {
            throw new Error('Cannot combine distinct trees');
        }
        if (this.stateNode.type === 'compound') {
            // Only combine if no child state is defined
            var newValue = void 0;
            if (!utils_1.keys(this.nodes).length || !utils_1.keys(tree.nodes).length) {
                newValue = Object.assign({}, this.nodes, tree.nodes);
                var newTree = this.clone();
                newTree.nodes = newValue;
                return newTree;
            }
            else {
                var childKey = utils_1.keys(this.nodes)[0];
                newValue = (_a = {},
                    _a[childKey] = this.nodes[childKey].combine(tree.nodes[childKey]),
                    _a);
                var newTree = this.clone();
                newTree.nodes = newValue;
                return newTree;
            }
        }
        if (this.stateNode.type === 'parallel') {
            var valueKeys = new Set(__spread(utils_1.keys(this.nodes), utils_1.keys(tree.nodes)));
            var newValue_1 = {};
            valueKeys.forEach(function (key) {
                if (!_this.nodes[key] || !tree.nodes[key]) {
                    newValue_1[key] = _this.nodes[key] || tree.nodes[key];
                }
                else {
                    newValue_1[key] = _this.nodes[key].combine(tree.nodes[key]);
                }
            });
            var newTree = this.clone();
            newTree.nodes = newValue_1;
            return newTree;
        }
        // nothing to do
        return this;
    };
    Object.defineProperty(StateTree.prototype, "value", {
        get: function () {
            if (this.stateNode.type === 'atomic' || this.stateNode.type === 'final') {
                return {};
            }
            if (this.stateNode.type === 'parallel') {
                return utils_1.mapValues(this.nodes, function (st) {
                    return st.value;
                });
            }
            if (this.stateNode.type === 'compound') {
                if (utils_1.keys(this.nodes).length === 0) {
                    return {};
                }
                var childStateNode = this.nodes[utils_1.keys(this.nodes)[0]].stateNode;
                if (childStateNode.type === 'atomic' || childStateNode.type === 'final') {
                    return childStateNode.key;
                }
                return utils_1.mapValues(this.nodes, function (st) {
                    return st.value;
                });
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    StateTree.prototype.matches = function (parentValue) {
        return utils_2.matchesState(parentValue, this.value);
    };
    StateTree.prototype.getEntryExitStates = function (prevTree, externalNodes) {
        var _this = this;
        if (prevTree.stateNode !== this.stateNode) {
            throw new Error('Cannot compare distinct trees');
        }
        switch (this.stateNode.type) {
            case 'compound':
                var compoundResult = {
                    exit: [],
                    entry: []
                };
                var currentChildKey = utils_1.keys(this.nodes)[0];
                var prevChildKey = utils_1.keys(prevTree.nodes)[0];
                if (currentChildKey !== prevChildKey) {
                    compoundResult.exit = prevTree.nodes[prevChildKey].getExitStates();
                    compoundResult.entry = this.nodes[currentChildKey].getEntryStates();
                }
                else {
                    compoundResult = this.nodes[currentChildKey].getEntryExitStates(prevTree.nodes[prevChildKey], externalNodes);
                }
                if (externalNodes && externalNodes.has(this.stateNode)) {
                    compoundResult.exit.push(this.stateNode);
                    compoundResult.entry.unshift(this.stateNode);
                }
                return compoundResult;
            case 'parallel':
                var all = utils_1.keys(this.nodes).map(function (key) {
                    return _this.nodes[key].getEntryExitStates(prevTree.nodes[key], externalNodes);
                });
                var parallelResult_1 = {
                    exit: [],
                    entry: []
                };
                all.forEach(function (ees) {
                    parallelResult_1.exit = __spread(parallelResult_1.exit, ees.exit);
                    parallelResult_1.entry = __spread(parallelResult_1.entry, ees.entry);
                });
                if (externalNodes && externalNodes.has(this.stateNode)) {
                    parallelResult_1.exit.push(this.stateNode);
                    parallelResult_1.entry.unshift(this.stateNode);
                }
                return parallelResult_1;
            case 'atomic':
            default:
                if (externalNodes && externalNodes.has(this.stateNode)) {
                    return {
                        exit: [this.stateNode],
                        entry: [this.stateNode]
                    };
                }
                return {
                    exit: [],
                    entry: []
                };
        }
    };
    StateTree.prototype.getEntryStates = function () {
        var _this = this;
        if (!this.nodes) {
            return [this.stateNode];
        }
        return [this.stateNode].concat(utils_1.flatten(utils_1.keys(this.nodes).map(function (key) {
            return _this.nodes[key].getEntryStates();
        })));
    };
    StateTree.prototype.getExitStates = function () {
        var _this = this;
        if (!this.nodes) {
            return [this.stateNode];
        }
        return utils_1.flatten(utils_1.keys(this.nodes).map(function (key) {
            return _this.nodes[key].getExitStates();
        })).concat(this.stateNode);
    };
    return StateTree;
}());
exports.StateTree = StateTree;
