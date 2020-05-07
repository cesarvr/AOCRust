let x = require('fs').readFileSync('./t.txt').toString().split(`\n`)

console.log(x)
let total = x.filter(n => n !== '').map(n => n.match(/#/g).length).reduce((acc, next)=> acc+next,0)

console.log('total: ', total)

