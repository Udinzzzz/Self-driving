class Sensor {
  constructor(player) {
    this.player = player;
    this.rayCount = 7;
    this.rayLength = 100;
    this.raySpread = Math.PI / 2;

    this.rays = [];
    this.accept = [];
  }

  update(roadBorders) {
    this.#generateRays();
    this.accept = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.accept.push(this.#getAccept(this.rays[i], roadBorders));
    }
  }

  #getAccept(ray, roadBorders) {
    let touches = [];
    for (let i = 0; i < roadBorders.length; i++) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );
      if (touch) {
        touches.push(touch);
      }
    }
    if (touches.length === 0) {
      return null;
    } else {
      const offsets = touches.map(element => element.offset);
      const minOffsets = Math.min(...offsets);
      return touches.find(element => element.offset === minOffsets);
    }
  }

  #generateRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle = lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
        i / (this.rayCount - 1)
      ) + this.player.angle;
      const start = { x: this.player.x, y: this.player.y };
      const end = {
        x: this.player.x - Math.sin(rayAngle) * this.rayLength,
        y: this.player.y - Math.cos(rayAngle) * this.rayLength,
      };
      this.rays.push([start, end]);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i][1];
      if (this.accept[i]) {
        end = this.accept[i];
      }
      ctx.beginPath();
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;

      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}