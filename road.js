class Road{
  constructor(x, width, laneCount=3){
    this.x = x 
    this.width = width
    this.laneCount = laneCount
    
    this.left = x-width/2
    this.right = x+width/2 
    
    this.infinity = 10000
    this.top = -this.infinity
    this.bottom = this.infinity
    
    const leftBottom = {x:this.left, y:this.bottom}
    const leftTop = {x:this.left, y:this.top}
    const rightBottom = {x:this.right, y:this.bottom}
    const rightTop = {x:this.right, y:this.top}
    
    this.borders = [
      [leftBottom, leftTop],
      [rightBottom, rightTop]
      ]
  }
  
  getLaneCenter(laneIndex){
    const laneWidth = this.width/this.laneCount
    return this.left +laneWidth/2+Math.min(laneIndex, this.laneCount-1)*laneWidth
  }
  
  draw(ctx){
    ctx.lineWidth = 5
    ctx.strokeStyle = 'white'
    
    for(let i=0; i<=this.laneCount; i++ ){
      const x = lerp(
        this.left,
        this.right,
        i/this.laneCount
        )
        
      ctx.setLineDash([20,20])
      ctx.beginPath()
      ctx.moveTo(x, this.bottom)
      ctx.lineTo(x, this.top)
      ctx.stroke()
      
      ctx.setLineDash([])
      this.borders.forEach(border => {
        ctx.beginPath()
        ctx.moveTo(border[0].x, border[0].y)
        ctx.lineTo(border[1].x, border[1].y)
        ctx.stroke()
      }
      )
    }
  }
}