import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";

class Canvas extends CanvasOption{
  constructor() {
    super();
    
  }
  particles = [];

  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = this.canvasWidth + 'px';
    this.canvas.style.height = this.canvasHeight + 'px'; 
  }

  createRing() {
    const PARTICLE_NUM = 5;
    for(let i = 0; i < PARTICLE_NUM; i++) {
      this.particles.push(new Particle());
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

      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // update time stuffs
      this.particles.forEach(particle => {
        particle.update();
        particle.draw(this.ctx);
      });
      
      then = now - (delta % this.interval)
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

window.addEventListener('click', () => {
  canvas.createRing();
})