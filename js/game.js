const game = {
    myCanvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    asteroids: [],
    framesCounter: 0,
    score: 0,
    keys: {
        TOP_KEY: 38,
        BOTTOM_KEY: 40,
        RIGHT_KEY: 39,
        LEFT_KEY: 37,
        SPACE: 32,
        A_KEY: 65
    },

    init() {
        this.myCanvas = document.getElementById("myCanvas")
        this.ctx = this.myCanvas.getContext("2d")
        this.width = window.innerWidth * 0.98
        this.height = window.innerHeight * 0.98
        this.myCanvas.width = this.width
        this.myCanvas.height = this.height
        //console.log("Init funciona")
        this.start()

    },

    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++

            if (this.framesCounter > 1000) this.framesCounter = 0
            this.clear()
            this.genAsteroids() //Dibujar asteroides
            this.drawAll()
            this.clearBullets()
            this.clearAsteroids()
            console.log(this.player.bullets)
            this.moveAll()

            // if (this.framesCounter % 100 == 0)

            if (this.isCollision()) {
                this.gameOver()
            }
            if (this.isCollision2()) {
                //alert("asdas")
                this.gameOver()
            }



        }, 1000 / this.fps)

    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, this.myCanvas.width, this.myCanvas.height, this.keys)
        this.scoreboard = ScoreBoard;
        this.scoreboard.init(this.ctx);
        this.score = 0;
    },

    drawAll() {
        this.background.draw()
        this.player.draw()
        this.asteroids.forEach(asteroid => asteroid.draw())
        this.asteroids.forEach(asteroid => asteroid.move())
        this.drawScore()
    },

    moveAll() {
        //this.player.rotate()
        this.player.move()
    },

    genAsteroids() {
        let randomNumX = Math.floor(Math.random() * (800 - 100) + 100)
        let randomNumY = Math.floor(Math.random() * (500 - 100) + 100)
        let velX = Math.floor(Math.random() * 5)
        let velY = Math.floor(Math.random() * 5)

        if (this.framesCounter % 200 == 0) {
            this.asteroids.push(new Asteroid(this.ctx, randomNumX, -150, velX, velY)) //arriba
        }
        if (this.framesCounter % 250 == 0) {
            this.asteroids.push(new Asteroid(this.ctx, randomNumX, -150, -velX, velY)) //arriba
        }
        if (this.framesCounter % 300 == 0) {
            this.asteroids.push(new Asteroid(this.ctx, -150, randomNumY, velX, velY)) //izquierda
        }
        if (this.framesCounter % 350 == 0) {
            this.asteroids.push(new Asteroid(this.ctx, -150, randomNumY, velX, -velY)) //izquierda
        }
        if (this.framesCounter % 200 == 0) {
            this.asteroids.push(new Asteroid(this.ctx, randomNumX, this.height + 150, -velX, -velY)) //abajo
        }
        if (this.framesCounter % 250 == 0) {
            this.asteroids.push(new Asteroid(this.ctx, randomNumX, this.height + 150, velX, -velY)) //abajo
        }
        if (this.framesCounter % 300 == 0) {
            this.asteroids.push(new Asteroid(this.ctx, this.width + 150, randomNumY, -velX, -velY)) // derecha
        }
        if (this.framesCounter % 200 == 0) {
            this.asteroids.push(new Asteroid(this.ctx, this.width + 150, randomNumY, -velX, velY)) //derecha
        }
    },
    isCollision() {
        return this.asteroids.some(asteroids => {
                //console.log(asteroids.posX, asteroids.posY, asteroids.height, asteroids.width)
                return (
                    asteroids.posX + asteroids.width - 15 >= this.player.posX && //izquierda
                    asteroids.posY <= this.player.posY + this.player.height - 15 && // abajo
                    asteroids.posX <= this.player.posX + this.player.width - 15 && // derecha
                    asteroids.posY + asteroids.height >= this.player.posY + 15 // arriba 
                )
            }

        )
    },

    isCollision2() {
        for (let i = 0; i < this.asteroids.length; i++) {
            for (let j = 0; j < this.player.bullets.length; j++) {
                //console.log("what the fuck")
                //const element = array[j];
                if (
                    this.player.bullets.length > 0 &&
                    this.asteroids[i].posX + this.asteroids[i].width >= this.player.bullets[j].posX && //izquierda
                    this.asteroids[i].posY <= this.player.bullets[j].posY + this.player.bullets[j].height && // abajo
                    this.asteroids[i].posX <= this.player.bullets[j].posX + this.player.bullets[j].width && // derecha
                    this.asteroids[i].posY + this.asteroids[i].height >= this.player.bullets[j].posY // arriba 
                ) {
                    //console.log("SIIIIIIIIIIIIIIIIIIIIII")
                    this.asteroids.splice(i, 1)
                    this.score += 10
                    this.player.bullets.splice(j, 1)
                }
            }
        }


    },
    clear() {
        this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height)
    },
    clearBullets() {
        //funcion para limpiar obs


        this.player.bullets.forEach((bullet, idx) => {
            //console.log("fuera")
            if (bullet.posX <= 0 || bullet.posX >= this.width || bullet.posY <= 0 || bullet.posY >= this.height) {
                this.player.bullets.splice(idx, 1);
                //console.log("me salgo")
            }
        });
    },
    clearAsteroids() {
        this.asteroids.forEach((ast, idx) => {
            if (ast.posX <= -200 || ast.posX >= this.width + 200 || ast.posY <= -200 || ast.posY >= this.height + 200) {
                this.asteroids.splice(idx, 1)
            }
        });
    },
    gameOver() {
        clearInterval(this.interval) // detiene el juego
    },
    drawScore() {
        this.scoreboard.update(this.score); //pintar marcador
    },

}