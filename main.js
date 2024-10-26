const canvas = document.getElementById("canvas")

canvas.width = 200
canvas.height = window.innerHeight/1.3


const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9)
const player = new Player(road.getLaneCenter(1),100,30,50)

animate()

function animate(){
  // ctx.beginPath()
  player.update(road.borders)
  canvas.height = window.innerHeight/1.3
  ctx.save()
  ctx.translate(0, -player.y+canvas.height*0.7)
  road.draw(ctx)
  player.draw(ctx)
  ctx.restore()
  requestAnimationFrame(animate)
}