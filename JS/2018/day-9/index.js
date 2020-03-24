const Marble = function(n) {
	let root = n 

	return {
		left:null,
		right: null
	}
}

const User = (user, score) => {
	let users = {}

	return {
		addScore: (user, score) => {
			users[toString(user)] = users[toString(user)] || 0
			users[toString(user)] = users[toString(user)] + score
		},

		getBestScore: () => {
			return Object.keys(users).reduce((acc, next) => {
				return Math.max(users[next], acc)
			}, -1)
		} 
	}
}


const PlayGround = () => {
	let O = {}
	let current = 0
	let marbles = []

	O.getMarbles = () => marbles 

	O.insert = (num) => {

		/* 
			0 1 2 3 4 5 6 7
			current = 0; node=undefined; 

			1
			0 -> left = 2
			0 -> right = 3

 			[1, 2, 3, 4 , 5]
			current = 1 
			
			2 -> 
			0 -> l = 4
			0 -> r = 5
			
			current = 2
			3 -> 6
			3 -> 7





		*/
		
		let node = marbles[current] 
		let wrapped = new Marble(n)
		if(node === undefined){
			queue.push(wrapped) 
			return 
		}

		if(node.left === null) {
			queue.push(wrapped)
			node.left = wrapped
			return 
		}

		if(node.right === null){
			queue.push(wrapped)
			node.right = wrapped
			current++
			return
		}

	}

	return O

}


const play = (players, last_marble_score) => {

	let current_marble_score = 0 
	let player_scores = {}

	while(current_marble_score !== last_marble_score) {
		let turns = 0

	}
}