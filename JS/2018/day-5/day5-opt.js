const reaction = (a,b) => a.toLowerCase() === b.toLowerCase() && a !== b 

const solvingPuzzleOne = (puzzle_input) =>{
  let lhs = ''
  let tested = []
  let size = puzzle_input.length
  for(let i=0; i<size; i++){
    let candidate = puzzle_input[i] 
    if(lhs === ''){
      lhs = candidate
      continue
    }

    if(!reaction(lhs, candidate)) {	
      tested.push(lhs)
      lhs = candidate
    }else
      lhs = tested.pop() || ''

  }

  tested.push(lhs)
  return tested.length
}

const solvingPuzzleTwo = (puzzle_input) => {
  let cache = {}
  let maxReaction = Infinity 
  let size = puzzle_input.length
  for(let i=0; i<size; i++){
    let token = puzzle_input[i].toLowerCase()

    if( cache[token] === undefined ){
      let removedStuff = puzzle_input.replace(new RegExp(token, "ig"), '') 
      let ret = solvingPuzzleOne(removedStuff) 
      maxReaction = Math.min(maxReaction, ret)
      cache[token] = 1
    } 
  }
  return maxReaction
}

let puzzle_real = require('fs').readFileSync('./puzzle.txt').toString()
let puzzle = 'dabAcCaCBAcCcaDA'

console.log('Solution 1->' ,solvingPuzzleOne(puzzle_real) )
console.log('Solution 2->' ,solvingPuzzleTwo(puzzle_real) )















