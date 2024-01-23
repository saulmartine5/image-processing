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

export class DynamicRGBEdges {
  protected ctx: CanvasRenderingContext2D;
  protected imgData: ImageData;
  protected imgWidth: number;
  protected imgHeight: number;
  protected edgeSize: number;

  constructor(ctx: CanvasRenderingContext2D, edgeSize: number) {
    this.ctx = ctx;
    this.imgWidth = ctx.canvas.width;
    this.imgHeight = ctx.canvas.height;
    this.imgData = ctx.getImageData(0, 0, this.imgWidth, this.imgHeight);
    this.edgeSize = edgeSize;
  }

  public applyEffect() {
    const data = this.imgData.data;

    for (let y = 0; y < this.imgHeight; y++) {
      for (let x = 0; x < this.imgWidth; x++) {
        const index = (y * this.imgWidth + x) * 4;

        // Verifica si el píxel está en el borde
        if (x < this.edgeSize || x >= this.imgWidth - this.edgeSize || y < this.edgeSize || y >= this.imgHeight - this.edgeSize) {
          // Aplica un cambio dinámico en los componentes RGB
          data[index] = data[index] + Math.random() * 50 - 25; // Red
          data[index + 1] = data[index + 1] + Math.random() * 50 - 25; // Green
          data[index + 2] = data[index + 2] + Math.random() * 50 - 25; // Blue
        }
      }
    }

    this.ctx.putImageData(this.imgData, 0, 0);
  }
}

export class RainbowEdges {
  protected ctx: CanvasRenderingContext2D;
  protected imgData: ImageData;
  protected imgWidth: number;
  protected imgHeight: number;
  protected edgeSize: number;
  protected currentColor: string;
  protected colorChangeInterval: number;
  protected lastColorChangeTime: number;

  constructor(ctx: CanvasRenderingContext2D, edgeSize: number, colorChangeInterval: number) {
    this.ctx = ctx;
    this.imgWidth = ctx.canvas.width;
    this.imgHeight = ctx.canvas.height;
    this.imgData = ctx.getImageData(0, 0, this.imgWidth, this.imgHeight);
    this.edgeSize = edgeSize;
    this.currentColor = 'red';
    this.colorChangeInterval = colorChangeInterval;
    this.lastColorChangeTime = 0;
  }

  public applyEffect() {
    const currentTime = Date.now();
    const elapsedSinceLastColorChange = currentTime - this.lastColorChangeTime;

    // Cambia dinámicamente el color entre rojo, verde y azul con el intervalo especificado
    if (elapsedSinceLastColorChange > this.colorChangeInterval) {
      this.updateColor();
      this.lastColorChangeTime = currentTime;
    }

    const data = this.imgData.data;

    for (let y = 0; y < this.imgHeight; y++) {
      for (let x = 0; x < this.imgWidth; x++) {
        const index = (y * this.imgWidth + x) * 4;

        // Verifica si el píxel está en el borde
        if (x < this.edgeSize || x >= this.imgWidth - this.edgeSize || y < this.edgeSize || y >= this.imgHeight - this.edgeSize) {
          // Aplica el color actual al píxel en el borde
          this.applyCurrentColor(data, index);
        }
      }
    }

    this.ctx.putImageData(this.imgData, 0, 0);
  }

  protected applyCurrentColor(data: Uint8ClampedArray, index: number) {
    switch (this.currentColor) {
      case 'red':
        data[index] = 255; // Red
        data[index + 1] = 0; // Green
        data[index + 2] = 0; // Blue
        break;
      case 'green':
        data[index] = 0; // Red
        data[index + 1] = 255; // Green
        data[index + 2] = 0; // Blue
        break;
      case 'blue':
        data[index] = 0; // Red
        data[index + 1] = 0; // Green
        data[index + 2] = 255; // Blue
        break;
    }
  }

  protected updateColor() {
    // Cambia dinámicamente entre rojo, verde y azul
    switch (this.currentColor) {
      case 'red':
        this.currentColor = 'green';
        break;
      case 'green':
        this.currentColor = 'blue';
        break;
      case 'blue':
        this.currentColor = 'red';
        break;
    }
  }
}