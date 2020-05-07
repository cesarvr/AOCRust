const readPuzzleInput = (name) => {
  let raw = require('fs').readFileSync(`./${name}`).toString()
  raw = raw.split(`\n`).filter(n => n !== '')
  let initialState = raw[0].replace('initial state: ', '')
  let states = raw.slice(1, (raw.length ))

  return {initialState, states}
}

function verify(raw_pattern){
  let [pattern, result]  = raw_pattern.split(' => ')
  return function(curr) {
    //console.log(`matching -> ${pattern} -> ${curr} == ${pattern === curr}`)
    if(pattern === curr)
      return result
    else
      return undefined
  }
}

/*
    [#..#]
    current: ..[#..]
    cells => ..#.. => #

    [##..]
    current: ..[##.] 
    cells => ..##. => . 

    current: .[##..   ]

*/

const Pots = function(_str) {
  let str =  _str
  let o = {}
  let padding = 0

  o.add_padding_left = () => {
    if(str.indexOf('#') < 3){
      str = '...' + str
      padding += 3 
    }
  }

  o.add_padding_right = () => {

    if(str.substring(str.length - 3).includes('#'))
      str = str + '...'
  }

  o.str = () => str

  o.refresh = (_str) => str = _str

  o.count = () => {
    let score = 0
    for(let i=0; i<str.length; i++){
      if(str[i] === '#'){
        score +=  i - padding
      }
    }
    
    return score
  }


  return o 
}

function Solve2() {
  let last_g = 0
  let diff = 0

  return function(pots_count, generation){
    /*
     * Solving part 2
     */

    let ndiff = pots_count - last_g

    if(diff !== ndiff){
      console.log('diff ->', ndiff, ' generation: ', generation+1, ' pots: ', pots_count)
      diff = ndiff  
    } else { 
      let target = 50000000000 - (generation + 1) 
      console.log('target ->', (target * ndiff), (target * ndiff) + pots_count)
      let solution = (target * ndiff) + pots_count 
      console.log('diff ->', ndiff, ' generation: ', generation+1, ' pots: ', pots_count, ` [ solution: ${solution}]`)
      process.exit(0)
    }

    last_g = pots_count 

    /*
     *
     */
  }
}

function solve1(is, lvl, cells){

  let pots = new Pots(is)
  let s2 = Solve2() 
  //console.log(`state: ${is}, gen: ${0}`)

  for(let generation=0; generation<lvl; generation++) {
    let new_state = []

    pots.add_padding_left()
    pots.add_padding_right()
    let current_state = pots.str()
    for(let i=0; i < current_state.length; i++) {

      let state = current_state[i + -2] || '.'
      state    += current_state[i + -1] || '.' 
      state    += current_state[i] || '.'
      state    += current_state[i + 1] || '.'
      state    += current_state[i + 2] || '.' 

      let matches = cells
        .map(n => n(state))
        .find(n => n !== undefined) 

      new_state.push( matches || '.' )
    }

    //console.log('ns ->', new_state)
    pots.refresh( new_state.join('') ) 

    //console.log(`state: ${pots.str()}, gen: ${generation}`)

    //Solving Puzzle 2
    s2(pots.count(), generation)
  }

  return  pots.count()
}

let {initialState, states} = readPuzzleInput('puzzle1.txt')
let cells = states.map(verify)


console.log('plants ->', solve1(initialState, 400, cells))
//console.log('plants ->', solve1(initialState, 101, cells))
//console.log('plants ->', solve1(initialState, 102, cells))




