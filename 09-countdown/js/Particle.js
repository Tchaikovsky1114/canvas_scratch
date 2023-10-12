import { randomNumBetween } from "./util.js";

export default class Particle {
  constructor() {
    this.rFriction = randomNumBetween(0.95, 1.01); // 반지름 마찰력
    this.rAlpha = randomNumBetween(0, 5); // 반지름 알파값
    this.r = innerHeight / 4; // 반지름

    this.angleFriction = randomNumBetween(0.97, 0.99); // 각도 마찰력
    this.angleAlpha = randomNumBetween(1, 2); // 각도 알파값
    this.angle = randomNumBetween(0, 360); // 각도
    
  }
  update(){
    this.rAlpha *= this.rFriction;
    this.r += this.rAlpha;

    this.angleAlpha *= this.angleFriction;
    this.angle += this.angleAlpha;

    this.x = innerWidth / 2 + this.r * Math.cos(Math.PI / 180 * this.angle );
    this.y = innerHeight / 2 + this.r * Math.sin(Math.PI / 180 * this.angle );
    
    
  }
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
  }
}