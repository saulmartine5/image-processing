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
var DynamicRGBNoise = /** @class */ (function () {
    function DynamicRGBNoise(ctx, img, borderWidth, noiseIntensity) {
        this.ctx = ctx;
        this.img = img;
        this.borderWidth = borderWidth;
        this.noiseIntensity = noiseIntensity;
    }
    DynamicRGBNoise.prototype.applyEffect = function () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        var imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        var data = imageData.data;
        for (var y = 0; y < this.borderWidth; y++) {
            for (var x = 0; x < imageData.width; x++) {
                var index = (y * imageData.width + x) * 4;
                // Aplica ruido al canal rojo, verde y azul
                data[index] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
                data[index + 1] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
                data[index + 2] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
            }
        }
        for (var y = imageData.height - this.borderWidth; y < imageData.height; y++) {
            for (var x = 0; x < imageData.width; x++) {
                var index = (y * imageData.width + x) * 4;
                // Aplica ruido al canal rojo, verde y azul
                data[index] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
                data[index + 1] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
                data[index + 2] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
            }
        }
        for (var x = 0; x < this.borderWidth; x++) {
            for (var y = 0; y < imageData.height; y++) {
                var index = (y * imageData.width + x) * 4;
                // Aplica ruido al canal rojo, verde y azul
                data[index] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
                data[index + 1] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
                data[index + 2] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
            }
        }
        for (var x = imageData.width - this.borderWidth; x < imageData.width; x++) {
            for (var y = 0; y < imageData.height; y++) {
                var index = (y * imageData.width + x) * 4;
                // Aplica ruido al canal rojo, verde y azul
                data[index] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
                data[index + 1] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
                data[index + 2] += Math.random() * this.noiseIntensity - this.noiseIntensity / 2;
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
    };
    return DynamicRGBNoise;
}());
export { DynamicRGBNoise };
var AnimatedRGBBorders = /** @class */ (function () {
    function AnimatedRGBBorders(ctx, img, borderWidth, frameCount) {
        this.ctx = ctx;
        this.img = img;
        this.borderWidth = borderWidth;
        this.frameCount = frameCount;
        this.currentFrame = 0;
        this.colorIndex = 0;
    }
    AnimatedRGBBorders.prototype.applyEffect = function () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        var imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        var data = imageData.data;
        for (var y = 0; y < this.borderWidth; y++) {
            for (var x = 0; x < imageData.width; x++) {
                var index = (y * imageData.width + x) * 4;
                this.applyColor(data, index);
            }
        }
        for (var y = imageData.height - this.borderWidth; y < imageData.height; y++) {
            for (var x = 0; x < imageData.width; x++) {
                var index = (y * imageData.width + x) * 4;
                this.applyColor(data, index);
            }
        }
        for (var x = 0; x < this.borderWidth; x++) {
            for (var y = 0; y < imageData.height; y++) {
                var index = (y * imageData.width + x) * 4;
                this.applyColor(data, index);
            }
        }
        for (var x = imageData.width - this.borderWidth; x < imageData.width; x++) {
            for (var y = 0; y < imageData.height; y++) {
                var index = (y * imageData.width + x) * 4;
                this.applyColor(data, index);
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
        this.updateColor();
        this.updateFrame();
    };
    AnimatedRGBBorders.prototype.applyColor = function (data, index) {
        var color = this.getCurrentColor();
        data[index] = color[0];
        data[index + 1] = color[1];
        data[index + 2] = color[2];
    };
    AnimatedRGBBorders.prototype.getCurrentColor = function () {
        switch (this.colorIndex) {
            case 0:
                return [255, 0, 0]; // Red
            case 1:
                return [0, 255, 0]; // Green
            case 2:
                return [0, 0, 255]; // Blue
        }
    };
    AnimatedRGBBorders.prototype.updateColor = function () {
        if (this.currentFrame % this.frameCount === 0) {
            this.colorIndex = (this.colorIndex + 1) % 3;
        }
    };
    AnimatedRGBBorders.prototype.updateFrame = function () {
        this.currentFrame = (this.currentFrame + 1) % (3 * this.frameCount);
    };
    return AnimatedRGBBorders;
}());
export { AnimatedRGBBorders };
var Snowflake = /** @class */ (function () {
    function Snowflake(x, y, size, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.fallSpeed = Math.random() * 2 + 1; // Velocidad de caída aleatoria
    }
    Snowflake.prototype.update = function () {
        this.y += this.fallSpeed;
        // Reinicia la posición si la escarcha de nieve cae fuera del lienzo
        if (this.y > this.ctx.canvas.height) {
            this.y = 0;
        }
    };
    Snowflake.prototype.draw = function () {
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    };
    return Snowflake;
}());
export { Snowflake };
// arcoiris 
var AnimatedRainbow = /** @class */ (function () {
    function AnimatedRainbow(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.hue = 0;
    }
    AnimatedRainbow.prototype.draw = function () {
        var gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, "hsl(".concat(this.hue, ", 100%, 50%)"));
        gradient.addColorStop(1 / 6, "hsl(".concat(this.hue + 60, ", 100%, 50%)"));
        gradient.addColorStop(2 / 6, "hsl(".concat(this.hue + 120, ", 100%, 50%)"));
        gradient.addColorStop(3 / 6, "hsl(".concat(this.hue + 180, ", 100%, 50%)"));
        gradient.addColorStop(4 / 6, "hsl(".concat(this.hue + 240, ", 100%, 50%)"));
        gradient.addColorStop(5 / 6, "hsl(".concat(this.hue + 300, ", 100%, 50%)"));
        gradient.addColorStop(1, "hsl(".concat(this.hue + 360, ", 100%, 50%)"));
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        // Incrementa el tono (hue) para cambiar los colores en cada fotograma
        this.hue = (this.hue + 0.5) % 360;
    };
    return AnimatedRainbow;
}());
export { AnimatedRainbow };
