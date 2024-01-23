var Particle = /** @class */ (function () {
    function Particle(width, height, screenCanvas, mapImg) {
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
    Particle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
        if (this.y < this.height) {
            this.speed = this.mappedImage[0][this.position1][this.position2];
            movement = (2.5 - this.speed) + this.velocity;
        }
        this.y += movement;
        if (this.y >= this.height) {
            this.y = 0;
            this.x = Math.random() * this.width;
        }
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
    };
    Particle.prototype.getSpeed = function () {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function () {
    function ParticleText(x, y, screenCanvas, mapImg) {
        this.ctx = screenCanvas;
        this.x = x; // + 200;
        this.y = y; // - 100,
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = ((Math.random() * 30) + 1);
        this._2PI = Math.PI * 2;
        this.mappedImage = mapImg;
    }
    ParticleText.prototype.update = function (mouse) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var forceDirectionX = dx / distance;
        var forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;
        var directionX = (forceDirectionX * force * this.density);
        var directionY = (forceDirectionY * force * this.density);
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                var dx_1 = this.x - this.baseX;
                this.x -= dx_1 / 5;
            }
            if (this.y !== this.baseY) {
                var dy_1 = this.y - this.baseY;
                this.y -= dy_1 / 5;
            }
        }
    };
    ParticleText.prototype.draw = function () {
        this.ctx.fillStyle = 'blue';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return ParticleText;
}());
export { ParticleText };
var DynamicRGBEdges = /** @class */ (function () {
    function DynamicRGBEdges(ctx, edgeSize) {
        this.ctx = ctx;
        this.imgWidth = ctx.canvas.width;
        this.imgHeight = ctx.canvas.height;
        this.imgData = ctx.getImageData(0, 0, this.imgWidth, this.imgHeight);
        this.edgeSize = edgeSize;
    }
    DynamicRGBEdges.prototype.applyEffect = function () {
        var data = this.imgData.data;
        for (var y = 0; y < this.imgHeight; y++) {
            for (var x = 0; x < this.imgWidth; x++) {
                var index = (y * this.imgWidth + x) * 4;
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
    };
    return DynamicRGBEdges;
}());
export { DynamicRGBEdges };
var RainbowEdges = /** @class */ (function () {
    function RainbowEdges(ctx, edgeSize, colorChangeInterval) {
        this.ctx = ctx;
        this.imgWidth = ctx.canvas.width;
        this.imgHeight = ctx.canvas.height;
        this.imgData = ctx.getImageData(0, 0, this.imgWidth, this.imgHeight);
        this.edgeSize = edgeSize;
        this.currentColor = 'red';
        this.colorChangeInterval = colorChangeInterval;
        this.lastColorChangeTime = 0;
    }
    RainbowEdges.prototype.applyEffect = function () {
        var currentTime = Date.now();
        var elapsedSinceLastColorChange = currentTime - this.lastColorChangeTime;
        // Cambia dinámicamente el color entre rojo, verde y azul con el intervalo especificado
        if (elapsedSinceLastColorChange > this.colorChangeInterval) {
            this.updateColor();
            this.lastColorChangeTime = currentTime;
        }
        var data = this.imgData.data;
        for (var y = 0; y < this.imgHeight; y++) {
            for (var x = 0; x < this.imgWidth; x++) {
                var index = (y * this.imgWidth + x) * 4;
                // Verifica si el píxel está en el borde
                if (x < this.edgeSize || x >= this.imgWidth - this.edgeSize || y < this.edgeSize || y >= this.imgHeight - this.edgeSize) {
                    // Aplica el color actual al píxel en el borde
                    this.applyCurrentColor(data, index);
                }
            }
        }
        this.ctx.putImageData(this.imgData, 0, 0);
    };
    RainbowEdges.prototype.applyCurrentColor = function (data, index) {
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
    };
    RainbowEdges.prototype.updateColor = function () {
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
    };
    return RainbowEdges;
}());
export { RainbowEdges };
