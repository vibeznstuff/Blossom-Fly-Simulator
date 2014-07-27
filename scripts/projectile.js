//Projectile object
function Projectile(x,y,v,img,exists){
    this.x = x;
    this.y = y;
    this.velocity = v;
    this.img = img;
    this.exists = exists;
    this.draw = function(){
        if(right){
            ctx.drawImage(this.img,this.x,this.y);
        } else {
            ctx.drawImage(this.img,this.x,this.y);
        };
    };
    this.update = function(){
        this.x += this.velocity / FPS;
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