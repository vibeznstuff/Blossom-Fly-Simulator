var snd = new Audio("sounds/ppg_drum.mp3"); // buffers automatically when created
snd.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
snd.play();

function lowerVolume(){
    if(snd.volume > 0){
        snd.volume -= .2;
    };
}

function raiseVolume(){
    if(snd.volume < 1){
        snd.volume += .2;
    };
}


var img_width = 43;
var img_height = 58;
var combo = 1;
var punching = false;
var kicking = false;

function setDim(width,height){
    img_width=width;
    img_height=height;
}

var img = document.createElement("IMG");
img.setAttribute("src","images/neutral-right.gif");
var flying = false;
var moving = false;
var right = true;
var left = false;
var attacking = false;
var dist = 0;

var fire_img = document.createElement("IMG");
fire_img.setAttribute("src","images/fireball-1-right.gif");
var fireball_speed = 600;
var fireball = new Projectile(0,0,fireball_speed,fire_img);
var fireball_exists = false;
var fireball_time = 54;
var proj_dist=0;

var stage = document.createElement("IMG");
stage.setAttribute("src","testStage.png");

function setRightRun(){
    setDim(43,58);
    if(left){
            img.setAttribute("src","images/neutral-right.gif");
            dist=0;
            left= false;
            right= true;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/run-1-right.gif");
            } else if (dist === 2){
                img.setAttribute("src","images/run-2-right.gif");
            } else if (dist === 3){
                img.setAttribute("src","images/run-3-right.gif");
            } else if (dist === 4) {
                img.setAttribute("src","images/run-4-right.gif");
            }
            if(dist >= 4){
                dist= 0;
            }
        };
};

function setLeftRun(){
    setDim(43,58);
    if(right){
            img.setAttribute("src","images/neutral-left.gif");
            dist=0;
            left= true;
            right= false;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/run-1-left.gif");
            } else if (dist == 2){
                img.setAttribute("src","images/run-2-left.gif");
            } else if (dist == 3){
                img.setAttribute("src","images/run-3-left.gif");
            } else if (dist == 4) {
                img.setAttribute("src","images/run-4-left.gif");
            };
            if(dist >= 4){
                dist= 0;
            }
        };
};

function setRightTakeOff(){
    setDim(43,58);
    if(left){
            img.setAttribute("src","images/neutral-left.gif");
            dist=0;
            left= false;
            right= true;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/takeoff-1-right.gif");
                setDim(43,58);
            } else if (dist === 2){
                img.setAttribute("src","images/takeoff-2-right.gif");
                setDim(43,58);
            } else if (dist >= 3){
                img.setAttribute("src","images/fly-right.gif");
                setDim(75,35);
            }
        };
};

function setLeftTakeOff(){
    setDim(43,58);
    if(right){
            img.setAttribute("src","images/neutral-left.gif");
            dist=0;
            left= true;
            right= false;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/takeoff-1-left.gif");
                setDim(43,58);
            } else if (dist === 2){
                img.setAttribute("src","images/takeoff-2-left.gif");
                setDim(43,58);
            } else if (dist >= 3){
                img.setAttribute("src","images/fly-left.gif");
                setDim(75,35);
            }
        };
};

function setFireBall(){
    attacking=true;
    if(right){
        dist+=1;
        if(dist===1){
            img.setAttribute("src","images/attack-1-right.gif");
            setDim(45,56);
        } else if (dist===2){
            img.setAttribute("src","images/attack-2-right.gif");
            setDim(36,59);
        } else if (dist===3){
            img.setAttribute("src","images/attack-3-right.gif");
            setDim(56,59);
        } else if (dist===4){
            img.setAttribute("src","images/attack-4-right.gif");
        } else if (dist===5){
            img.setAttribute("src","images/attack-5-right.gif");
            setDim(53,60);
        } else if (dist===6){
            particle.vx -= 60;
            fireball_exists=true;
            fireball.setPosition(particle.x+img_width*(.8),particle.y+8);
            fireball.setRight();
        }
    } else {
        dist+=1;
        if(dist===1){
            img.setAttribute("src","images/attack-1-left.gif");
            setDim(45,56);
        } else if (dist===2){
            img.setAttribute("src","images/attack-2-left.gif");
            setDim(36,59);
        } else if (dist===3){
            img.setAttribute("src","images/attack-3-left.gif");
            setDim(56,59);
        } else if (dist===4){
            img.setAttribute("src","images/attack-4-left.gif");
        } else if (dist===5){
            img.setAttribute("src","images/attack-5-left.gif");
            setDim(53,60);
        } else if (dist===6){
            fireball_exists=true;
            particle.vx += 60;
            fireball.setPosition(particle.x-img_width*(.8),particle.y+8);
            fireball.setLeft();
        }
    }
};

var keys = []; // Or you could call it "key"

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keys[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
    if(keys[37] && keys[38] && !attacking){ // left and up
        particle.vx += -20;
        particle.vy += -20;
        if(!flying){
            setLeftTakeOff();
        } else {
            img.setAttribute("src","images/fly-left.gif");
            setDim(75,35);
        };
        
        moving = true;
    } else if (keys[37] && keys[40] && !attacking){ // left and down
        particle.vx += -20;
        particle.vy += 20
        img.setAttribute("src","images/neutral-left.gif");
        setDim(43,58);
        moving = true;
    } else if (keys[39] && keys[38] && !attacking){ // right and up
        particle.vx += 20;
        particle.vy += -20;
        if(!flying){
            setRightTakeOff();
        } else {
            img.setAttribute("src","images/fly-right.gif");
            setDim(75,35);
        };
        moving = true;
    } else if (keys[39] && keys[40] && !attacking){ // right and down
        particle.vx += 20;
        particle.vy += 20;
        img.setAttribute("src","images/neutral-right.gif");
        setDim(43,58);
        moving = true;
    } else if (keys[37] && !attacking){ // left
        particle.vx += -20;
        if(!flying){
            setLeftRun();
        } else {
            right = false;
            left = true;
            img.setAttribute("src","images/fly-neutral-left.gif");
            setDim(46,75);
        }
        moving = true;
    } else if (keys[38] && !attacking){ // up
        particle.vy += -20;
        if(right){
            img.setAttribute("src","images/fly-neutral-right.gif");
            setDim(46,75);
        } else {
            img.setAttribute("src","images/fly-neutral-left.gif");
            setDim(46,75);
        };
        moving = true;
    } else if (keys[39] && !attacking){ // right
        particle.vx += 20;
        if(!flying){
            setRightRun();
        } else {
            right = true;
            left = false;
            img.setAttribute("src","images/fly-neutral-right.gif");
            setDim(46,75);
        }
        moving = true;
    } else if (keys[40] && !attacking){ // down
        particle.vy += 20
        if(!flying){
            setDim(50,54);
            moving=false;
            if(right){
                img.setAttribute("src","images/crouch-right.gif");
            } else {
                img.setAttribute("src","images/crouch-left.gif");
            };
        } else {
            moving = true;
        };
    } else if (keys[67]){
        if(!attacking){
            dist=0;
        };
        setFireBall();
    } else if (keys[90]){
        if(kicking){
            punching = true;
            kicking = false;
            combo=1;
        } else {
            punching = true;
        }
        if(right){
            if( combo<=2 ){
                img.setAttribute("src","images/punch-1-right.gif");
                setDim(43,60);
                particle.vx += 5;
                combo +=1;
            } else if (combo<=4){
                img.setAttribute("src","images/punch-2-right.gif");
                setDim(55,60);
                particle.vx += 5;
                combo +=1;
            } else if (combo<=6){
                img.setAttribute("src","images/punch-3-right.gif");
                setDim(52,61);
                particle.vx += 5;
                combo +=1;
            } else if (combo<=8){
                img.setAttribute("src","images/punch-4-right.gif");
                setDim(59,60);
                particle.vx += 5;
                combo +=1;
            } else if (combo<=10){
                img.setAttribute("src","images/punch-5-right.gif");
                setDim(42,63);
                particle.vx += 5;
                combo +=1;
            } else if (combo<=14){
                img.setAttribute("src","images/punch-6-right.gif");
                setDim(56,61);
                particle.vx += 5;
                combo=1;
            }
        } else {
            if( combo <= 2 ){
                img.setAttribute("src","images/punch-1-left.gif");
                setDim(43,60);
                particle.vx -= 5;
                combo +=1;
            } else if (combo <= 4){
                img.setAttribute("src","images/punch-2-left.gif");
                setDim(55,60);
                particle.vx -= 5;
                combo +=1;
            } else if (combo <= 6){
                img.setAttribute("src","images/punch-3-left.gif");
                setDim(52,61);
                particle.vx -= 5;
                combo +=1;
            } else if (combo <= 8){
                img.setAttribute("src","images/punch-4-left.gif");
                setDim(59,60);
                particle.vx -= 5;
                combo +=1;
            } else if (combo <= 10){
                img.setAttribute("src","images/punch-5-left.gif");
                setDim(42,63);
                particle.vx -= 5;
                combo +=1;
            } else if (combo <= 14){
                img.setAttribute("src","images/punch-6-left.gif");
                setDim(56,61);
                particle.vx -= 5;
                combo=1;
            }
        };
    }else if(keys[88]){
        if(punching){
            kicking = true;
            punching = false;
            combo=1;
        } else {
            kicking = true;
        }
        if(right){
            if(combo <= 1){
                img.setAttribute("src","images/brace-right.gif");
                setDim(49,60);
                combo += 1;
            } else if (combo <= 3){
                img.setAttribute("src","images/kick-1-right.gif");
                setDim(52,54);
                if(!flying){
                    particle.vx += 10;
                    particle.vy -= 10;
                }
                combo+=1;
            } else if (combo <= 10){
                img.setAttribute("src","images/kick-2-right.gif");
                setDim(85,52);
                if(!flying){
                    particle.vx += 30;
                    particle.vy -= 30;
                }
                combo+=1;
            } else if (combo ===11){
                combo = 1;
            }
        } else {
            if(combo <= 1){
                img.setAttribute("src","images/brace-left.gif");
                setDim(49,60);
                combo += 1;
            } else if (combo <= 3){
                img.setAttribute("src","images/kick-1-left.gif");
                setDim(52,54);
                if(!flying){
                    particle.vx += 10;
                    particle.vy -= 10;
                }
                combo+=1;
            } else if (combo <= 10){
                if(!flying){
                    particle.vx -= 30;
                    particle.vy -= 30;
                }
                img.setAttribute("src","images/kick-2-left.gif");
                setDim(85,52);
            } else if (combo===11){
                combo=1;
            }
        }
        
    } else {
        moving = false;
        attacking = false;
        if(flying){
            if(right && particle.vy >= 0){
                img.setAttribute("src","images/falling-right.gif");
                setDim(43,59);
            } else if(right && particle.vy < 0){
                img.setAttribute("src","images/fly-neutral-right.gif");
                setDim(46,75);
            } else if(left && particle.vy >= 0){
                img.setAttribute("src","images/falling-left.gif");
                setDim(43,59);
            } else if(left && particle.vy < 0){
                img.setAttribute("src","images/fly-neutral-left.gif");
                setDim(46,75);
            }
        } else {
            if(right){
                img.setAttribute("src","images/neutral-right.gif");
                setDim(43,58);
            } else {
                img.setAttribute("src","images/neutral-left.gif");
                setDim(43,58);
            };
        };
    };  
};

// Get the canvas element
var canvas = document.getElementById( "canvas" );
// Get our 2D context for drawing
var ctx = canvas.getContext( "2d" );


// Frames-per-second
var FPS = 150;

//Projectile object
function Projectile(x,y,v,img){
    this.x = x;
    this.y = y;
    this.velocity = v;
    this.img = img;
    this.draw = function(){
        var img = fire_img;
        if(right){
            img.setAttribute("src", "images/fireball-1-right.gif");
            ctx.drawImage(img,this.x,this.y,56,43);
        } else {
            img.setAttribute("src", "images/fireball-1-left.gif");
            ctx.drawImage(img,this.x,this.y,56,43);
        };
        /*if(right){
            proj_dist += 1;
            if(proj_dist === 1){
                fireball.setImage("images/fireball-1-right.gif");
                fireball.draw();
            } else if (proj_dist === 2){
                fireball.setImage("images/fireball-2-right.gif");
                fireball.draw();
            } else if (proj_dist === 3){
                fireball.setImage("images/fireball-3-right.gif");
                fireball.draw();
                proj_dist=0;
                fireball_time -= 3;
            };
            if(proj_dist===fireball_time){
                fireball_time=54;
                fireball_exists=false;
            };
        } else {
            proj_dist += 1;
            if(proj_dist === 1){
                fireball.setImage("images/fireball-1-left.gif");
                fireball.draw();
            } else if (proj_dist === 2){
                fireball.setImage("images/fireball-2-left.gif");
                fireball.draw();
            } else if (proj_dist === 3){
                fireball.setImage("images/fireball-3-left.gif");
                fireball.draw();
                proj_dist=0;
                fireball_time -= 3;
            };
            if(proj_dist===fireball_time){
                fireball_time=54;
                fireball_exists=false;
            };
        }; */
    }
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

// Particle object
var particle = {
    x: canvas.width/2,
    y: canvas.height - 65,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 150,
    color: "red",
    draw: function() {
        ctx.drawImage(img,this.x,this.y,img_width,img_height);
    },
    update: function() {
        
        if(!attacking){
            this.vx += this.ax / FPS;
            this.vy += this.ay / FPS;
            this.x += this.vx / FPS;
            this.y += this.vy / FPS;
        };
        
        if(this.y < (canvas.height - 65 - img_height*1.5)){
            flying = true;
        } else {
            flying = false;
        };
        
        
        // Collision detection
        if ( this.x  < -img_width) {
            this.x = canvas.width;
            this.vx = this.vx/2;
        };
        if ( this.x > canvas.width) {
            this.x = -img_width;
            this.vx = this.vx/2;
        };
        if ( this.y <= 0 ) {
            this.y = 0;
            this.vy = 0;
        };
        if ( this.y > (canvas.height - 65) - img_height ) {
            this.y = canvas.height - 65 - img_height;
            this.vy = -this.vy/6;
            this.vx = this.vx/1.01;
        };
    }
};

// Game loop draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(stage,0,0,canvas.width,canvas.height);
    particle.draw();
    if(fireball_exists){
        fireball.draw();
    }
}

// Game loop update function
function update() {
    particle.update();
    if(fireball_exists){
        fireball.update();
    }
}

function tick() {
    //console.log(fireball.x);
    draw();
    update();
}

setInterval( tick, 1000 / FPS );