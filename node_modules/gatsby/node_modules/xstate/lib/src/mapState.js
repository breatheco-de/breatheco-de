"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function mapState(stateMap, stateId) {
    var foundStateId;
    utils_1.keys(stateMap).forEach(function (mappedStateId) {
        if (utils_1.matchesState(mappedStateId, stateId) &&
            (!foundStateId || stateId.length > foundStateId.length)) {
            foundStateId = mappedStateId;
        }
    });
    return stateMap[foundStateId];
}
exports.mapState = mapState;
