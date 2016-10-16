export function fetchLog(result) {
  console.log(result)

  return result
}

export function fetchCatch(err) {
  throw err
}

export function startupLog(obj) {
  return new Promise((resolve, reject) => {
    console.log('# ', obj)
    resolve()
  })
}

export function startupSubLog(obj) {
  return new Promise((resolve, reject) => {
    console.log('#### ', obj)
    resolve()
  })
}
