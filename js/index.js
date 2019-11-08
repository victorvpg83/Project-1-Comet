window.onload = () => {
    document.getElementById("button").onclick = () => {
        console.log("click")
        document.getElementById("header").style.display = "none"
        game.init()

    }
    document.getElementById("buttonR").onclick = () => {
        console.log("click")
        document.getElementById("myCanvas").style.display = "block"
        document.getElementById("gameOver").style.display = "none"
        game.init()

    }

}