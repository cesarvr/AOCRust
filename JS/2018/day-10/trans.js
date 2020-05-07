let payload = require('fs').readFileSync('./test-input.txt').toString().split(/\r?\n/)

let variable = `var pixel = `
let parse = (line) => {
  return '{ ' + line.replace(/=/g, ':').replace(/</g, '[').replace(/>/g, '],') + ' }'
}

let l = '['
payload.forEach(line => {
  if(line !== '')
    l += parse(line) + ','
})

l += ']'

console.log(variable+l)

require('fs').writeFileSync('input2.js', variable+l)
