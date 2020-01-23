let input = require('fs').readFileSync('./input.txt').toString()

function values(mask, input){
	let ret = []
	mask  =  mask.split('')
	input = input.split('')

	for(let i=0; i<mask.length; i++){	
 		if(input[i] !== mask[i])
 			ret.push(input[i])	
 	}

 	return ret 
}

function parse(input){
	let mask = `Step $ must be finished before step $ can begin.`
 	input = input.split('\n')

 	return input.map(line => values(mask, line))
}

function give_me_nodes(raw_nodes){
	let cache = {}

	raw_nodes.forEach(raw_node => {
		let parent = raw_node[0]
		let child  = raw_node[1]

		cache[parent] = cache[parent] || [] 
		cache[parent].push(child)
		cache[parent].sort()
 	})

	return cache
}


let orphans = give_me_nodes(parse(input))

console.log('orphans -> ', orphans)