let recipes = [3,7]

function pick(e, from) {
  e.index = ((e.value + 1 ) + e.index) % (from.length)
  e.value = from[e.index]
  return e
}


let elf_1 = {value: recipes[0], index:0}
let elf_2 = {value: recipes[1], index:1}
let steps = 0
let until = 115846021
//let solutions_2 = ['51589', '01245', '92510', '59414', '846021'] 

//let lookup = '01245'
//let lookup = '59414'
let lookup = `846021`
console.log('solving: ', until)

console.time('solved')
while(true){
  steps ++
  elf_1 = pick(elf_1, recipes)
  elf_2 = pick(elf_2, recipes)

  let total = elf_1.value + elf_2.value

  if(total < 10){
    recipes.push(total)
  } else {
    total = total.toString(10).split('').map(n => parseInt(n))
    total.forEach(n => recipes.push(n) )

    //recipes.push(f)
    //recipes = recipes.flat()
  }


  if(recipes.length > (10 + until)){
    let blk = recipes.join('')

    if(until === 18)
      console.log('recipes: ',blk.slice(until, until + 10) === '9251071085' )

    if(until === 2018)
      console.log('recipes: ',blk.slice(until, until + 10) === '5941429882' )

    console.log('recipes: ',blk.slice(until, until + 10) )
    break

  }



  steps++


}
  let g = recipes.join('').indexOf(lookup)
  console.log(`${lookup} appeared after ${g}`)

console.timeEnd('solved')
