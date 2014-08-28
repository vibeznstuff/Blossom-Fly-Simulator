/*
    ----Projectile Object----
    x: x position
    y: y position
    v: velocity
    img: img object
    exists: boolean acknowlding if projectile is on screen
    rsrc: right-facing source image
    lsrc: left-facing source image
*/
function Projectile(x,y,v,img,exists,rsrc,lsrc){
    this.x = x;
    this.y = y;
    this.rsrc = rsrc;
    this.lsrc = lsrc;
    this.velocity = v;
    this.img = img;
    this.exists = exists;
    this.reverse = function(){
        var vel = this.velocity;
        if(vel > 0){
            this.velocity = -vel;
            this.setImage(lsrc);
        } else {
            this.velocity = -vel;
            this.setImage(rsrc);
        }
    }
    this.draw = function(){
        ctx.drawImage(this.img,this.x,this.y);
    };
    this.update = function(){
        this.x += this.velocity / FPS;
        
        // Collision detection
        if (this.x  < -100) {
            this.exists = false;
            this.x = 1000;
            this.y = 1000;
            this.vx = 0;
        };
        if ( this.x > canvas.width) {
            this.exists = false;
            this.x = 1000;
            this.y = 1000;
            this.vx = 0;
        };
    };
    this.setImage = function(src){
        this.img.setAttribute("src",src);
    }
    this.setPosition = function(x,y){
        this.x = x;
        this.y = y;
    }
    this.setRight = function(){
        if(this.velocity < 0){
            this.velocity = -this.velocity;
        };
    };
    this.setLeft = function(){
        if(this.velocity> 0){
            this.velocity = -this.velocity;
        };
    }
};