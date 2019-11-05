const game = {
    myCanvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    asteroids: [],
    bullets: [],
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
            this.drawAll()



        }, 1000 / this.fps)

    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, this.myCanvas.width, this.myCanvas.height, this.keys)

    },

    drawAll() {
        this.background.draw()
        this.player.draw()
        this.asteroids.forEach(asteroid => asteroid.draw())
        this.asteroids.forEach(asteroid => asteroid.move())
        // this.genAsteroids() //Dibujar asteroides
    },

    moveAll() {
        this.player.move(this.framesCounter)
    },

    genAsteroids() {
        if (this.framesCounter % 200== 0){
            this.asteroids.push(new Asteroid(this.ctx, -150, -150))
        }
    }

}