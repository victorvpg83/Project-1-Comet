class Bullet {
    constructor(ctx, x, y, angle) {
        this.ctx = ctx
        this.posX = x + 20
        this.posY = y + 18
        //this.playerHeight = playerH
        this.velX = 10 //0
        this.velY = 10 //10

        this.angle = angle

        this.image = new Image()
        this.image.src = "./img/spaceBuilding_004.png"

        this.width = 10
        this.height = 10
    }
    draw() {
        console.log(this.posX, this.posY)
        //this.ctx.translate(this.posX + this.width / 2, this.posY + this.height / 2) // cambiamos origen rotación this.gameWidth/2, this.gameHeight/2
        //this.ctx.rotate(Math.PI / 180 * this.angle); // rotate
        //this.ctx.translate(-this.posX - this.width / 2, -this.posY - this.height / 2)
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        //this.ctx.restore();
    }
    move() {
        console.log("el move de las balas")
        console.log(this.angle)
        this.posX += this.velX * Math.sin(this.angle * Math.PI / 180) //this.velX
        this.posY += -this.velY * Math.cos(this.angle * Math.PI / 180) //this.velY
    }

}