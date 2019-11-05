class Asteroid {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.posX = x + Math.floor(Math.random() * 50)
        this.PosY = y + Math.floor(Math.random() * 50)

        this.velX = Math.floor(Math.random() * 10)
        this.velY = Math.floor(Math.random() * 10)

        this.width = 120
        this.height = 120

        this.image = new Image()
        this.image.src = "./img/spaceMeteors_004.png"

    }
    draw() {
        this.ctx.drawImage(this.image,this.posX,this.PosY,this.width,this.height)
    }
    move() {
        this.posX += this.velX
        this.PosY += this.velY

    }
}