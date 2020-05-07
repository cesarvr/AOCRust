(async function(){

  function renderMesh(draw, data){

    data.forEach(d => {
      draw.point(d.position[0], d.position[1])
    })
  }

  const SIZE = 8

  function Draw(canvas) {
    var ctx = canvas.getContext("2d")

    let o = {}

    o.grid = (width,height) => {
      
      for(let y = 0; y<height; y++ ){
        for(let x=0; x<width; x++) {
          o.point(width,height,width,height,'black')
        }  
      }

    }
 
    o.point = (x,y,w,h, c)=>{
      ctx.beginPath()
      ctx.fillStyle = c || "#FF9999"
      //ctx.rect(x, y, x+SIZE, y+SIZE)
      ctx.fillRect(x,y,w|| SIZE, h||SIZE)
      ctx.stroke()
    }

    o.clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height)
    return o
  }


  var canvas = document.getElementById("myCanvas")
  let draw = new Draw(canvas)

  const magnitude = (p) => Math.sqrt( p[0]*p[0] + p[1]*p[1] )
  const scale     = (v, p) => [p[0]*v, p[1]*v]
  const getMax    = (acc, {position}) => {
    return { x: Math.max(acc.x, position[0]), y: Math.max(acc.y, position[1]) }
  }



  const normalize = ({position, velocity}) => {
    let u = magnitude(position)
    return { position: [  position[0] / u, position[1] / u ], velocity }
  } 

  let normalized = pixel.map(normalize)
  let maxVec = pixel.reduce(getMax, {x:0, y:0})
  debugger
  console.log('->', normalized)

   
  pixel.forEach(p => {
  
     let w = canvas.width / maxVec.x
     let h = canvas.height / maxVec.y 

     draw.grid(w,h)
     debugger

   //  p.position = scale(SIZE, p.position)
    // p.position = [ p.position[0] + w , p.position[1]  + h]
   })


  setInterval( () =>{
    draw.clear()
    renderMesh(draw, pixel)
     pixel.map(p => {
      p.position[0] += p.velocity[0]
      p.position[1] += p.velocity[1]
      return p
    }) 
  } ,350)

}())
