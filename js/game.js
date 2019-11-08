const game = {
    myCanvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    asteroids: [],
    meteors: [],
    framesCounter: 0,
    score: 0,
    gameMusic: new Audio("./sound/POL-the-foyer-short.wav"),
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
        //this.playMusic()

    },

    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++

            if (this.framesCounter > 1000) this.framesCounter = 0
            this.clear()
            this.genAsteroids() //Dibujar asteroides
            this.genMeteors() //Dibujar meteors
            this.drawAll()
            this.clearBullets()
            this.clearAsteroids()
            this.clearMeteors()
            this.playMusic()
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
            if (this.isCollision3()) {
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
        //this.playMusic()
    },

    drawAll() {
        this.background.draw()
        this.player.draw()
        //this.shield.draw()
        this.asteroids.forEach(asteroid => asteroid.draw())
        this.asteroids.forEach(asteroid => asteroid.move())
        this.meteors.forEach(meteor => meteor.draw())
        this.meteors.forEach(meteor => meteor.move())
        this.drawScore()
        // this.player.shield()
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
    genMeteors() {
        let randomNumX = Math.floor(Math.random() * (800 - 100) + 100)
        let randomNumY = Math.floor(Math.random() * (500 - 100) + 100)
        let velX = Math.floor(Math.random() * 5)
        let velY = Math.floor(Math.random() * 5)

        if (this.framesCounter % 500 == 0) {
            this.meteors.push(new Meteor(this.ctx, randomNumX, -150, velX, velY)) //arriba
        }
        if (this.framesCounter % 550 == 0) {
            this.meteors.push(new Meteor(this.ctx, randomNumX, -150, -velX, velY)) //arriba
        }
        if (this.framesCounter % 450 == 0) {
            this.meteors.push(new Meteor(this.ctx, -150, randomNumY, velX, velY)) //izquierda
        }
        if (this.framesCounter % 550 == 0) {
            this.meteors.push(new Meteor(this.ctx, -150, randomNumY, velX, -velY)) //izquierda
        }
        if (this.framesCounter % 600 == 0) {
            this.meteors.push(new Meteor(this.ctx, randomNumX, this.height + 150, -velX, -velY)) //abajo
        }
        if (this.framesCounter % 550 == 0) {
            this.meteors.push(new Meteor(this.ctx, randomNumX, this.height + 150, velX, -velY)) //abajo
        }
        if (this.framesCounter % 500 == 0) {
            this.meteors.push(new Meteor(this.ctx, this.width + 150, randomNumY, -velX, -velY)) // derecha
        }
        if (this.framesCounter % 450 == 0) {
            this.meteors.push(new Meteor(this.ctx, this.width + 150, randomNumY, -velX, velY)) //derecha
        }
    },
    isCollision() {
        return this.asteroids.some(asteroids => {
                //console.log(asteroids.posX, asteroids.posY, asteroids.height, asteroids.width)
                return (
                    asteroids.posX + asteroids.width - 30 >= this.player.posX && //izquierda
                    asteroids.posY <= this.player.posY + this.player.height - 30 && // abajo
                    asteroids.posX <= this.player.posX + this.player.width - 30 && // derecha
                    asteroids.posY + asteroids.height >= this.player.posY + 30 // arriba 
                )

            }

        )
    },
    isCollision3() {
        return this.meteors.some(meteors => {
                //console.log(asteroids.posX, asteroids.posY, asteroids.height, asteroids.width)
                return (
                    meteors.posX + meteors.width - 30 >= this.player.posX && //izquierda
                    meteors.posY <= this.player.posY + this.player.height - 30 && // abajo
                    meteors.posX <= this.player.posX + this.player.width - 30 && // derecha
                    meteors.posY + meteors.height >= this.player.posY + 30 // arriba 
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
                    this.asteroids[i].posX + this.asteroids[i].width - 20 >= this.player.bullets[j].posX && //izquierda
                    this.asteroids[i].posY <= this.player.bullets[j].posY + this.player.bullets[j].height - 20 && // abajo
                    this.asteroids[i].posX <= this.player.bullets[j].posX + this.player.bullets[j].width - 20 && // derecha
                    this.asteroids[i].posY + this.asteroids[i].height >= this.player.bullets[j].posY + 20 // arriba 
                ) {
                    //console.log("SIIIIIIIIIIIIIIIIIIIIII")
                    this.asteroids.splice(i, 1)
                    this.score += 10
                    this.player.bullets.splice(j, 1)
                    let explosion = document.createElement("audio")
                    explosion.src = "./sound/NFF-cannon.wav"
                    explosion.volume = .3
                    explosion.play()
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
    clearMeteors() {
        this.meteors.forEach((ast, idx) => {
            if (ast.posX <= -200 || ast.posX >= this.width + 200 || ast.posY <= -200 || ast.posY >= this.height + 200) {
                this.meteors.splice(idx, 1)
            }
        });
    },
    gameOver() {
        clearInterval(this.interval) // detiene el juego
        this.ctx.font = "bold 50px sans-serif"
        this.ctx.fillStyle = "red"
        this.ctx.fillText("GAME OVER!", this.width / 2 - 150, this.height / 2)
        let dead = document.createElement("audio")
        dead.src = "./sound/explosion-01.mp3"
        dead.volume = 1
        dead.play()
        document.getElementById("myCanvas").style.display = "none"
        document.getElementById("gameOver").style.display = "block"
    },
    drawScore() {
        this.scoreboard.update(this.score); //pintar marcador
    },
    playMusic() {
        this.gameMusic.volume = .3
        this.gameMusic.loop = true
        this.gameMusic.play()
    }

}