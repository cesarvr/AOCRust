let data = require('fs').readFileSync('./input.txt').toString().split('')
data.pop()

function reacting(candidate_1, candidate_2) {
  if (candidate_1.toLowerCase() === candidate_2.toLowerCase()) {
    if ( candidate_1 !== candidate_2 ) { 
      return true
    }
  }

  return false
}

function process(data) {
  let queue = []

  while(data.length > 0) {
    let candidate_1 = data.pop()
    let candidate_2 = queue.pop() 

    if (candidate_2 === undefined) {
      queue.push(candidate_1)
      continue
    }

    let react = reacting(candidate_1, candidate_2)

    if(!react) {
      queue.push(candidate_2)
      queue.push(candidate_1)
    }

  }

  let result = queue.reverse().join('')

  return result.length
}

function remove_units(chr, data) {
  let lwr = chr.toLowerCase()
  let upr = chr.toUpperCase()
  return data.filter(o => o !== lwr && o !== upr )
}


function solve_puzzle_part_two(data){
  let cache = {} 
  let cnt = 0 

  while(cnt < data.length) {
    let unit = data[cnt].toLowerCase() 
    cnt++

    if( cache[unit] !== undefined ) 
      continue

    let m = remove_units(unit, data)
    cache[unit] = process( m ) 
  }

  return Object.values(cache).sort()[0]
}

console.log( 'Puzzle 1-> ', process([...data]))
console.log( 'Puzzle 2-> ', solve_puzzle_part_two([...data]))

