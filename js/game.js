const game = {
    myCanvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    asteroids: [],
    framesCounter: 0,
    score: undefined,
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
            this.genAsteroids() //Dibujar asteroides
            this.drawAll()
            // this.moveAll()

            if (this.framesCounter % 100 == 0) this.score++

            if (this.isCollision()) {
                this.gameOver()
            }
            if (this.isCollision2()) {
                alert("asdas")
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
        this.player.rotate()
    },

    genAsteroids() {
        if (this.framesCounter % 200 == 0) {
            this.asteroids.push(new Asteroid(this.ctx, -150, -150))
        }
    },
    isCollision() {
        return this.asteroids.some(asteroids => {
                return (
                    asteroids.posX + asteroids.width >= this.player.posX && //izquierda
                    asteroids.posY <= this.player.posY + this.player.height && // abajo
                    asteroids.posX <= this.player.posX + this.player.width && // derecha
                    asteroids.posY + asteroids.height >= this.player.posY // arriba 
                )
            }

        )
    },

    isCollision2() {
        for (let i = 0; i < this.asteroids.length; i++) {
            for (let j = 0; j < this.player.bullets.length; j++) {
                console.log("what the fuck")
                //const element = array[j];
                if (
                    this.player.bullets.length>0 &&
                    this.asteroids[i].posX + this.asteroids[i].width >= this.player.bullets[j].posX && //izquierda
                    this.asteroids[i].posY <= this.player.bullets[j].posY + this.player.bullets[j].height && // abajo
                    this.asteroids[i].posX <= this.player.bullets[j].posX + this.player.bullets[j].width && // derecha
                    this.asteroids[i].posY + this.asteroids[i].height >= this.player.bullets[j].posY // arriba 
                ) {
                    console.log("SIIIIIIIIIIIIIIIIIIIIII")
                    this.asteroids.splice(i,1)
                    this.bullets.splice(j,1)
                }
            }
        }


    },
    gameOver() {
        clearInterval(this.interval) // detiene el juego
    },
    drawScore() {
        this.scoreboard.update(this.score); //pintar marcador
    },

}