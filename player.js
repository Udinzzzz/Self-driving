class Player{
  constructor(x,y,width,height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    
    this.speed = 0
    this.acceleration = 0.2
    this.maxSpeed = 3
    this.friction = 0.05
    
    this.angle = 0
    
    this.sensor = new Sensor(this)
    this.controls = new Controls()
  }
  
  update(roadBorders){
    this.#move()
    this.sensor.update(roadBorders)
  }
  
  #move(){
    if(this.controls.forward === true){
      this.speed += this.acceleration
    }
    if(this.controls.reverse === true){
      this.speed -= this.acceleration
    }
    
    if(this.speed >= this.maxSpeed){
      this.speed = this.maxSpeed
    }
    if(this.speed <= -this.maxSpeed){
      this.speed = -this.maxSpeed
    }
    
    if(this.speed >= 0){
      this.speed -= this.friction
    }
    
    if(this.speed <= 0){
      this.speed += this.friction
    }
    
    if(this.controls.left === true){
      this.angle += 0.05
    }
    
    if(this.controls.right === true){
      this.angle -= 0.05
    }
    
    this.x -=Math.sin(this.angle)*this.speed
    this.y -=Math.cos(this.angle)*this.speed
    
  }
  
  draw(ctx){
    ctx.save()
    ctx.translate(this.x,this.y)
    ctx.rotate(-this.angle)
    ctx.beginPath()
    ctx.rect(
      -this.width/2,
      -this.height/2,
      this.width,
      this.height
      )
      ctx.fill()
      
      ctx.restore()
      this.sensor.draw(ctx)
  }
}