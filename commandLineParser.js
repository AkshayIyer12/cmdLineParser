let map = new Map()
let arr = []
process.argv.slice(2).map((a, i) => {
  // For catching expression flags like --a=4
  let b = /^(-){1,2}([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(a)
  if (b !== null) return map.set(b[2], b[4])

  // For catching expression flags like --a
  let c = /^(-){1,2}([a-z]+)$/ig.exec(a)
  if (c !== null) return map.set(c[2], undefined)

  // For catching expression arbitrary a=4
  let d = /^([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(a)
  if (d !== null) {
    arr.push(d[0])
    return map.set('_', arr)
  }
  // For catching value if expression flag is separated by space --a 4
  let e = /[a-z]+|[0-9]+/ig.exec(a)
  let f = /^(-){1,2}([a-z]+)$/ig.exec(process.argv[2 + i - 1])
  if (f !== null) {
    if (e[0].length === a.length) {
      return map.set(f[2], e[0])
    }
    let g = /^((https:\/\/){0,1}|(https:\/\/){0,1}(w){3}[.]{1}|(http:\/\/){0,1}|(w){3}[.]{1})([a-z]+[.]{1})([a-z]{3})$/ig.exec(a)
    if (g !== null) {
      return map.set(f[2], g[0])
    }
  }
  // For catching arbitrary value
  if (e[0].length === a.length) {
    arr.push(e[0])
    return map.set('_', arr)
  }
  let h = /^(([a-z]+[0-9]*(.))|(.))*((.){1}([a-z]+[0-9]?){1})$/ig.exec(a)
  if (h !== null) {
    arr.push(h[0])
    return map.set('_', arr)
  }
})
// For setting up filename in $0
console.log(map.set('$0', require('path').basename(process.argv[1])))