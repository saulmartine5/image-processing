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


export class Snowflake {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected fallSpeed: number;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.fallSpeed = Math.random() * 2 + 1; // Velocidad de caída aleatoria
  }

  public update() {
    this.y += this.fallSpeed;

    // Reinicia la posición si la escarcha de nieve cae fuera del lienzo
    if (this.y > this.ctx.canvas.height) {
      this.y = 0;
    }
  }

  public draw() {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// arcoiris 


export class AnimatedRainbow {
  private x: number;
  private y: number;
  private radius: number;
  private ctx: CanvasRenderingContext2D;
  private hue: number;

  constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.hue = 0;
  }

  public draw() {
    const gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, `hsl(${this.hue}, 100%, 50%)`);
    gradient.addColorStop(1 / 6, `hsl(${this.hue + 60}, 100%, 50%)`);
    gradient.addColorStop(2 / 6, `hsl(${this.hue + 120}, 100%, 50%)`);
    gradient.addColorStop(3 / 6, `hsl(${this.hue + 180}, 100%, 50%)`);
    gradient.addColorStop(4 / 6, `hsl(${this.hue + 240}, 100%, 50%)`);
    gradient.addColorStop(5 / 6, `hsl(${this.hue + 300}, 100%, 50%)`);
    gradient.addColorStop(1, `hsl(${this.hue + 360}, 100%, 50%)`);

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();

    // Incrementa el tono (hue) para cambiar los colores en cada fotograma
    this.hue = (this.hue + 0.5) % 360;
  }
}

export class InfiniteTrianglesEffect {
  protected ctx: CanvasRenderingContext2D;
  protected width: number;
  protected height: number;
  protected triangles: Triangle[];

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.triangles = [];

    // Crea algunos triángulos iniciales
    for (let i = 0; i < 10; i++) {
      this.createRandomTriangle();
    }
  }

  protected createRandomTriangle() {
    const triangle = new Triangle(
      Math.random() * this.width,
      Math.random() * this.height,
      Math.random() * 30 + 10,
      getRandomColor(),
      this.ctx
    );

    this.triangles.push(triangle);
  }

  public update() {
    // Actualiza la posición de los triángulos
    for (const triangle of this.triangles) {
      triangle.update();
    }

    // Elimina triángulos que salen del lienzo y crea nuevos para reemplazarlos
    this.triangles = this.triangles.filter(triangle => !triangle.isOutsideCanvas());
    while (this.triangles.length < 10) {
      this.createRandomTriangle();
    }
  }

  public draw() {
    // Dibuja los triángulos
    for (const triangle of this.triangles) {
      triangle.draw();
    }
  }
}

export class Triangle {
  protected x: number;
  protected y: number;
  protected size: number;
  protected color: string;
  protected ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, size: number, color: string, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.ctx = ctx;
  }

  public update() {
    // Mueve el triángulo hacia abajo
    this.y += 1;

    // Reinicia la posición si sale del lienzo
    if (this.y > this.ctx.canvas.height) {
      this.y = 0;
      this.x = Math.random() * this.ctx.canvas.width;
      this.size = Math.random() * 30 + 10;
      this.color = getRandomColor();
    }
  }

  public draw() {
    // Dibuja el triángulo
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.size, this.y);
    this.ctx.lineTo(this.x + this.size / 2, this.y + this.size);
    this.ctx.closePath();
    this.ctx.fill();
  }

  public isOutsideCanvas() {

    return this.y > this.ctx.canvas.height + this.size;
  }
}

function getRandomColor() {
 
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


export class LightTrailsEffect {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected ctx: CanvasRenderingContext2D;
  protected speed: number;
  protected color: string;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, speed: number, color: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.speed = speed;
    this.color = color;
  }

  public update() {
    this.x += this.speed;

    if (this.x > this.width) {
      this.x = 0;
    }
  }

  public draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, 5, this.height); // Ajusta el tamaño de la tira de luz
  }
}


export class ColorTrails {
  protected ctx: CanvasRenderingContext2D;
  protected imageWidth: number;
  protected imageHeight: number;
  protected stripWidth: number;
  protected colors: string[];
  protected strips: number[];

  constructor(ctx: CanvasRenderingContext2D, imageWidth: number, imageHeight: number, stripWidth: number, colors: string[]) {
    this.ctx = ctx;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.stripWidth = stripWidth;
    this.colors = colors;
    this.strips = [];
    for (let i = 0; i < Math.ceil(imageWidth / stripWidth); i++) {
      this.strips.push(0);
    }
  }

  public update() {
    this.strips = this.strips.map((strip) => (strip + 2) % this.imageHeight); // Incrementé el valor para dejar un rastro más visible
  }

  public draw(image: HTMLImageElement) {
    for (let i = 0; i < this.strips.length; i++) {
      const x = i * this.stripWidth;
      const y = this.strips[i];
      const color = this.colors[i % this.colors.length];

      // Dibuja la línea vertical de luz
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + this.stripWidth);
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = this.stripWidth;
      this.ctx.stroke();
    }

    // Dibuja la imagen original en el fondo
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.drawImage(image, 0, 0, this.imageWidth, this.imageHeight);

    // Dibuja las tiras de luz con blending para dejar un rastro
    this.ctx.globalCompositeOperation = 'lighter';
    this.ctx.globalAlpha = 0.2; // Ajusta la opacidad según sea necesario

    for (let i = 0; i < this.strips.length; i++) {
      const x = i * this.stripWidth;
      const y = this.strips[i];
      const color = this.colors[i % this.colors.length];

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + this.stripWidth);
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = this.stripWidth;
      this.ctx.stroke();
    }

    // Restaura los ajustes globales
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.globalAlpha = 1.0;
  }
}