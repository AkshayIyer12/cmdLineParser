#!/usr/bin/env node
let map = new Map()
let arr = []
const parseFlag = (a, b) => {
  if (map.get(a) === undefined) map.set(a, [])
  let tempVal = map.get(a)
  tempVal.push(b)
  return map.set(a, tempVal)
}
const parseFlagEqVal = data => {
  let b = /^(-){1,2}([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(data)
  if (b !== null) return parseFlag(b[2], b[4])
}
const parseDoubleDashFlag = data => {
  let c = /^(-){1,2}([a-z]+)$/ig.exec(data)
  if (c !== null) {
    if (map.get(c[2]) === undefined) {
      return map.set(c[2], [])
    }
    return map.set(c[2], map.get(c[2]))
  }
}
const parseArbitraryExp = data => {
  let d = /^([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(data)
  if (d !== null) {
    arr.push(d[0])
    return map.set('_', arr)
  }
}
process.argv.slice(2).map((a, i) => {
  // For catching expression flags like --a=4
  // let b = /^(-){1,2}([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(a)
  // if (b !== null) parseFlag(b[2], b[4])
  if (parseFlagEqVal(a)) return
  // // For catching expression flags like --a
  // let c = /^(-){1,2}([a-z]+)$/ig.exec(a)
  // if (c !== null) {
  //   if (map.get(c[2]) === undefined) {
  //     return map.set(c[2], [])
  //   }
  //   return map.set(c[2], map.get(c[2]))
  // }
  if (parseDoubleDashFlag(a)) return
  // For catching expression arbitrary a=4
  // let d = /^([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(a)
  // if (d !== null) {
  //   arr.push(d[0])
  //   return map.set('_', arr)
  // }
  if (parseArbitraryExp(a)) return
  // For catching value if expression flag is separated by space --a 4
  let e = /[a-z]+|[0-9]+/ig.exec(a)
  // For catching earlier value if it's in the format --flag
  let f = /^(-){1,2}([a-z]+)$/ig.exec(process.argv[2 + i - 1])
  if (f !== null) {
    if (e[0].length === a.length) return parseFlag(f[2], e[0])
    // For catching links like https://github.com http://github.com www.google.com
    let g = /^((https:\/\/){0,1}|(https:\/\/){0,1}(w){3}[.]{1}|(http:\/\/){0,1}|(w){3}[.]{1})([a-z]+[.]{1})([a-z]{3})$/ig.exec(a)
    if (g !== null) return map.set(f[2], g[0])
  }
  // For catching arbitrary value
  if (e[0].length === a.length) {
    arr.push(e[0])
    return map.set('_', arr)
  }
  // For catching filename with extension
  let h = /^(([a-z]+[0-9]*(.))|(.))*((.){1}([a-z]+[0-9]?){1})$/ig.exec(a)
  if (h !== null) {
    arr.push(h[0])
    return map.set('_', arr)
  }
})
// For setting up filename in $0
console.log(map.set('$0', require('path').basename(process.argv[1])))
