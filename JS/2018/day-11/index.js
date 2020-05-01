function grid(){
  let g = []
  for(let y=0; y<300; y++){
    for(let x=0; x<300; x++){
      g[y] = g[y] || []
      g[y][x] = {x, y}
    }
  }

  return g
}

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

function max_power(acc, next) {
  if(acc.total > next.total)
    return acc
  else
    return next
}


/*  297, 297
 *  297, 298, 299
 *
 */

function scan_3x3(g, _x, _y, serialNumber, level){
  let pack = []

  for(let y=0; y<level; y++){
    for(let x=0; x<level; x++){
      pack.push( calculate_power( g[_y+y][_x+x], serialNumber) ) 
    }
  }

  return {
    pack,
    pos: {
      x: _x, 
      y: _y
    } 
  }
}

/*
 *
 *  Let's use the fact that we end up reusing the squares, a let's reuse previous squares 
 *
 *  1 => x
 *
 *  2 => xx
 *       xx
 *
 *  3 => xxx            4 => xxxx
 *       xxx                 xxxx
 *       xxx                 xxxx 
 *                           xxxx             
 */

/*
 *
 *  (0, 1) (0, 2)
 *  (1, 1) (1, 2)
 *
 *  1x1 Case: 
 *  _x = _y = 0
 *  my = 0
 *  cache = []
 *  start_x = 0
 *  pack = []
 *
 *  for(x)
 *    mx = 0
 *    power_cell = x
 *    cache[0][0] = x
 *    pack.push(x) 
 *
 *  2x2 Case: 
 *  _x = _y = 0
 *  my = 0
 *  cache = [[x]] 
 *  start_x = 1
 *  pack = [x]
 *
 *  for(x -> 1)
 *    mx = 1
 *    power_cell = x_1
 *    cache[0][1] = x_1
 *    pack.push(x_1) 
 *
 * end_x_loop: 
 *    _x = _y = 0
 *    my = 1
 *    cache = [[x], [x_1]] 
 *    start_x = 0
 *    pack = [x]
 *
 *    for(x)

 *
 */

function scanFastNxN(){
  let cache = []

  return function scanNxN(g, _x, _y, serialNumber, level){
    let pack = []

    for(let y=0; y<level; y++){
      let my = _y+y
      cache[my]  = cache[my] || [] 
      let start_x = cache[my].length
      pack.push( cache[my][_x] || [] )

      for(let x=start_x; x<level; x++){
        let mx = _x+x
        let power_cell = calculate_power( g[my][mx], serialNumber)
        cache[my][mx] = power_cell 
        pack.push( power_cell ) 
      }
    }

    return {
      pack: pack.flat(),
      pos: { x: _x,  y: _y } 
    }
  }
}

function scan(g, serialNumber, level){
  const LIMIT = 300 - level 
  let packs = []

  for(let y=0; y<LIMIT; y++){
    for(let x=0; x<LIMIT; x++){
      packs.push( scan_3x3(g, x, y,serialNumber, level) )
    }
  }

  return packs
}

function solve_puzzle_one(g,sn,level){
  let values = scan(g, sn, level) 

  console.log('values->', values.length)
  return values.map(p => {
    p.total = p.pack.reduce((acc, next) => acc + next.power, 0)

    return p
  }).reduce(max_power, {total: 0})
}

let g =  grid()
//console.log(grid()[0][209])

let sol1 = solve_puzzle_one(g, 1723, 3).pos
console.log('solution part 1:',  sol1)
console.log('solution part 1 (test):', sol1.x === 34 && sol1.y === 13 )


let collection = []
for(let i=1; i<2; i++){
  let sol = solve_puzzle_one(g, 18, i)
  collection.push({sol, level: i, total: sol.total})
}

let sol2 = collection.reduce(max_power, {total:0})

console.log('solution part 2:', `${sol2.sol.pos.x},${sol2.sol.pos.y},${sol2.level}`)
console.log('solution part 2:', `position: ${JSON.stringify(sol2.sol.pos)}, Size: ${sol2.level}x${sol2.level}, Total power: ${sol2.total}`)
console.log('sol ->', sol2.sol, collection.length)




