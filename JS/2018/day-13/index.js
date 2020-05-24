let input = require('fs')
  .readFileSync('./input_big.txt')
  .toString()
  .split(`\n`)
  .filter(n => n !== '')
  .map(n => n.split(''))



/*  
 *  Rotate left Matrix 
 *  
    {x, y} multply  [0, -1]
                    [1,  0]


    Rotate right Matrix
    {x, y} multply  [0,   1]
                    [-1,  0]


*/
const rotate_right = ({x,y}) => Object.assign({x: 0 + y * -1, y:  1 * x + 0  })
const rotate_left  = ({x,y}) => Object.assign({x: 0 + y *  1, y: -1 * x + 0  })
const no_rotation  = ({x,y}) => Object.assign({x,y})

function check_for_corners(tile, pos) {

  if(tile === `/`) {
    // ^ == >
    if(pos.y == 1)
      return rotate_right(pos)

    // > == ^
    if(pos.x == 1)
      return rotate_left(pos)

    // v == <
    if(pos.y == -1)
      return rotate_right(pos)

    // < == v
    if(pos.x == -1)
      return rotate_left(pos)
  }

  if(tile === `\\`)
  {
    // ^ == <
    if(pos.y == 1)
      return rotate_left(pos)

    // > == v
    if(pos.x == 1)
      return rotate_right(pos)

    // v == >
    if(pos.y == -1)
      return rotate_left(pos)

    // < == ^
    if(pos.x == -1)
      return rotate_right(pos)
  }

  return pos
}

function Car(x,y, mp){

  const dir = {
    '<': {x:-1, y:0},  
    '^': {x:0, y:-1}, 
    'v': {x:0, y:1}, 
    '>': {x:1, y:0}
  }

  let o = {}
  let state = 0 
  let current_position = {x,y}
  let tile = mp[current_position.y][current_position.x] 
  let current_accel =  dir[tile]
  let turn_state = 0

  o.turn = function({x,y}) {
    let t = [ 
      rotate_left, 
      no_rotation,
      rotate_right 
    ] 

    let ret = null

    if(turn_state == t.length)
      turn_state = 0

    ret = t[turn_state]({x,y}) 
    turn_state+=1

    return ret
  }

  function check_for_intersections(tile, current_accel) {
    if(tile === '+')
      return o.turn(current_accel)  

    return current_accel
  }

  o.next = () => {
    current_accel = check_for_corners(tile, current_accel)
    current_accel = check_for_intersections(tile, current_accel)

    return {
      x: current_position.x + current_accel.x,
      y: current_position.y + current_accel.y
    }
  }

  o.update = () => {

    //console.log(current_position)
    current_position = o.next()

    tile = mp[current_position.y][current_position.x] 
    return o
  }

  o.position = () => { 
    return current_position 
  }

  o.retire = false

  return o
}

let check_collition = (p1, p2) =>{
  return p1.x === p2.x && p1.y === p2.y
}

let find = function(mp){
  let car = ['<','^', 'v','>']
  let cars = []

  for(let y=0; y<mp.length; y++){
    let rows = mp[y]
    for(let x=0; x<rows.length; x++){
      let tile = mp[y][x] 
      if(car.indexOf(tile) !== -1 )
        cars.push(new Car(x,y, mp))
    }  
  }
  return cars
}

//console.log(input)
let cars = find(input)
let steps = 0

console.log('cars:', cars.length)
while(true){
  steps++

  //  if(steps > 16)
  //  process.exit(0)

  if(cars.length === 1){
    console.log('And the last car is', cars[0].position())
    process.exit(0)
  }

  //  cars.forEach(c => console.log('step: ',steps, 'x:',c.position().x, 'y:', c.position().y, ' size: ', cars.length) )
  cars = cars.map(car => { 
    let c1 = car.update() 
    let collition = cars.filter(c2 => check_collition(c1.position(),c2.position())) 
    if(collition.length > 1){
      collition.forEach(c => console.log('collition: ', c.position()))
      collition.map(c => { c.retire = true; return c })

    }

    return c1
  })

  cars = cars.filter(car => car.retire === false)
}





