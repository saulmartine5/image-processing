export class Particle {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected speed: number;
  protected velocity: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected position1: number;
  protected position2: number;
  protected mappedImage: any[][][];
  
  constructor(width: number, height: number,
    screenCanvas: CanvasRenderingContext2D,
    mapImg: number[][][]) {
    this.width = width;
    this.height = height;
    this.ctx = screenCanvas;
    this.x = Math.random() * width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 2.5;
    this.size = Math.random() * 1.5 + 1;
    this._2PI = Math.PI * 2;
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    this.mappedImage = mapImg;
  }

  public update() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    let movement = 0;
    if (this.y < this.height) {
      this.speed = this.mappedImage[0][this.position1][this.position2];
      movement = (2.5 - this.speed) + this.velocity;
    }

    this.y += movement;
    
    if (this.y >= this.height) {
      this.y = 0;
      this.x = Math.random() * this.width;
    }
  }

  public draw() {
    this.ctx.beginPath();
    //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.fill();
  }

  public getSpeed(): number {
    return this.speed;
  }
}

export class ParticleText {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected baseX: number;
  protected baseY: number;
  protected density: number;
  protected mappedImage: any[][][];
  
  constructor(x: number, y: number, screenCanvas?: CanvasRenderingContext2D,
    mapImg?: number[][][]) {
    this.ctx = screenCanvas;
    this.x = x;// + 200;
    this.y = y;// - 100,
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = ((Math.random() * 30) + 1);
    this._2PI = Math.PI * 2;
    this.mappedImage = mapImg;
  }

  public update(mouse: any) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    var maxDistance = mouse.radius;
    var force = (maxDistance - distance) / maxDistance;

    let directionX = (forceDirectionX * force * this.density);
    let directionY = (forceDirectionY * force * this.density);
    
    if (distance < mouse.radius) {
      this.x -= directionX ;
      this.y -= directionY ;
    }
    else {
      if (this.x !== this.baseX ) {
          let dx = this.x - this.baseX;
          this.x -= dx/5;
      } if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy/5;
      }
    }
  }

  public draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.closePath();
    this.ctx.fill();
  }

}

export class DynamicRGBNoise {
  protected ctx: CanvasRenderingContext2D;
  protected img: HTMLImageElement;
  protected borderWidth: number;
  protected noiseIntensity: number;

  constructor(ctx: CanvasRenderingContext2D, img: HTMLImageElement, borderWidth: number, noiseIntensity: number) {
    this.ctx = ctx;
    this.img = img;
    this.borderWidth = borderWidth;
    this.noiseIntensity = noiseIntensity;
  }

  public applyEffect() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    const imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const data = imageData.data;

    for (let y = 0; y < this.borderWidth; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const index = (y * imageData.width + x) * 4;

        // Aplica ruido al canal rojo, verde y azul
        data[index] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
        data[index + 1] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
        data[index + 2] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
      }
    }

    for (let y = imageData.height - this.borderWidth; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const index = (y * imageData.width + x) * 4;

        // Aplica ruido al canal rojo, verde y azul
        data[index] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
        data[index + 1] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
        data[index + 2] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
      }
    }

    for (let x = 0; x < this.borderWidth; x++) {
      for (let y = 0; y < imageData.height; y++) {
        const index = (y * imageData.width + x) * 4;

        // Aplica ruido al canal rojo, verde y azul
        data[index] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
        data[index + 1] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
        data[index + 2] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
      }
    }

    for (let x = imageData.width - this.borderWidth; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        const index = (y * imageData.width + x) * 4;

        // Aplica ruido al canal rojo, verde y azul
        data[index] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
        data[index + 1] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
        data[index + 2] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }
}

export class AnimatedRGBBorders {
  protected ctx: CanvasRenderingContext2D;
  protected img: HTMLImageElement;
  protected borderWidth: number;
  protected frameCount: number;
  protected currentFrame: number;
  protected colorIndex: number;

  constructor(ctx: CanvasRenderingContext2D, img: HTMLImageElement, borderWidth: number, frameCount: number) {
    this.ctx = ctx;
    this.img = img;
    this.borderWidth = borderWidth;
    this.frameCount = frameCount;
    this.currentFrame = 0;
    this.colorIndex = 0;
  }

  public applyEffect() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    const imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const data = imageData.data;

    for (let y = 0; y < this.borderWidth; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const index = (y * imageData.width + x) * 4;
        this.applyColor(data, index);
      }
    }

    for (let y = imageData.height - this.borderWidth; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const index = (y * imageData.width + x) * 4;
        this.applyColor(data, index);
      }
    }

    for (let x = 0; x < this.borderWidth; x++) {
      for (let y = 0; y < imageData.height; y++) {
        const index = (y * imageData.width + x) * 4;
        this.applyColor(data, index);
      }
    }

    for (let x = imageData.width - this.borderWidth; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        const index = (y * imageData.width + x) * 4;
        this.applyColor(data, index);
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
    this.updateColor();
    this.updateFrame();
  }

  protected applyColor(data: Uint8ClampedArray, index: number) {
    const color = this.getCurrentColor();
    data[index] = color[0];
    data[index + 1] = color[1];
    data[index + 2] = color[2];
  }

  protected getCurrentColor() {
    switch (this.colorIndex) {
      case 0:
        return [255, 0, 0]; // Red
      case 1:
        return [0, 255, 0]; // Green
      case 2:
        return [0, 0, 255]; // Blue
    }
  }

  protected updateColor() {
    if (this.currentFrame % this.frameCount === 0) {
      this.colorIndex = (this.colorIndex + 1) % 3;
    }
  }

  protected updateFrame() {
    this.currentFrame = (this.currentFrame + 1) % (3 * this.frameCount);
  }
}