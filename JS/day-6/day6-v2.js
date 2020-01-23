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
		data.childs = data.childs.sort(compare)
	}

	n.getChilds = () => data.childs.map(child => child.name())
	n.getParents = () => data.parents.map(p => p.name())

	n.childOf = (parent) => data.parents.push( parent )

	n.release = (parent) => {
		data.parents = data.parents.filter( p => p.name() !== parent.name() ).sort(compare)
		return data.parents.length === 0
	}

	n.hasNext = () => data.childs.length !== 0
	n.next    = () => { 
		
		let child_task = data.childs.shift()
		console.log('daddy->', n.name(), 'child len -> ', n.getChilds(), ' child -> ', child_task.name(), ' is free: ', child_task.release(n), ' parents: ', child_task.getParents())

		if(child_task !== undefined && child_task.release(n)) { 
			console.log('executing -> ', child_task.name())
			return child_task
		}
		return undefined
	}

	n.isOrphan = () => data.parents.length === 0

	n.name = () => data.root

	n.val = () => data 

	return n
}