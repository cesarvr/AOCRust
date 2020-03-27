var assert = require("chai").assert
var DQueue = require("../lib/dqueue")

describe("Testing DQueue Library", function(){
    it("dqueue.insert", function(){
      let dq = new DQueue(0)
       
      dq.insert(1)
      dq.insert(2)
      dq.insert(3)

      assert.deepEqual(dq.all(), [0,1,2,3], 'Should be equals to [0,1,2,3]')
    })

    it("dqueue array constructor", function(){
      let dq = new DQueue([1,2,3])
       
      assert.deepEqual(dq.all(), [1,2,3], 'Should be equals to [0,1,2,3]')
    })


    it("dqueue.rotateLeft", function(){
      let dq = new DQueue(0)
       
      dq.insert(1)
      dq.insert(2)
      dq.insert(3)

      dq.rotateLeft()
      assert.deepEqual(dq.all(), [1,2,3,0], 'Should be equals to [1,2,3,0]')
    })


    it("dqueue.rotateRight", function(){
      let dq = new DQueue(0)
       
      dq.insert(1)
      dq.insert(2)
      dq.insert(3)

      dq.rotateRight()
      assert.deepEqual(dq.all(), [3,0,1,2], 'Should be equals to [3,0,1,2]')
    })

    it.only("rotate forward -> dqueue.rotate(5)", function(){
      let dq = new DQueue([1,2,3,4,5])
      dq.rotate(4)
       
      console.log(dq.all())
      assert.deepEqual(dq.all(), [2,3,0,1], 'Should be equals to [2,3,0,1]')
    })

    it("rotate forward -> dqueue.rotate(2)", function(){
      let dq = new DQueue(0)
       
      dq.insert(1)
      dq.insert(2)
      dq.insert(3)

      dq.rotate(2)
      assert.deepEqual(dq.all(), [2,3,0,1], 'Should be equals to [2,3,0,1]')
    })

    it("rotate backward -> dqueue.rotate(-2)", function(){
      let dq = new DQueue([2,3,0,1])
      dq.rotate(-2)

      assert.deepEqual(dq.all(), [0,1,2,3], 'Should be equals to [0,1,2,3]')
    })

    it("rotate single collection", function(){
      let dq = new DQueue(0)
      dq.rotate(-2)
      dq.rotate(2)
      assert.deepEqual(dq.all(), [0], 'Should be equals to [0]')


      dq = new DQueue([0,1])
      dq.rotate(1)
      assert.deepEqual(dq.all(), [1,0], 'Should be equals to [0]')
      dq.rotate(1)
      assert.deepEqual(dq.all(), [0,1], 'Should be equals to [0]')
      dq.rotate(-1)
      assert.deepEqual(dq.all(), [1,0], 'Should be equals to [0]')
      dq.rotate(-1)
      dq.insert(2)
      dq.rotate(-1)
      let v = dq.pop()
      assert.deepEqual(dq.all(), [1,2], 'Should be equals to [0]')
      assert.equal(v, 0, 'Should be equals to [0]')


    })


    it("dqueue pop()", function(){
      let dq = new DQueue([2,3,0,1])
      dq.rotate(-2)
      let val = dq.pop()
      let val1 = dq.pop()

      assert.equal(val, 3, 'should be equals to 3')
      assert.equal(val1, 2, 'should be equals to 2')
      assert.deepEqual(dq.all(), [0,1], 'Should be equals to [0,1]')
    })


    it("dqueue popLeft()", function(){
      let dq = new DQueue([2,3,0,1])
      dq.rotate(-2)
      let val = dq.popLeft()
      let val1 = dq.popLeft()

      assert.equal(val, 0, 'should be equals to 0')
      assert.equal(val1, 1, 'should be equals to 1')
      assert.deepEqual(dq.all(), [2,3], 'Should be equals to [2,3]')
    })

   it.skip("dqueue length", function(){
      let dq = new DQueue([2,3,0,1])
      dq.rotate(-2)

      assert.equal(dq.length(), 1, 'should be equals to 1')
    })
})
