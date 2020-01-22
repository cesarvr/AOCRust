let input = require('fs').readFileSync('./test-input.txt').toString()

const Task = function(task){
	let n = {}
	let data = {}

	data.root = task
	data.childs = []
	data.parents = []

	n.addChild = (nchild) => {
		nchild.childOf( n )
		data.childs.push(nchild)
	}

	n.getChilds = () => data.childs.map(child => child.name())

	n.childOf = (parent) => data.parents.push( parent )

	n.release = (parent) => {
		data.parents = data.parents.filter( p => p.name() !== parent.name() )
		//console.log('parentsRemaining => ', data.parents.map(p => p.name()))
		return data.parents.length === 0
	}

	n.execute = () => { 
		let child_task = data.childs.shift()
		
		if(child_task !== undefined && child_task.release(n)) { 
			return child_task
		}

		return undefined
	}

	n.isOrphan = () => data.parents.length === 0

	n.name = () => data.root

	n.val = () => data 

	return n
}

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

function save_tasks(raw_nodes){
	let cached = {}

	raw_nodes.forEach(raw_node => {
		let parent = raw_node[0]
		let child  = raw_node[1]

		//Step C must be finished before step A can begin.
		let parent_task = cached[parent] || new Task(parent)
		let child_task  = cached[child]  || new Task(child)

		parent_task.addChild(child_task)
		cached[parent] = parent_task
		cached[child]  = child_task
 	})

	let orphan_task = Object.keys(cached).map(key => cached[key]).filter(task => task.isOrphan())

	return orphan_task
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

function parse(input){
	let mask = `Step $ must be finished before step $ can begin.`
 	input = input.split('\n')

 	return input.map(line => values(mask, line))
}

function seek(childs, tree){
	return childs.map( child => tree[child] || []).map( child => child.join(''))
}

function walk_through(task){
	if(task === undefined) return ''

	let ret = task.name() 
	let tt  = task.execute()
	
	while(tt !== undefined){
		ret += walk_through(tt)
		tt = task.execute()
	}

	return ret
}

/*
 CABDFE

 nodes -> {
  C: [ 'A', 'F' ],
  A: [ 'B', 'D' ],
  B: [ 'E' ],
  D: [ 'E' ],
  F: [ 'E' ]
 }
*/


//console.log('input ->', parse(input) )	
let orphans = save_tasks(parse(input))
console.log('walking -> \n' )
console.log('orphans => ', orphans.map(n => n.name() ) )

let code = orphans.map(walk_through)	


console.log('code => ', code)