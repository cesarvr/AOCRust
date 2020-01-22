let input = require('fs').readFileSync('./test-input.txt').toString()


const Node = function(){
	let n = {}
	let tree = {}

	n.parent = function(p){
		tree.root = p
	} 

	n.childs = function(child) {
		tree.childs = tree.childs || []
		tree.childs.push(child)
		tree.childs.sort()
	}

	n.tree = function() { return tree }

	return n
}

function values(mask, input){
	let ret = []
	mask  = mask.split('')
	input = input.split('')

	for(let i=0; i<mask.length; i++){	
 		if(input[i] !== mask[i])
 			ret.push(input[i])	
 	}

 	return ret 
}

function give_me_nodes(raw_nodes){
	let cache = {}

	raw_nodes.forEach(raw_node => {
		let node = cache[raw_node[0]] || new Node()

		node.parent(raw_node[0])
		node.childs(raw_node[1])

		cache[raw_node[0]] = node
 	})

	return cache
}


function parse(input){
 let mask = `Step $ must be finished before step $ can begin.`
 input = input.split('\n')

 return input.map(line => values(mask, line))
}

let n = give_me_nodes(parse(input))	
console.log('input ->', parse(input) )	
console.log('nodes ->',  Object.keys(n) )	





