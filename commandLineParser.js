#!/usr/bin/env node
let map = new Map()
let arr = []
let obj = {}
const setValue = (a, b) => {
  if (map.get(a) === undefined || map.get(a) === true) {
    obj[a] = [b]
    return map.set(a, b)
  }
  if (obj[a]) {
    obj[a].push(b)
  }
  // console.log(obj)
  return map.set(a, obj[a])
  // let tempVal
  // console.log(...map.get(a))
  // if(typeof map.get(a) === 'string') tempVal = map.get(a)
  // else{
  // 	tempVal = [tempVal, ...map.get(a)]
  //} 

  //let tempVal = [...map.get(a)]
  //tempVal.push(map.get(a))
  // tempVal.push(b)
  // return map.set(a, tempVal)
}
const flagValue = data => {
  let b = /^(-){1,2}([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(data)
  if (b !== null) return setValue(b[2], b[4])
  return null
}
const flag = (data, i) => {
  let c = /^(-){1,2}([a-z]+)$/ig.exec(data)
  let e = /[a-z]+|[0-9]+/ig.exec(process.argv[2 + i + 1])

  if (c !== null) {
    if (map.get(c[2]) === undefined) {
      map.set(c[2], true)
      if (e === null) return
    }
    return setValue(c[2], e[0])
    return map.set(c[2], map.get(c[2]))
  }
  return null
}
const links = (data, i) => {
  let f = /^(-){1,2}([a-z]+)$/ig.exec(process.argv[2 + i - 1])
  if (f !== null) {
    let g = /^((https:\/\/){0,1}|(https:\/\/){0,1}(w){3}[.]{1}|(http:\/\/){0,1}|(w){3}[.]{1})([a-z]+[.]{1})([a-z]{3})$/ig.exec(data)
    if (g !== null) return map.set(f[2], g[0])
  }
  return null
}
const fillArray = data => {
  arr.push(data)
  return map.set('_', arr)
}

const arbitraryValue = (data, i) => {
  let f = /^(-){1,2}([a-z]+)$/ig.exec(process.argv[2 + i - 1])
  let e = /[a-z]+|[0-9]+/ig.exec(data)
  if (f === null) {
  if (e[0].length === data.length) return fillArray(e[0])
  }
  return null
}
const arbitraryExp = data => {
  let d = /^([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(data)
  if (d !== null) return fillArray(d[0])
  return null
}
const fileName = data => {
  let h = /^(([a-z]+[0-9]*(.))|(.))*((.){1}([a-z]+[0-9]?){1})$/ig.exec(data)
  if (h !== null) return fillArray(h[0])
  return null
}
process.argv.slice(2).map((a, i) => {
   if (flagValue(a)) return
   if (flag(a, i)) return
   if (arbitraryExp(a)) return
   if (links(a, i)) return
   if (arbitraryValue(a, i)) return
   return fileName(a)
})
map.set('$0', require('path').basename(process.argv[1]))
let mapAsc = new Map([...map.entries()].sort())
console.log(mapAsc)
