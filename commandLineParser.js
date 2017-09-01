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
const parseDashFlag = data => {
  let c = /^(-){1,2}([a-z]+)$/ig.exec(data)
  if (c !== null) {
    if (map.get(c[2]) === undefined) {
      return map.set(c[2], [])
    }
    return map.set(c[2], map.get(c[2]))
  }
  return null
}
const parseFlagSeparatedSpace = (data, i) => {
  let e = /[a-z]+|[0-9]+/ig.exec(data)
  let f = /^(-){1,2}([a-z]+)$/ig.exec(process.argv[2 + i - 1])
  if (f !== null) {
    if (e[0].length === data.length) return parseFlag(f[2], e[0])
    let g = /^((https:\/\/){0,1}|(https:\/\/){0,1}(w){3}[.]{1}|(http:\/\/){0,1}|(w){3}[.]{1})([a-z]+[.]{1})([a-z]{3})$/ig.exec(data)
    if (g !== null) return map.set(f[2], g[0])
  }
  return null
}
const fillArray = data => {
  arr.push(data)
  return map.set('_', arr)
}

const parseArbitraryExp = data => {
  let e = /[a-z]+|[0-9]+/ig.exec(data)
  if (e[0].length === data.length) return fillArray(e[0])
  return null
}
const parseArbitraryExpEQ = data => {
  let d = /^([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(data)
  if (d !== null) return fillArray(d[0])
  return null
}
const parseFilename = data => {
  let h = /^(([a-z]+[0-9]*(.))|(.))*((.){1}([a-z]+[0-9]?){1})$/ig.exec(data)
  if (h !== null) return fillArray(h[0])
  return null
}
process.argv.slice(2).map((a, i) => {
  if (parseFlagEqVal(a)) return
  if (parseDashFlag(a)) return
  if (parseArbitraryExpEQ(a)) return
  if (parseFlagSeparatedSpace(a, i)) return
  if (parseArbitraryExp(a)) return
  return parseFilename(a)
})
console.log(map.set('$0', require('path').basename(process.argv[1])))
