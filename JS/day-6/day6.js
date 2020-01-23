let input = require('fs').readFileSync('./test-input.txt').toString()


function compare(a, b) {
  if (a.name().toLowerCase() < b.name().toLowerCase()) {
    return -1;
  }
  if (a.name().toLowerCase() > b.name().toLowerCase()) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

const Task = function(task){
	let oo = {}
	let data = {}

	data.root = task
	data.childs = []
	data.parents = []

	oo.addChild = (nchild) => {
		nchild.childOf( oo )
		data.childs.push(nchild)
		data.childs = data.childs
	}

	oo.getChilds  = () => data.childs.map(child => child.name())
	oo.getParents = () => data.parents.map(p => p.name())

	oo.childOf = (parent) => data.parents.push( parent )

	oo.release = (parent) => {
		data.parents = data.parents.filter( p => p.name() !== parent.name() )
		return data.parents.length === 0
	}

	oo.hasNext = () => data.childs.length !== 0
	
	oo.next    = () => { 
		data.childs = data.childs.filter(child => child.release(oo))
		return data.childs
	}

	oo.isOrphan = () => data.parents.length === 0

	oo.name = () => data.root

	oo.val = () => data 

	return oo
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

const Worker = function(_task) {
	let task = _task 
	let cost_task = (t) => ( t.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) ) + 1
	let cost = cost_task(task.name()) 
	let cycles = 0
	let oo = {}

	oo.Run = () => {
		console.log('name: ', task.name(), ' cost => ', cost )
		cost--
		return oo 
	}

	oo.Done = () => {
		cycles++
		return cost === 0
	}

	oo.name = () => 'task:' + task.name()
	oo.task_name = () =>  task.name()
	oo.taskResult = () => task.next().flat()

	return oo
}

const Workers = function() {
	const WORKER_LIMIT = 4
	let oo = {}
	let cycle = 0
	let available_workers = []
	let workers_that_have_done = []

	oo.isIdle = () => {
		return available_workers.length < WORKER_LIMIT
	} 

	oo.busy = () => available_workers.length > 0

	oo.addTask = (task) => {
		console.log('ADDING TASK -> ', task.name())
		available_workers.push( new Worker(task) )
	}

	oo.done = () => { 
		let ret = workers_that_have_done
		workers_that_have_done = []
		return ret 
	}

	oo.run = () => {
	
		available_workers = available_workers.map(worker => worker.Run() )
		workers_that_have_done = available_workers.filter( worker => worker.Done() )
		available_workers = available_workers.filter( worker => !worker.Done() )
		console.log('cycle ->', cycle)
		console.log('workers still running ->', available_workers.map(w => w.name()),  ' workers that has finished -> ',workers_that_have_done.map(w => w.name())  )
		cycle++
	}

	oo.getCycles = () => cycle


	return oo
}

function walk_through(tasks){
	let available_tasks = tasks.sort(compare)
	let ret = []
	while(available_tasks.length > 0){
		let current_task = available_tasks.shift() 
		let new_tasks = current_task.next()
	
		available_tasks.push( new_tasks )
		available_tasks = available_tasks.flat().filter( task => task !== undefined ).sort(compare)

		ret.push( current_task.name() )
	}

	return ret
}

function walk_through_with_workers(tasks){
	let available_tasks = tasks.sort(compare)
	let ret = []
	let workers = new Workers()

	while(workers.busy() || available_tasks.length > 0){
		
		while(workers.isIdle() && available_tasks.length !== 0) {
			let t = available_tasks.shift()
			workers.addTask( t )
		}

		workers.run()

		console.log('workers busy: ', workers.busy())

		let finished  = workers.done()

		ret += finished.map(wrk => wrk.task_name())
		
		if(finished !== undefined && finished.length > 0) {
			let results = finished.map( wrk => wrk.taskResult() ).flat()
					
			available_tasks.push( results ) 
			available_tasks = available_tasks.flat().filter( task => task !== undefined ).sort(compare)
		}
	}

	console.log('r-> ', ret, ' cycles->', workers.getCycles())
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
/*
let code = walk_through( save_tasks(parse(input)) ) 

console.log('code => ',code, ' answer -> ', code.join(''),  ' is the test working: ',code[0] === 'CABDFE')

console.log('its equals to CKMGUWXFAYNIHLJSDQTREOPZBV', code.join('') === 'CKMGUWXFAYNIHLJSDQTREOPZBV')
console.log('its equals to GXFAIHCKMYUNLJSWDQTREOPZBV', code.join('') === 'GXFAIHCKMYUNLJSWDQTREOPZBV')
console.log('its equals to CKMGUWXFAIHSYDNLJQTREOPZBV', code.join('') === 'CKMGUWXFAIHSYDNLJQTREOPZBV')

*/
walk_through_with_workers( save_tasks(parse(input)) ) 
//console.log(' answer -> ', code1.join(''),  ' is the test working: ',code1.join('') === 'CGKMUWXFAIHSYDNLJQTREOPZBV')

