let getInput = (file) => require('fs').readFileSync(file).toString().split(' ').map(n => parseInt(n))

/*
 * {node [1a, 1b:[2ba] ]}
 *

    For this to work to assumptions are made: 

    - We are working with a tree.
 */



const summ = (acc, next) => acc + next

const getRootValue = (myTree) => {
  if(myTree.node.length === 0)
    return myTree.metadata.reduce(summ, 0) 

  let values = myTree.metadata.map(i  => {
    let value = myTree.node[i - 1] || {  value: 0 }
    return value.value
  }).reduce(summ, 0)

  return values
}


/*
 *
 * 2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
 * 1 { node[], metadata[] } 2, 3 
 *   1a { node[],  metadata[10, 11, 12] } 0, 3
 *   1b { node[],  metadata[2] } 1, 1   
 *    2ba { node[], metadata[99] } 0, 1
 * ret 1
 * 1, 1, 2 
 *
 */



const tree = (_tree) => {
    let node = []
    let metadata = []

    let node_len = _tree.shift()
    let metadata_len = _tree.shift()

    for (let i = 0; i < node_len; i++) {
        let new_node = tree(_tree)
        node.push(new_node)
    }

    for (let i = 0; i < metadata_len; i++) {
        let meta = _tree.shift()
        metadata.push(meta)
    }


    /*
      Second Part Solution
      2 3                   -> index 0 -> 33 + index 1 -> 33 + 0
        -> 0 3 [ 10 11 12 ] -> value: 33
        -> 1 1 [ 2 ]       -> value: 0
           - > 0 1 [ 99 ]  -> value: 99
      -> 1 1 2


    */

    let value = getRootValue({node, metadata})

    /*
      --------------------
    */


    let sum = metadata.reduce(summ, 0)
    return {
        node,
        metadata: sum,
        value
    }
}



const metadataCounter = (myTree) => {
  let sum = 0

  if (myTree === undefined)
      return 0

  sum += myTree.metadata
  

  /*  
   *  while provides horizontal movement, recursion provide vertical movement through the tree..
   *
   */

  for (let i = 0; i < myTree.node.length; i++) {
      sum += metadataCounter(myTree.node[i]) //1a, 1b[] 
  }

  return sum
}


let input = getInput('./input.txt')
let t = tree(input)
console.log('tree -> ', t)

let r = metadataCounter(t)
console.log('total metadata -> ', r)
console.log('Puzzle 2: ', t.value)

