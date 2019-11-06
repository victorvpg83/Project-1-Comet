class Player {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.image = new Image()
        this.image.src = "./img/spaceShips_008.png"

        this.width = 50
        this.height = 50
        this.directions = {
            left: false,
            right: false,
            top: false
        }

        this.bullets = []



        this.posX = this.gameWidth / 2 - this.width / 2 //0 - this.width/2
        this.posY = this.gameHeight / 2 - this.height / 2 //0 - this.height/2

        this.velX = 10 //Math.cos(this.angle) //20
        this.velY = 10 //math.sin(this.angle) //20

        this.angle = 0
        //this.velT = velX*Math.cos(this.angle)+velY*Math.sin(this.angle)

        this.keys = keys
        this.setListeners()

    }
    draw() {

        this.ctx.save(); // save current state
        this.ctx.translate(this.posX + this.width / 2, this.posY + this.height / 2) // cambiamos origen rotación this.gameWidth/2, this.gameHeight/2
        this.ctx.rotate(Math.PI / 180 * this.angle); // rotate
        this.ctx.translate(-this.posX - this.width / 2, -this.posY - this.height / 2)
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height); // draws a chain link or dagger
        this.ctx.restore();



        //this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.bullets.forEach(bullet => bullet.draw())
        this.bullets.forEach(bullet => bullet.move(this.angle))


    }

    move() {
        if (this.directions.top) {
            if (this.posX >= this.gameWidth) {
                this.posX = 0
            }
            if (this.posX + 20 <= 0) {
                this.posX = this.gameWidth
            }
            if (this.posY >= this.gameHeight) {
                this.posY = 0
            }
            if (this.posY + 20 <= 0) {
                this.posY = this.gameHeight
            }

            this.posX += this.velX * Math.sin(this.angle * Math.PI / 180)
            this.posY += -(this.velY * Math.cos(this.angle * Math.PI / 180))

        }
        if (this.directions.right) {
            this.angle += 10
        }
        if (this.directions.left) {
            this.angle -= 10
        }

    }
    // rotate() {
    //     this.posX -= 1

    // }
    setListeners() {
        document.onkeydown = e => {
            switch (e.keyCode) {
                case this.keys.TOP_KEY:
                    this.directions.top = true
                    this.move()

                    break
                case this.keys.BOTTOM_KEY:
                    //this.posY += this.velY
                    //console.log("bajando")
                    break
                case this.keys.RIGHT_KEY:
                    this.directions.right = true
                    this.move()
                    console.log("derecha")
                    break
                case this.keys.LEFT_KEY:
                    this.directions.left = true
                    this.move()
                    break
                case this.keys.SPACE:
                    this.shoot()
                    console.log("funciona")
                    break
                case this.keys.A_KEY:

                    break
            }
        }
        document.onkeyup = e => {
            switch (e.keyCode) {
                case this.keys.TOP_KEY:
                    this.directions.top = false


                    break
                case this.keys.BOTTOM_KEY:
                    //this.posY += this.velY
                    //console.log("bajando")
                    break
                case this.keys.RIGHT_KEY:
                    this.directions.right = false

                    break
                case this.keys.LEFT_KEY:
                    this.directions.left = false
                    break


            }
        }
    }
    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.height))
    }

}

