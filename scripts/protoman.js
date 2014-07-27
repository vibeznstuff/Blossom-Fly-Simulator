function Protoman(){
    var speed = 6;
    var moving = false;
    var duration = 0;
    var airtime = false;
    this.character = new Character("images/protoman/neutral-1-left.gif",speed);
    this.character.friction = .1;
    
    //Protoman-specific actions
    this.character.blast1 = false;
    this.character.blast2 = false;
    this.character.laser = false;
    this.character.defend = false;
    
    this.character.move = function(){
        var rand = 0;
        if(duration < 1){
            duration = Math.round(Math.random()*250) + 50;
            rand = Math.random();
            if(rand < .20){
                moving = true;
                this.blast1 = false;
                if(this.right){
                    this.left = true;
                    this.right = false;
                    this.vx = 0;
                    this.ax = 0;
                }
                moves = 0;
            } else if ( rand < .4) {
                moving = true;
                this.blast1 = false;
                if(this.left){
                    this.left = false;
                    this.right = true;
                    this.vx = 0;
                    this.ax = 0;
                }
                moves = 0;
            } else if (rand < .6) {
                moving = false;
                this.blast1= true;
            } else {
                moving = false;
                this.blast1 = false;
                if(this.left){
                    this.vx = 0;
                    this.ax = 0;
                    this.setImage("images/protoman/neutral-1-left.gif");
                } else {
                    this.setImage("images/protoman/neutral-1-right.gif");
                    this.vx = 0;
                    this.ax = 0;
                }
            };
        };
        duration -= 1;
        console.log(duration);
    };
    
    var moves = 0;
    
    this.draw = function(){
        this.character.draw();
    };
    this.update = function(){
        this.character.move();
        this.character.update();
        this.setSprite();
        //console.log(moves);
    }
    this.setSprite = function(){
        //console.log(this.character.vx);
        if(this.character.left){
            if(this.character.blast1){
                if(moves <= 10){
                    this.character.setImage("images/protoman/neutral-1-left.gif");
                } else if (moves <= 20) {
                    this.character.setImage("images/protoman/neutral-2-left.gif");
                } else if (moves <= 30) {
                    this.character.setImage("images/protoman/shoot-1-left.gif");
                } else if (moves <= 40) {
                    this.character.setImage("images/protoman/shoot-2-left.gif");
                } else if (moves  >  50) {
                    this.character.setImage("images/protoman/shoot-3-left.gif");
                };
            } else if (moving){
                if(moves <= 20){
                    this.character.setImage("images/protoman/brace-left.gif");
                } else if (moves <= 40) {
                    this.character.setImage("images/protoman/run-1-left.gif");
                    this.character.vx -= speed;
                } else if (moves <= 60) {
                    this.character.setImage("images/protoman/run-2-left.gif");
                    this.character.vx -= speed;
                } else if (moves <= 80) {
                    this.character.setImage("images/protoman/run-3-left.gif");
                    this.character.vx -= speed*2;
                } else if (moves  >  80) {
                    this.character.setImage("images/protoman/run-4-left.gif");
                    this.character.vx -= speed*2;
                    this.character.ax -= speed*(.8);
                };
            };
        } else {
            if(this.character.blast1){
                if(moves <= 10){
                    this.character.setImage("images/protoman/neutral-1-right.gif");
                } else if (moves <= 20) {
                    this.character.setImage("images/protoman/neutral-2-right.gif");
                } else if (moves <= 30) {
                    this.character.setImage("images/protoman/shoot-1-right.gif");
                } else if (moves <= 40) {
                    this.character.setImage("images/protoman/shoot-2-right.gif");
                } else if (moves  >  50) {
                    this.character.setImage("images/protoman/shoot-3-right.gif");
                };
            } else if(moving){
                if(moves <= 20){
                    this.character.setImage("images/protoman/brace-right.gif");
                } else if (moves <= 40) {
                    this.character.setImage("images/protoman/run-1-right.gif");
                    this.character.vx += speed;
                } else if (moves <= 60) {
                    this.character.setImage("images/protoman/run-2-right.gif");
                    this.character.vx += speed;
                } else if (moves <= 80) {
                    this.character.setImage("images/protoman/run-3-right.gif");
                    this.character.vx += speed*2;
                } else if (moves  >  80) {
                    this.character.setImage("images/protoman/run-4-right.gif");
                    this.character.vx += speed*2;
                    this.character.ax += speed*(.8);
                };
            };
        }
        moves += 1;
    };
};

var protoman = new Protoman();