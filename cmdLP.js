#!/usr/bin/env node
let path = process.argv[1].split('').reverse()
let $0 = []
const pather = () => {
  let i = 0
  while (path[i] !== '/') {
    $0.push(path[i])
    i++
  }
  return $0.reverse().join('')
}
let arg = process.argv.slice(2)
let mapper = new Map()
let arr = []
mapper.set('_', arr)
mapper.set('$0', pather(path))
const removeDash = arg.map((flag) => {
  if (flag[0] !== '-') arr.push(flag)
  if ((flag[0] === '-') && (flag[1] === '-')) {
    flag = flag.slice(2)
    return flag
  }
  if (flag[0] === '-') {
    flag = flag.slice(1)
    return flag
  }
})
const keyRing = []
const getValue = removeDash.map((value) => {
  let key = []
  if (value !== undefined) {
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
  }
})
for (let i = 0; i < keyRing.length; i++) {
  mapper.set(keyRing[i], getValue[i])
}
console.log(mapper)
// const replaceColon = removeDash.map((flag) => flag.replace(/=/g, ':'))
// console.log(Object.keys(replaceColon))
