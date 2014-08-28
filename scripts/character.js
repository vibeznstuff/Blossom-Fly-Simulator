
// Character class
function Character(img_src,speed){
    this.x = 3*canvas.width/4;
    this.y =  canvas.height - 65;
    this.handtohand = false;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.health = 100;
    this.left = true;
    this.right = false;
    this.up = false;
    this.down = false;
    this.moving = false;
    this.ay = 150;
    var clock= 0;
    var rand = Math.random();
    this.speed = speed;
    this.friction = 1/speed;
    this.attacking = false;
    this.img = document.createElement("IMG");
    this.img.setAttribute("src",img_src);
    
    this.draw = function() {
        ctx.drawImage(this.img,this.x,this.y);
    };
    
    this.setImage = function(img){
        this.img.setAttribute("src",img);
    };
    
    //AI Movement (Should be rewritten)
    this.move = function(enemy){
        if(clock < rand*60){
            if(rand < .25 || rand > .75){
                this.vx += speed;
            } else {
                this.vx -= speed;
            }
            clock += 1;
        } else {
            rand = Math.random();
            clock = 0;
        };
    };
    this.update = function() {
        this.move();
        
        if(!this.attacking){
            this.vx += this.ax / FPS;
            this.vy += this.ay / FPS;
            this.x += this.vx / FPS;
            this.y += this.vy / FPS;
        };
        
        // Collision detection
        if (this.x  < -this.img.width) {
            this.x = canvas.width;
            this.vx = this.vx/2;
        };
        if (this.x > canvas.width) {
            this.x = -this.img.width;
            this.vx = this.vx/2;
        };
        if (this.y <= 0 ) {
            this.y = 0;
            this.vy = 0;
        };
        if (this.y > (canvas.height - 65) - this.img.height) {
            this.y = canvas.height - 65 - this.img.height;
            this.vy = -this.vy/6;
            this.vx = this.vx/(1 + this.friction);
        };
    };
};
