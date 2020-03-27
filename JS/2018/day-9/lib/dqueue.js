const Node = function(n){
  let ret = { 
    value: n,
    next: undefined, 
    back: undefined
  }

  return ret
}

class DQueue {
  constructor(n){
    this.count = 0
    this.store(n) 
  }

  store(n){
    if(Array.isArray(n)){
      n.forEach(o => this.insert(o))
    }else{
      this.insert(n)
    }
  }

  set length(n) {
    if(n < 0)
      this.count = 0
    else{
      this.count = n
    }
  }

  get length() {
    return this.count
  }

  /*
    1 -> 2
    1 <- 2 
    3: tail = Node<3>.back<Node<2>.back<Node<1>>> 
    4: Node<4> <-> Node<3>
    */
  insert(n){
    let node = new Node(n)
    this.count ++

    if(this.head === undefined){
      this.head = Node(n)
      this.tail = this.head
      return
    }

    node.back = this.tail
    this.tail.next = node
    this.tail = node
  }

  rotate(n) {
    if(n > 0) {
      for (let i=0; i<n; i++){
        this.rotateRight()
      }
    }else {
      n = Math.abs(n)
      for (let i=0; i < n; i++){
        this.rotateLeft()
      }
    }

  }


  /*
    [1 -> 2 -> 3 -> 4]
    [4 -> 1 -> 2 -> 3 ]
    
    tail = 4 <- 3 -> null
    1 <- 4  -> 2
    3 <- 2  -> null 
    this.tail = 3
    this.head = 4
  
    */

  rotateRight() {
    let tail  = this.tail 
    let head  = this.head

    // 4 <- 1
    head.back = tail
    tail.next = head
    
     // 4 new head
    // 4 -> 1 -> 2 -> 3
    this.head = tail

    // 3 new tail 
    // 3 -> null
    this.tail = this.tail.back
    this.tail.next = undefined 

    // null <- 4
    this.head.back = undefined
  } 


  /*
    Node<1>.next<Node<2>>.back<Null>
    Node<4>.next<null>.back<Node<3>>

    [1 -> 2 -> 3 -> 4]
    [2 -> 3 -> 4 -> 1]

    head: 1
    tail: 4 

    this.head = Node<2>.back<null>.next<Node<3>>
    this.tail = Node<1>.back<Node<4>>.next<undefined> 
    */

  rotateLeft() {
    
    if(this.count < 2)
      return 
      
    let tail = this.tail 
    let head  = this.head 

    this.head = head.next
    this.head.back = undefined
    head.back = this.tail 
    this.tail.next = head
    this.tail = head
    this.tail.next = undefined
  } 

  pop(){
    let value = this.tail.value
    this.length--
    this.tail = this.tail.back

    if (this.tail !== undefined)
      this.tail.next = undefined
    else 
      this.tail = this.head

    return value
  }

  popLeft(){
    if(this.count < 2)
      return

    let value = this.head.value
    this.head = this.head.next
    this.head.back = undefined
    this.length--
    return value
  }

  all(){
    let current = this.head
    let node = current
    let ret = [] 
    while(node !== undefined){
      ret.push(node.value)
      node = current.next
      current = current.next
    }

    return ret
  }
}

module.exports = DQueue
