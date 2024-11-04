const canvas = document.getElementById("canvas")

canvas.width = 200
canvas.height = window.innerHeight


const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9)
const N = 50
const cars = generateCars(N)
let bestCar = cars[0]

if(localStorage.getItem("bestBrain")){
  for(let i=0; i<cars.length; i++){
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"))
    if(i!==0){
      NeuralNetwork.mutate(cars[i].brain, 0.2)
    }
  }
}

function save(){
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain))
}

function discard(){
  localStorage.removeItem("bestBrain")
}

const trafic = [
  new Car(road.getLaneCenter(1),-100,30,50, "DUMMY", 1.5),
  new Car(road.getLaneCenter(0),-200,30,50, "DUMMY", 2),
  new Car(road.getLaneCenter(1),-300,30,50, "DUMMY", 1.5),
  new Car(road.getLaneCenter(2),-450,30,50, "DUMMY", 2),
  ]
  
  function generateCars(N){
    const cars = []
    for(let i=0; i<N; i++){
      cars.push(new Car(road.getLaneCenter(1),100,30,50, "AI"))
    }
    return cars
  }
  

animate()

function animate(){
  for(let i=0; i<trafic.length; i++){
    trafic[i].update(road.borders, [])
  }
  for(let i=0; i<cars.length; i++){
    cars[i].update(road.borders, trafic)
  }
  canvas.height = window.innerHeight
  
  const bestCar = cars.find(
    c=>c.y===Math.min(...cars.map(c=>c.y))
    )
  
  ctx.save()
  ctx.translate(0, -bestCar.y+canvas.height*0.7)
  road.draw(ctx)
  for(let i=0; i<trafic.length; i++){
    trafic[i].draw(ctx, "red")
  }
  
  ctx.globalAlpha = 0.2
  for(let i=0; i<cars.length; i++){
    cars[i].draw(ctx, "blue")
  }
  ctx.globalAlpha = 1
  bestCar.draw(ctx, "blue", true)
  ctx.restore()
  requestAnimationFrame(animate)
}