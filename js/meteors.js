class Meteor {
    constructor(ctx, x, y, velX, velY) {
        this.ctx = ctx
        this.posX = x + Math.floor(Math.random() * 50)
        this.posY = y + Math.floor(Math.random() * 50)

        this.velX = velX
        this.velY = velY

        this.width = 80
        this.height = 80

        this.image = new Image()
        this.image.src = "./img/spin-26.png"

    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
    move() {
        this.posX += this.velX
        this.posY += this.velY

    }
}