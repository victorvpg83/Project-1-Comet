window.onload = () => {
    document.getElementById("button").onclick = () => {
        console.log("click")
        document.getElementById("header").style.display = "none"
        game.init ()
        
    }  
    
}