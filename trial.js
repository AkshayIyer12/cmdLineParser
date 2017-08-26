#!/usr/bin/env node
let arg = process.argv.slice(2)
const removeDash = arg.map((flag) => {
  if ((flag[0] === '-') && (flag[1] === '-')) { flag = flag.slice(2) }
  if (flag[0] === '-') { flag = flag.slice(1) }
  return flag
})
let mapper = new Map()
const keyRing = []
const getValue = removeDash.map((value) => {
  let key = []
  for (let i = 0; i < value.length; i++) {
    if (value[i] !== '=') {
      key.push(value[i])
    }
    if (value[i] === '=') {
      value = value.slice(i + 1)
      break
    }
  }
  keyRing.push(key.join(''))
  return value
})
for (let i = 0; i < keyRing.length; i++) {
  mapper.set(keyRing[i], getValue[i])
}
console.log(mapper)
// const replaceColon = removeDash.map((flag) => flag.replace(/=/g, ':'))
// console.log(Object.keys(replaceColon))
