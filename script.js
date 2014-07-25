var img_width = 50;
var img_height = 50;

var img = document.createElement("IMG");
img.setAttribute("src","images/neutral-right.gif");
var flying = false;
var moving = false;
var right = true;
var left = false;
var dist = 0;

function setRightRun(){
    img_height = 50;
    img_width = 50;
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
    img_height = 50;
    img_width = 50;
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
    img_height = 50;
    img_width = 50;
    if(left){
            img.setAttribute("src","images/neutral-left.gif");
            dist=0;
            left= false;
            right= true;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/takeoff-1-right.gif");
                img_height = 50;
                img_width = 50;
            } else if (dist === 2){
                img.setAttribute("src","images/takeoff-2-right.gif");
                img_height = 50;
                img_width = 50;
            } else if (dist >= 3){
                img.setAttribute("src","images/fly-right.gif");
                img_height = 30;
                img_width = 75;
            }
        };
};

function setLeftTakeOff(){
    img_height = 50;
    img_width = 50;
    if(right){
            img.setAttribute("src","images/neutral-left.gif");
            dist=0;
            left= true;
            right= false;
        } else {
            dist += 1;
            if(dist === 1){
                img.setAttribute("src","images/takeoff-1-left.gif");
                img_height = 50;
                img_width = 50;
            } else if (dist === 2){
                img.setAttribute("src","images/takeoff-2-left.gif");
                img_height = 50;
                img_width = 50;
            } else if (dist >= 3){
                img.setAttribute("src","images/fly-left.gif");
                img_height = 30;
                img_width = 75;
            }
        };
};

var keys = []; // Or you could call it "key"

onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keys[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
    if(keys[37] && keys[38]){ // left and up
        particle.vx += -20;
        particle.vy += -20;
        if(!flying){
            setLeftTakeOff();
        } else {
            img.setAttribute("src","images/fly-left.gif");
            img_height = 30;
            img_width = 75;
        };
        
        moving = true;
    } else if (keys[37] && keys[40]){ // left and down
        particle.vx += -20;
        particle.vy += 20
        img.setAttribute("src","images/neutral-left.gif");
        img_height = 50;
        img_width = 50;
        moving = true;
    } else if (keys[39] && keys[38]){ // right and up
        particle.vx += 20;
        particle.vy += -20;
        if(!flying){
            setRightTakeOff();
        } else {
            img.setAttribute("src","images/fly-right.gif");
            img_height = 30;
            img_width = 75;
        };
        moving = true;
    } else if (keys[39] && keys[40]){ // right and down
        particle.vx += 20;
        particle.vy += 20;
        img.setAttribute("src","images/neutral-right.gif");
        img_height = 50;
        img_width = 50;
        moving = true;
    } else if (keys[37]){ // left
        particle.vx += -20;
        if(!flying){
            setLeftRun();
        } else {
            right = false;
            left = true;
            img.setAttribute("src","images/fly-neutral-left.gif");
            img_height = 65;
            img_width = 50;
        }
        moving = true;
    } else if (keys[38]){ // up
        particle.vy += -20;
        if(right){
            img.setAttribute("src","images/fly-neutral-right.gif");
            img_height = 65;
            img_width = 50;
        } else {
            img.setAttribute("src","images/fly-neutral-left.gif");
            img_height = 65;
            img_width = 50;
        };
        moving = true;
    } else if (keys[39]){ // right
        particle.vx += 20;
        if(!flying){
            setRightRun();
        } else {
            right = true;
            left = false;
            img.setAttribute("src","images/fly-neutral-right.gif");
            img_height = 65;
            img_width = 50;
        }
        moving = true;
    } else if (keys[40]){ // down
        particle.vy += 20
        moving = true;
    } else {
        moving = false;
        if(flying){
            if(right && particle.vy >= 0){
                img.setAttribute("src","images/falling-right.gif");
                img_height = 50;
                img_width = 50;
            } else if(right && particle.vy < 0){
                img.setAttribute("src","images/fly-neutral-right.gif");
                img_height = 65;
                img_width = 50;
            } else if(left && particle.vy >= 0){
                img.setAttribute("src","images/falling-left.gif");
                img_height = 50;
                img_width = 50;
            } else if(left && particle.vy < 0){
                img.setAttribute("src","images/fly-neutral-left.gif");
                img_height = 65;
                img_width = 50;
            }
        }; 
    };  
};

// Get the canvas element
var canvas = document.getElementById( "canvas" );
// Get our 2D context for drawing
var ctx = canvas.getContext( "2d" );


// Frames-per-second
var FPS = 100;

// Particle object
var particle = {
    x: canvas.width/2,
    y: canvas.height,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 150,
    color: "red",
    draw: function() {
        ctx.drawImage(img,this.x,this.y,img_width,img_height);
    },
    update: function() {
        this.vx += this.ax / FPS;
        this.vy += this.ay / FPS;
        this.x += this.vx / FPS;
        this.y += this.vy / FPS;
        
        if(this.y < (canvas.height - img_height*1.5)){
            flying = true;
        } else {
            flying = false;
            if(!moving){
                if(right){
                    img.setAttribute("src","images/neutral-right.gif");
                    img_height = 50;
                    img_width = 50;
                } else {
                    img.setAttribute("src","images/neutral-left.gif");
                    img_height = 50;
                    img_width = 50;
                };
            };
        }
        // Collision detection
        if ( this.x  < -img_width) {
            this.x = canvas.width;
            this.vx = this.vx/2;
        }
        if ( this.x > canvas.width) {
            this.x = -img_width;
            this.vx = this.vx/2;
        }
        if ( this.y <= 0 ) {
            this.y = 0;
            this.vy = 0;
        }
        if ( this.y >= canvas.height - img_height ) {
            this.y = canvas.height - img_height;
            this.vy = -this.vy/6;
            this.vx = this.vx/1.01;
        }
    }
};

// Game loop draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particle.draw();
}

// Game loop update function
function update() {
    particle.update();
}

function tick() {
    draw();
    update();
}

setInterval( tick, 1000 / FPS );