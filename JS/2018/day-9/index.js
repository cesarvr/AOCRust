let DQueue = require('./lib/dqueue')

function play_game(max_players, last_marble){
  let scores = {}
  let circle = new DQueue(0) 
  
  for(let marble=1;marble<last_marble +1; marble++){
    if( marble % 23 === 0){
      circle.rotate(7)
      let v = circle.pop()
      scores[marble%max_players] = scores[marble%max_players] || 0
      scores[marble%max_players] += marble + v 
      circle.rotate(-1)
    }else{
      circle.rotate(-1)
      circle.insert(marble)
    }
  }

  return Object.keys(scores).reduce((acc,key)=> {
    return Math.max(acc, scores[key])
  },0)
}

/*
console.log('scores ->', play_game(9,25))
console.log('scores ->', play_game(10,1618))
console.log('scores ->', play_game(13,7999))
console.log('scores ->', play_game(17,1104))
console.log('scores ->', play_game(21,6111))
console.log('scores ->',  play_game(30,5807))
*/

console.log('scores ->', play_game(458,72019))
console.log('scores 2nd ->', play_game(458,(72019 * 100)))
