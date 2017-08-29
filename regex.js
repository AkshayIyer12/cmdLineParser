let map = new Map()
let arr = []
process.argv.slice(2).map((a, i) => {
  let b = /^(-){1,2}([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(a)
  if (b !== null) return map.set(b[2], b[4])

  let c = /^(-){1,2}([a-z]+)$/ig.exec(a)
  if (c !== null) return map.set(c[2], undefined)

  let d = /^([a-z]+)(=){1}([\d]+|[a-z]+)$/ig.exec(a)
  if (d !== null) {
    arr.push(d[0])
    return map.set('_', arr)
  }
  let e = /[a-z]+|[0-9]+/ig.exec(a)
  if (/^(-){1,2}([a-z]+)$/ig.exec(process.argv[2 + i - 1]) !== null) {
    return map.set(/^(-){1,2}([a-z]+)$/ig.exec(process.argv[2 + i - 1])[2], e[0])
  }
  arr.push(e[0])
  return map.set('_', arr)
})
map.set('$0', require('path').basename(process.argv[1]))
console.log(map)
