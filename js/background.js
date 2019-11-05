class Background {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = w
        this.height = h

        this.image = new Image()
        this.image.src = "img/starry-sky-1654074_1920.jpg"

        this.posX = 0
        this.posY = 0
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

    }
}