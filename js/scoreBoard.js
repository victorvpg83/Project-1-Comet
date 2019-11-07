const ScoreBoard = {
    ctx: undefined,

    init: function (ctx) {
        this.ctx = ctx
        this.ctx.font = "30px sans-serif"
    },
    update: function (score) {
        this.ctx.fillStyle = "blue"
        this.ctx.fillText("SCORE "+ score, 50, 50)
    }
}