/*  3,5
 *  3+10 * 5 +  8 = 73
 *   13  * 73= 949 
 *
 */
function calculate_power(cell, serialNumber){
  cell.power = ((cell.x + 10) * cell.y ) + serialNumber
  cell.power *= (cell.x + 10) 

  if(cell.power < 99)
    cell.power = 0
  else{
    let n = cell.power.toString()
    // 121000
    cell.power = parseInt(n[n.length - 3])
  }

  cell.power -= 5
  return cell
}

function grid({serialNumber}){
  let g = []
  for(let y=0; y<300; y++){
    for(let x=0; x<300; x++){
      g[y] = g[y] || []
      g[y][x] = {x, y, cell: calculate_power({x, y}, serialNumber)}
    }
  }

  return g
}


/*  297, 297
 *  297, 298, 299
 *w
 */

function scan_NxN(g, _x, _y, level){
  let total = 0
  for(let y=0; y<level; y++)
    for(let x=0; x<level; x++)
      total += g[y+_y][x+_x].cell.power 

  return {
    total,
    pos: {
      x: _x, 
      y: _y
    }
  }
}


const scanFast = function(){

  let cache = []


  return {
    total,
    pos: {
      x: _x, 
      y: _y
    }
  }
}


function max_power(acc, next) {
  if(acc.total > next.total)
    return acc
  else
    return next
}

function solve_puzzle_one(g,level){
  const LIMIT = 300 - level 
  let total_power = []

  for(let y=0; y<LIMIT; y++){
    for(let x=0; x<LIMIT; x++){
      total_power.push( scan_NxN(g, x,y, level) )
    }
  }

  return total_power.reduce(max_power, {total:0})
}

let g =  grid({serialNumber: 1723})
//console.log(grid()[0][209])

let sol1 = solve_puzzle_one(g, 3).pos
console.log('solution part 1:',  sol1)
console.log('solution part 1 (test):', sol1.x === 34 && sol1.y === 13 )


let collection = []
//let gtest = grid({serialNumber: 18})

for(let i=1; i<300; i++){
  let sol = solve_puzzle_one(g, i)
  collection.push({sol, level: i, total: sol.total})
}

let sol2 = collection.reduce(max_power, {total:0})

console.log('solution part 2:', `${sol2.sol.pos.x},${sol2.sol.pos.y},${sol2.level}`)
console.log('test solution 2', sol2.sol.pos.x === 280 && sol2.sol.pos.y===218 && sol2.level === 11 )


