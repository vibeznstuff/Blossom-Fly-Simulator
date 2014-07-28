//Displays and updates health bars for each opponent
function Health(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    this.update = function(){
        //Set up health for player 1
        ctx.fillStyle="#FF0000";
        ctx.fillRect(20,20,200,20);
        ctx.fillStyle="#00E822";
        ctx.fillRect(20,20,(this.player1.health/100)*200,20);
        ctx.fillStyle="black";
        ctx.font="20px Georgia";
        ctx.fillText("Blossom",20,40);
        
        //Set up health for player 2
        ctx.fillStyle="#FF0000";
        ctx.fillRect(canvas.width-220,20,200,20);
        ctx.fillStyle="#00E822";
        ctx.fillRect(canvas.width-220,20,(this.player2.character.health/100)*200,20);
        ctx.fillStyle="black";
        ctx.font="20px Georgia";
        ctx.fillText("Protoman",canvas.width-220,40);
    };
}

var health = new Health(player,protoman);