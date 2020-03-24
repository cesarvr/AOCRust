const Marble = function(n) {
	let root = n
	return {
		left:null,
		right: null
	}
}

const Score = () => {
	let users = {}

	return {
		add: (user, score) => {
			let id = ''+user
			users[id] = users[id] || 0
			users[id] = users[id] + score
		},

		getBest: () => {
			return Object.keys(users).reduce((acc, next) => {
				return Math.max(users[next], acc)
			}, -1)
		}
	}
}


const PlayGround = () => {
	let O = {}
	let current = 0
	let circle = []

	O.getMarbles = () => circle

	O.tail = () => circle[current]
	O.next = () => current++

	O.removeTheSeventh = () => {
		let last_marble = circle[current]
		const JUMPS_LIMIT = 7
		let jumps = 0
		let side = ''

		if(last_marble.left !== null){
			side = 'right'
		}

		if(last_marble)


		circle.push(last_marble)
	}

	O.insert = (marble_value) => {

		/*
			0 1 2 3 4 5 6 7
			1 ->

				circle[0] = node<0>
				circle[node<0>]
			2 ->
				circle[0] = node<0>
				circle[0] = node.left<1>
				circle[node<0>.left<node<1>>, node<1> ]
			3 ->
					circle[0] = node<0>
				  circle[0] = node.right<2>
					current++
					circle[node<0>.left<node<1>>.right<node<2>>, node<1>, node<2> ]
			4 ->
					current = 1
					node = circle[node<0>.left<node<1>>.right<node<2>>, node<1>, node<2> ][1]
					node<1>.left<3>
					circle[node<0>.left<node<1>>.right<node<2>>, node<1>.left<node<3>>, node<2>, node<3> ]

			5 ->
					current = 1
					node = circle[node<0>.left<node<1>>.right<node<2>>, node<1>, node<2> ][1]
					node<1>.left<3>
					circle[node<0>.left<node<1>>.right<node<2>>, node<1>.left<node<3>>.right<node<4>>, node<2>, node<3>, node<4> ]

					[0, 1 , 2 ]
		*/

		let node = O.tail()
		let marble = new Marble(marble_value)
		if(node === undefined){
			circle.push(marble)
			return
		}

		if(node.left === null) {
			circle.push(marble)
			node.left = marble
			return
		}

		if(node.right === null){
			circle.push(marble)
			node.right = marble
			O.next()
			return
		}

	}

	return O
}


const play = (players, last_marble_score) => {

	let current_marble_score = 0
	let player_scores = {}
	let turns = 0
	let marble_value = 0
	let playground = new PlayGround()
	let score = new Score()
	playground.insert(marble_value)


	while(current_marble_score !== last_marble_score) {
		turns = (turns === players)?0:turns+1
		marble_value++
		if((marble_value % 23) === 0){
			score.add(turns, marble_value)
		}else
			playground.insert(marble_value)
	}
}
