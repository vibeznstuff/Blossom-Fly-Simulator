
//var img_width = 43;
//var img_height = 58;
var combo = 1;
var punching = false;
var kicking = false;

function setdim(width,height){
    img_width=width;
    img_height=height;
}

var img = document.createElement("IMG");
img.setAttribute("src","images/blossom/neutral-right.gif");
var flying = false;
var moving = false;
var right = true;
var left = false;
var attacking = false;
var dist = 0;

var fire_img = document.createElement("IMG");
var fire_right = "images/blossom/fireball-1-right.gif";
var fire_left = "images/blossom/fireball-1-left.gif";
var fireball_speed = 500;
var fireball = new Projectile(0,0,fireball_speed,fire_img, false, fire_right, fire_left);

var laser_img = document.createElement("IMG");
var laser_src = "images/blossom/laser.gif";
var laser_speed = 1000;
var laser = new Projectile(0,0,laser_speed,laser_img, false,laser_src,laser_src);

/*var projectile_time = 54;
var proj_dist=0;*/

var stage = document.createElement("IMG");
stage.setAttribute("src","images/stages/testStage.png");

function setRightRun(){
    //setdim(43,58);
    if(left){
            img.setAttribute("src","images/blossom/neutral-right.gif");
            dist=0;
            left= false;
            right= true;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/blossom/run-1-right.gif");
            } else if (dist === 2){
                img.setAttribute("src","images/blossom/run-2-right.gif");
            } else if (dist === 3){
                img.setAttribute("src","images/blossom/run-3-right.gif");
            } else if (dist === 4) {
                img.setAttribute("src","images/blossom/run-4-right.gif");
            }
            if(dist >= 4){
                dist= 0;
            }
        };
};

function setLeftRun(){
    //setdim(43,58);
    if(right){
            img.setAttribute("src","images/blossom/neutral-left.gif");
            dist=0;
            left= true;
            right= false;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/blossom/run-1-left.gif");
            } else if (dist == 2){
                img.setAttribute("src","images/blossom/run-2-left.gif");
            } else if (dist == 3){
                img.setAttribute("src","images/blossom/run-3-left.gif");
            } else if (dist == 4) {
                img.setAttribute("src","images/blossom/run-4-left.gif");
            };
            if(dist >= 4){
                dist= 0;
            }
        };
};

function setRightTakeOff(){
    //setdim(43,58);
    if(left){
            img.setAttribute("src","images/blossom/neutral-left.gif");
            dist=0;
            left= false;
            right= true;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/blossom/takeoff-1-right.gif");
                //setdim(43,58);
            } else if (dist === 2){
                img.setAttribute("src","images/blossom/takeoff-2-right.gif");
                //setdim(43,58);
            } else if (dist >= 3){
                img.setAttribute("src","images/blossom/fly-right.gif");
                //setdim(75,35);
            }
        };
};

function setLeftTakeOff(){
    //setdim(43,58);
    if(right){
            img.setAttribute("src","images/blossom/neutral-left.gif");
            dist=0;
            left= true;
            right= false;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/blossom/takeoff-1-left.gif");
                //setdim(43,58);
            } else if (dist === 2){
                img.setAttribute("src","images/blossom/takeoff-2-left.gif");
                //setdim(43,58);
            } else if (dist >= 3){
                img.setAttribute("src","images/blossom/fly-left.gif");
                //setdim(75,35);
            }
        };
};

function setProjectile(projectile){
    attacking=true;
    if(right){
        dist+=1;
        if(dist===1){
            img.setAttribute("src","images/blossom/attack-1-right.gif");
            //setdim(45,56);
        } else if (dist===2){
            img.setAttribute("src","images/blossom/attack-2-right.gif");
            //setdim(36,59);
        } else if (dist===3){
            img.setAttribute("src","images/blossom/attack-3-right.gif");
            //setdim(56,59);
        } else if (dist===4){
            img.setAttribute("src","images/blossom/attack-4-right.gif");
        } else if (dist===5){
            img.setAttribute("src","images/blossom/attack-5-right.gif");
            //setdim(53,60);
        } else if (dist===6){
            particle.vx -= 60;
            projectile.exists =true;
            projectile.setPosition(particle.x+img.width*(.8),particle.y+8);
            projectile.setRight();
            projectile.setImage("images/blossom/fireball-1-right.gif");
        }
    } else {
        dist+=1;
        if(dist===1){
            img.setAttribute("src","images/blossom/attack-1-left.gif");
            //setdim(45,56);
        } else if (dist===2){
            img.setAttribute("src","images/blossom/attack-2-left.gif");
            //setdim(36,59);
        } else if (dist===3){
            img.setAttribute("src","images/blossom/attack-3-left.gif");
            //setdim(56,59);
        } else if (dist===4){
            img.setAttribute("src","images/blossom/attack-4-left.gif");
        } else if (dist===5){
            img.setAttribute("src","images/blossom/attack-5-left.gif");
            //setdim(53,60);
        } else if (dist===6){
            projectile.exists=true;
            particle.vx += 60;
            projectile.setPosition(particle.x-img.width*(.8),particle.y+8);
            projectile.setLeft();
            projectile.setImage("images/blossom/fireball-1-left.gif");
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
        particle.ax += -5;
        if(!flying){
            setLeftTakeOff();
        } else {
            img.setAttribute("src","images/blossom/fly-left.gif");
            //setdim(75,35);
        };
        
        moving = true;
    } else if (keys[37] && keys[40] && !attacking){ // left and down
        particle.vx += -20;
        particle.vy += 20
        img.setAttribute("src","images/blossom/neutral-left.gif");
        //setdim(43,58);
        moving = true;
    } else if (keys[39] && keys[38] && !attacking){ // right and up
        particle.vx += 20;
        particle.vy += -20;
        particle.ax += 5;
        if(!flying){
            setRightTakeOff();
        } else {
            img.setAttribute("src","images/blossom/fly-right.gif");
            //setdim(75,35);
        };
        moving = true;
    } else if (keys[39] && keys[40] && !attacking){ // right and down
        particle.vx += 20;
        particle.vy += 20;
        img.setAttribute("src","images/blossom/neutral-right.gif");
        //setdim(43,58);
        moving = true;
    } else if (keys[37] && !attacking){ // left
        particle.vx += -20;
        if(!flying){
            setLeftRun();
        } else {
            right = false;
            left = true;
            img.setAttribute("src","images/blossom/fly-neutral-left.gif");
            //setdim(46,75);
        }
        moving = true;
    } else if (keys[38] && !attacking){ // up
        particle.vy += -20;
        if(right){
            img.setAttribute("src","images/blossom/fly-neutral-right.gif");
            //setdim(46,75);
        } else {
            img.setAttribute("src","images/blossom/fly-neutral-left.gif");
            //setdim(46,75);
        };
        moving = true;
    } else if (keys[39] && !attacking){ // right
        particle.vx += 20;
        if(!flying){
            setRightRun();
        } else {
            right = true;
            left = false;
            img.setAttribute("src","images/blossom/fly-neutral-right.gif");
            //setdim(46,75);
        }
        moving = true;
    } else if (keys[40]){ // down
        particle.vy += 20
        moving=false;
        if(!flying){
            if (keys[87]) { // Crouching laser beam
                if(!attacking){
                    attacking = true;
                    combo=1;
                }
                if(right){
                    if(combo <= 3){
                        img.setAttribute("src","images/blossom/crouch-right.gif");
                        combo += 1;
                    } else if (combo === 4) {
                        laser.exists=true;
                        laser.setPosition(particle.x+img.width*(.7),particle.y+20);
                        laser.setRight();
                        laser.setImage("images/blossom/laser.gif");
                        combo += 1;
                    };
                } else {
                    if(combo <= 3){
                        img.setAttribute("src","images/blossom/crouch-left.gif");
                        combo +=1;
                    } else if (combo === 4) {
                        laser.exists=true;
                        laser.setPosition(particle.x-img.width*(.9),particle.y+20);
                        laser.setLeft();
                        laser.setImage("images/blossom/laser.gif");
                        combo += 1;
                    };
                };
            } else {
                if(right){
                    img.setAttribute("src","images/blossom/crouch-right.gif");
                } else {
                    img.setAttribute("src","images/blossom/crouch-left.gif");
                };
            }
        } else {
            moving = true;
        };
    } else if (keys[68]){ //Plasma ball
        //laser.exists = false;
        if(!attacking){
            dist=0;
        };
        setProjectile(fireball);
    } else if (keys[65]){ // punch attack
        if(kicking){
            punching = true;
            kicking = false;
            combo=1;
        } else {
            punching = true;
        }
        if(right){
            if( combo<=2 ){
                img.setAttribute("src","images/blossom/punch-1-right.gif");
                //setdim(43,60);
                particle.vx += 5;
                combo +=1;
            } else if (combo<=4){
                img.setAttribute("src","images/blossom/punch-2-right.gif");
                //setdim(55,60);
                particle.vx += 5;
                combo +=1;
            } else if (combo<=6){
                img.setAttribute("src","images/blossom/punch-3-right.gif");
                //setdim(52,61);
                particle.vx += 5;
                combo +=1;
            } else if (combo<=8){
                img.setAttribute("src","images/blossom/punch-4-right.gif");
                //setdim(59,60);
                particle.vx += 5;
                combo +=1;
            } else if (combo<=10){
                img.setAttribute("src","images/blossom/punch-5-right.gif");
                //setdim(42,63);
                particle.vx += 5;
                combo +=1;
            } else if (combo<=14){
                img.setAttribute("src","images/blossom/punch-6-right.gif");
                //setdim(56,61);
                particle.vx += 5;
                combo=1;
            }
        } else {
            if( combo <= 2 ){
                img.setAttribute("src","images/blossom/punch-1-left.gif");
                //setdim(43,60);
                particle.vx -= 5;
                combo +=1;
            } else if (combo <= 4){
                img.setAttribute("src","images/blossom/punch-2-left.gif");
                //setdim(55,60);
                particle.vx -= 5;
                combo +=1;
            } else if (combo <= 6){
                img.setAttribute("src","images/blossom/punch-3-left.gif");
                //setdim(52,61);
                particle.vx -= 5;
                combo +=1;
            } else if (combo <= 8){
                img.setAttribute("src","images/blossom/punch-4-left.gif");
                //setdim(59,60);
                particle.vx -= 5;
                combo +=1;
            } else if (combo <= 10){
                img.setAttribute("src","images/blossom/punch-5-left.gif");
                //setdim(42,63);
                particle.vx -= 5;
                combo +=1;
            } else if (combo <= 14){
                img.setAttribute("src","images/blossom/punch-6-left.gif");
                //setdim(56,61);
                particle.vx -= 5;
                combo=1;
            }
        };
    } else if(keys[83]) { // kick attack
        if(punching){
            kicking = true;
            punching = false;
            combo=1;
        } else {
            kicking = true;
        }
        if(right){
            if(combo <= 1){
                img.setAttribute("src","images/blossom/brace-right.gif");
                //setdim(49,60);
                combo += 1;
            } else if (combo <= 2){
                img.setAttribute("src","images/blossom/kick-1-right.gif");
                //setdim(52,54);
                if(!flying){
                    particle.vx += 15;
                    particle.vy -= 80;
                }
                combo+=1;
            } else if (combo <= 10){
                img.setAttribute("src","images/blossom/kick-2-right.gif");
                //setdim(85,52);
                if(!flying){
                    particle.vx += 20;
                    //particle.vy -= 15;
                }
                combo+=1;
            }
        } else {
            if(combo <= 1){
                img.setAttribute("src","images/blossom/brace-left.gif");
                //setdim(49,60);
                combo += 1;
            } else if (combo <= 2){
                img.setAttribute("src","images/blossom/kick-1-left.gif");
                //setdim(52,54);
                if(!flying){
                    particle.vx += 15;
                    particle.vy -= 80;
                }
                combo+=1;
            } else if (combo <= 10){
                if(!flying){
                    particle.vx -= 20;
                    //particle.vy -= 15;
                }
                img.setAttribute("src","images/blossom/kick-2-left.gif");
                //setdim(85,52);
            }
        }
        
    } else if (keys[87]){ // Laser beam
        if(!attacking){
            attacking = true;
            combo=1;
        }
        if(right){
            if(combo <= 3){
                img.setAttribute("src","images/blossom/brace-right.gif");
                //setdim(49,60);
                combo += 1;
            } else if (combo === 4) {
                laser.exists=true;
                laser.setPosition(particle.x+img.width*(.7),particle.y+15);
                laser.setRight();
                laser.setImage("images/blossom/laser.gif");
                combo += 1;
            };
        } else {
            if(combo <= 3){
                img.setAttribute("src","images/blossom/brace-left.gif");
                //setdim(49,60);
                combo +=1;
            } else if (combo === 4) {
                laser.exists=true;
                laser.setPosition(particle.x-img.width*(.9),particle.y+15);
                laser.setLeft();
                laser.setImage("images/blossom/laser.gif");
                combo += 1;
            }
        };
    } else {
        moving = false;
        attacking = false;
        particle.ax = 0;
        combo=1;
        if(flying){
            if(right && particle.vy >= 0){
                img.setAttribute("src","images/blossom/falling-right.gif");
                //setdim(43,59);
            } else if(right && particle.vy < 0){
                img.setAttribute("src","images/blossom/fly-neutral-right.gif");
                //setdim(46,75);
            } else if(left && particle.vy >= 0){
                img.setAttribute("src","images/blossom/falling-left.gif");
                //setdim(43,59);
            } else if(left && particle.vy < 0){
                img.setAttribute("src","images/blossom/fly-neutral-left.gif");
                //setdim(46,75);
            }
        } else {
            if(right){
                img.setAttribute("src","images/blossom/neutral-right.gif");
                //setdim(43,58);
            } else {
                img.setAttribute("src","images/blossom/neutral-left.gif");
                //setdim(43,58);
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

// Particle object
var particle = {
    x: canvas.width/4,
    y: canvas.height - 65,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 150,
    color: "red",
    draw: function() {
        ctx.drawImage(img,this.x,this.y);
    },
    update: function() {
        
        if(!attacking){
            this.vx += this.ax / FPS;
            this.vy += this.ay / FPS;
            this.x += this.vx / FPS;
            this.y += this.vy / FPS;
        };
        
        if(this.y < (canvas.height - 65 - img.height*1.5)){
            flying = true;
        } else {
            flying = false;
        };
        
        
        // Collision detection
        if ( this.x  < -100) {
            this.x = canvas.width;
            this.vx = this.vx/2;
        };
        if ( this.x > canvas.width) {
            this.x = -img.width;
            this.vx = this.vx/2;
        };
        if ( this.y <= 0 ) {
            this.y = 0;
            this.vy = 0;
        };
        if ( this.y > (canvas.height - 65) - img.height ) {
            this.y = canvas.height - 65 - img.height;
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
   if(fireball.exists){
        fireball.draw();
    };
    if(laser.exists){
        laser.draw();
    };
    if(protoman.getPlasmaBall().exists){
        protoman.getPlasmaBall().draw();
    };
    
    protoman.draw();
}

// Game loop update function
function update() {
    particle.update();
    if(fireball.exists){
        fireball.update();
    };
    if(laser.exists){
        laser.update();
    };
    if(protoman.getPlasmaBall().exists){
        protoman.getPlasmaBall().update();
    };
    
    protoman.update();

}

function tick() {
    draw();
    update();
}

setInterval( tick, 1000 / FPS );