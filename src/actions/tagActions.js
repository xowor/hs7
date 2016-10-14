export function readTags() {
  return (dispatch) => {
    dispatch({ type: 'TAGS_READ_S' })
  }
}

export function readTag(tag) {
  return (dispatch) => {
    dispatch({
      type: 'TAG_READ_S',
      tag: tag
    })
  }
}
