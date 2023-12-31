import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";
import Tail from "./js/Tail.js";
import { hypotenuse, randomNumBetween } from "./js/utils.js";
class Canvas extends CanvasOption{
  constructor() {
    super();
    this.tails = [];
    this.particles = [];
  }

  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = this.canvasWidth + 'px';
    this.canvas.style.height = this.canvasHeight + 'px';
    
  }

  createTail() {
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    const vy = randomNumBetween(15,20) * -1;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.tails.push(new Tail(x, vy, color));
  }

  createParticles(x,y,color) {
    const PARTICLE_NUM = 300;
    const randomCircleWidth = randomNumBetween(15, this.canvasWidth / 65);
    for(let i = 0; i < PARTICLE_NUM; i++) {
      // const particleColor = `hsla(${Math.random() * 360}, 100%, 50%, 1)`; rainbow color
      const r = randomNumBetween(2, randomCircleWidth) * hypotenuse(innerWidth, innerHeight) * 0.0005;
      const opacity = randomNumBetween(0.4, 0.9);
      const angle = Math.PI / 180 * randomNumBetween(0, 360);
      const vx = Math.cos(angle) * r;
      const vy = Math.sin(angle) * r;
      this.particles.push(new Particle(x,y,vx,vy,opacity,color));
    }
  }
  
  render() {
    let now, delta
    let then = Date.now()
    
    const frame = () => {  
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;

      if(delta < this.interval) return;
      this.ctx.fillStyle = this.bgColor + '40';
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      if(Math.random() < 0.03) this.createTail();

      this.tails.forEach((tail,index) => {
        tail.update();
        tail.draw();

        if(tail.vy > -0.7){
          this.tails.splice(index, 1);
          this.createParticles(tail.x, tail.y, tail.color);
        } 
      });

      this.particles.forEach((particle,index) => {
        particle.update();
        particle.draw();
        if(particle.opacity <= 0) this.particles.splice(index, 1);
        
      });
      then = now - (delta % this.interval);
    }
    requestAnimationFrame(frame)
  }

}

const canvas = new Canvas();


window.addEventListener('load', () => {
  canvas.init();
  canvas.render();
});

window.addEventListener('resize', () => {
  canvas.init();
});