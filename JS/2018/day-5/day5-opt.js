const reaction = (a,b) => a.toLowerCase() === b.toLowerCase() && a !== b

const solvingPuzzleOne = (puzzle_input) =>{
  let lhs = ''
  let tested = []
  let size = puzzle_input.length
  for(let i=0; i<size; i++){
    let candidate = puzzle_input[i]

    if(tested.length === 0){
      tested.push(candidate)
      continue
    }

    let n = tested.pop()

    if(!reaction(n, candidate)) {
      tested.push(n)
      tested.push(candidate)
    }
  }
  
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

const solvingPuzzleTwov2 = (puzzle_input) => {
  let cache = {}
  let maxReaction = Infinity
  let size = puzzle_input.length
  let tmp = puzzle_input.split('')
  for(let i=0; i<size; i++){
    let token = puzzle_input[i].toLowerCase()

    if( cache[token] === undefined ){
      let buff  = tmp.filter(n => token !== n.toLowerCase()).join('') 

      let ret = solvingPuzzleOne(buff)
      maxReaction = Math.min(maxReaction, ret)
      cache[token] = 1
    }
  }
  return maxReaction
}

let puzzle_real = require('fs').readFileSync('./puzzle.txt').toString()
let puzzle = 'dabAcCaCBAcCcaDA'

console.log('Solution 1: ' ,solvingPuzzleOne(puzzle_real) )
console.log('Solution 2: ' ,solvingPuzzleTwo(puzzle_real) )
