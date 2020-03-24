let input = require('fs').readFileSync('input.txt').toString().split('\n')

//let input = [12, 14, 1969, 100756]
//[12,14]

const calculate_fuel = n => parseInt( (n/3) - 2)
const solution2 = (n, fuel_capacity) => {
  let r = calculate_fuel(n)
  if(r<0)
    return fuel_capacity
  fuel_capacity += r
  return solution2(r, fuel_capacity) 
}

let solution_1 = input.map( calculate_fuel ).reduce((acc, next) => acc + next) 
let solution_2 = input.map(n => solution2(n, 0)).reduce((acc, next) => acc + next)   

console.log('solution 1: ', solution_1)
console.log('solution 2: ', solution_2)
