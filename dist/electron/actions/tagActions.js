'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readTags = readTags;
exports.readTag = readTag;
function readTags() {
  return function (dispatch) {
    dispatch({ type: 'TAGS_READ_S' });
  };
}

function readTag(tag) {
  return function (dispatch) {
    dispatch({
      type: 'TAG_READ_S',
      tag: tag
    });
  };
}