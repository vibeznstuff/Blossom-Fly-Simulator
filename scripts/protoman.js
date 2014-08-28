function Protoman(){
    var speed = 6;
    var moving = false;
    var duration = 0;
    var airtime = false;
    this.character = new Character("images/protoman/neutral-1-left.gif",speed);
    this.character.friction = .1;
    
    //Protoman-specific actions
    this.character.blast1 = false;
    this.character.defend = false;
    
    var plasma_img = document.createElement("IMG");
    var plasma_speed = 800;
    var plasmaball = new Projectile(0,0,plasma_speed, plasma_img, false);
    this.getPlasmaBall = function(){
        return plasmaball;
    };
    
    this.character.move = function(){
        var rand = 0;
        if(duration < 1){
            duration = Math.round(Math.random()*250) + 50;
            rand = Math.random();
            if(rand < .20){ //Move left
                moving = true;
                this.blast1 = false;
                if(this.right){
                    this.defend = false;
                    this.left = true;
                    this.right = false;
                    this.vx = 0;
                    this.ax = 0;
                }
                moves = 0;
            } else if ( rand < .4) { //Move right
                moving = true;
                this.blast1 = false;
                if(this.left){
                    this.defend = false;
                    this.left = false;
                    this.right = true;
                    this.vx = 0;
                    this.ax = 0;
                }
                moves = 0;
            } else if (rand < .6) { //Shoot
                moving = false;
                this.blast1= true;
                this.defend = false;
                if(this.left){
                    plasmaball.exists =true;
                    plasmaball.setPosition(this.x+img.width*(.8),this.y+15);
                    plasmaball.setLeft();
                    plasmaball.setImage("images/protoman/plasmaball-left.gif");
                } else {
                    plasmaball.exists = true;
                    plasmaball.setPosition(this.x+img.width*(.8),this.y+15);
                    plasmaball.setRight();
                    plasmaball.setImage("images/protoman/plasmaball-right.gif");
                }
            } else { //Don't do anything
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
    };
    
    var moves = 0;
    
    this.manage = function(proj){
        //Handle case where you are being attacked with hand-to-hand combat
        if(proj.hasOwnProperty('handtohand')){
            if(proj.handtohand){
                var xtouching = (Math.abs(proj.x - this.character.x) <= 40);
                var ytouching = (Math.abs(proj.y - this.character.y) <= 40);
                if(xtouching && ytouching){
                    this.character.health -= .05
                    if(this.character.health <=0){
                        this.character.health = 0;
                    };
                };
            };
        } else {
            var xtouching = (Math.abs(proj.x - this.character.x) <= 20);
            //Projectile hits middle of protoman
            var y1 = (proj.y > this.character.y) && (proj.y < (this.character.y+this.character.img.height));
            var y2 = (proj.y + proj.img.height) > this.character.y;
            var ytouching =  y1 || y2;
            var goingRight = proj.velocity > 0;
            if(this.character.defend){
                if(this.character.left && goingRight && xtouching && ytouching){
                    proj.reverse();
                } else if (this.character.right && !goingRight && xtouching && ytouching){
                    proj.reverse();
                };
            } else {
                if(xtouching && ytouching){
                    this.character.health -= .5;
                    if(this.character.health <=0){
                        this.character.health = 0;
                    };
                };
            };
        };
    };
    
    this.draw = function(){
        this.character.draw();
    };
    this.update = function(){
        this.character.move();
        this.character.update();
        this.setSprite();
        this.manage(fireball);
        this.manage(laser);
        this.manage(player);
    };
    
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
                    this.character.defend = true;
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
                    this.character.defend = true;
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