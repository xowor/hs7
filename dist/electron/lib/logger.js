"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLog = fetchLog;
exports.fetchCatch = fetchCatch;
function fetchLog(result) {
  console.log(result);

  return result;
}

function fetchCatch(err) {
  console.error(err);
}