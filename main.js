
/**
* @projectDescription   Canvas Particles Test
*
* @author   Diego Vilariño - http://www.dieg0v.com - @dieg0v - http://www.sond3.com
* @version  0.1
*/

var MAX_PARTICLES = 500;
var NOW_PARTICLES = 50;
var COLOR = "#ffae23";
var TYPE_PARTICLE = "circle";
var POSITION = "center";
var RANDOM_COLOR = 0;
var VELOCITY = 2;
var MAX_VELOCITY = 20;
var BACK_COLOR= '#333333';
var MAX_SIZE = 20;
var MAX_STROKE_SIZE = 10;
var STROKE_SIZE = 0;
var STROKE_COLOR = '#ffffff';
var OPACITY = 1;
var RANDOM_SIZE = 1;
var PARTICLE_SIZE = 5;
var DEAD_PARTICLE = 1;
var SHADOW_BLUR = 0;

var mousePosX = window.innerWidth/2;
var mousePosY = window.innerHeight/2;
var stats;
var canvas;
var c;
var particleArray = [];


var ParticleGUI = function() {
  this.particles = NOW_PARTICLES;
  this.color = COLOR;
  this.type = TYPE_PARTICLE;
  this.position = POSITION;
  this.random_color = RANDOM_COLOR;
  this.velocity = VELOCITY;
  this.backcolor = BACK_COLOR;
  this.stroke_size = STROKE_SIZE;
  this.stroke_color = STROKE_COLOR;
  this.opacity =  OPACITY;
  this.size = PARTICLE_SIZE;
  this.random_size = RANDOM_SIZE;
  this.particle_dead = DEAD_PARTICLE;
  this.shadow_blur = SHADOW_BLUR;
  this.Export = function() {
    generate(1);
  };
  this.Preview = function() {
    generate(0);
  };
};

function generate(type){
  postwith('export.php',{
       TYPE:type,
       MAX_PARTICLES:MAX_PARTICLES,
       NOW_PARTICLES:NOW_PARTICLES,
       COLOR:COLOR,
       TYPE_PARTICLE:TYPE_PARTICLE,
       POSITION:POSITION,
       RANDOM_COLOR:RANDOM_COLOR,
       VELOCITY:VELOCITY,
       BACK_COLOR:BACK_COLOR,
       MAX_SIZE:MAX_SIZE,
       STROKE_SIZE:STROKE_SIZE,
       STROKE_COLOR:STROKE_COLOR,
       OPACITY:OPACITY,
       RANDOM_SIZE:RANDOM_SIZE,
       PARTICLE_SIZE:PARTICLE_SIZE,
       DEAD_PARTICLE:DEAD_PARTICLE,
       SHADOW_BLUR:SHADOW_BLUR
    });
}

window.onload = function() {
  var text = new ParticleGUI();
  var gui = new dat.GUI();
  var controller_particules = gui.add(text, 'particles', 1, MAX_PARTICLES);
  controller_particules.onFinishChange(function(value) {
      NOW_PARTICLES = Math.round(value);
  });
  var controller_color = gui.addColor(text, 'color', COLOR);
  controller_color.onChange(function(value){
       COLOR = value;
  });
  var controller_color_rand = gui.add(text, 'random_color', { OFF: 0, ON: 1 } );
  controller_color_rand.onChange(function(value){
       RANDOM_COLOR = value;
  });
  var controller_type = gui.add(text, 'type', { Rect: 'rect', Circle: 'circle', Triangle:'triangle'} );
  controller_type.onChange(function(value){
       TYPE_PARTICLE = value;
  });
  var controller_position = gui.add(text, 'position', { Mouse: 'mouse', Center: 'center', Random: 'random'} );
  controller_position.onChange(function(value){
       POSITION = value;
  });
  var controller_velocity = gui.add(text, 'velocity', 1, MAX_VELOCITY);
  controller_velocity.onFinishChange(function(value) {
      VELOCITY = Math.round(value);
  });
  var controller_back_color = gui.addColor(text, 'backcolor', BACK_COLOR);
  controller_back_color.onChange(function(value){
       BACK_COLOR = value;
  });
  var controller_size_rand = gui.add(text, 'random_size', { OFF: 0, ON: 1 } );
  controller_size_rand.onChange(function(value){
       RANDOM_SIZE = value;
  });
  var controller_size = gui.add(text, 'size', 1, MAX_SIZE);
  controller_size.onFinishChange(function(value) {
      PARTICLE_SIZE = Math.round(value);
  });
  var controller_stroke_size = gui.add(text, 'stroke_size', 0, MAX_STROKE_SIZE);
  controller_stroke_size.onFinishChange(function(value) {
      STROKE_SIZE = Math.round(value);
  });
  var controller_stroke_color = gui.addColor(text, 'stroke_color', STROKE_COLOR);
  controller_stroke_color.onChange(function(value){
       STROKE_COLOR = value;
  });
  var controller_opacity = gui.add(text, 'opacity', 0, 1);
  controller_opacity.onFinishChange(function(value) {
      OPACITY = value;
  });
  var controller_dead_particle = gui.add(text, 'particle_dead', { OFF: 0, ON: 1 } );
  controller_dead_particle.onChange(function(value){
       DEAD_PARTICLE = value;
  });
  var controller_shadow_blur = gui.add(text, 'shadow_blur', 0,10);
  controller_shadow_blur.onFinishChange(function(value) {
      SHADOW_BLUR = Math.round(value);
  });

  gui.add(text, 'Preview');
  gui.add(text, 'Export');

  init();

};

$(window).resize(function(){
  var canvas = document.getElementById('canvas');
  canvas.width=window.innerWidth;
  canvas.height = window.innerHeight;
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.top - root.scrollTop;
  var mouseY = evt.clientY - rect.left - root.scrollLeft;
  return {
      x: mouseX,
      y: mouseY
  };
}

function createParticle(){

  var particle = {};

  switch (POSITION){
  case 'mouse':
    particle.x = mousePosX;
    particle.y = mousePosY;
    break;
  case 'center':
    particle.x = window.innerWidth/2;
    particle.y = window.innerHeight/2;
    break;
  case 'random':
    particle.x = randomRange(0,window.innerWidth);
    particle.y = randomRange(0,window.innerHeight);
    break;
  }

  particle.xSpeed = randomRange( (-1) * VELOCITY , VELOCITY);
  particle.ySpeed = randomRange( (-1) * VELOCITY , VELOCITY);

  var size;
  if(RANDOM_SIZE==1){
    size = randomRange(1,MAX_SIZE);
  }else{
    size = PARTICLE_SIZE;
  }
  particle.size  = size;

  return particle;
}

function init(){

    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '150px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );

    canvas = document.getElementById("canvas");
    c = canvas.getContext("2d");
    c.canvas.width  = window.innerWidth;
    c.canvas.height = window.innerHeight;

    canvas.addEventListener('mousemove', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      mousePosX = mousePos.x;
      mousePosY = mousePos.y;
    }, false);

    generateParticles();
    animate();
}

function generateParticles(){
  for (var i = 0; i < MAX_PARTICLES; i++) {
        particleArray.push(createParticle());
    }
}

function draw(){

  c.clearRect(0,0,window.innerWidth,window.innerHeight);
  c.fillStyle = BACK_COLOR;
  c.fillRect(0,0,window.innerWidth,window.innerHeight);

  for(var i=0; i<NOW_PARTICLES;i++){

      var particle = particleArray[i];

      var particle_color = COLOR;
      if(RANDOM_COLOR==1){
        var r = Math.random()*255>>0;
        var g = Math.random()*255>>0;
        var b = Math.random()*255>>0;
        particle_color = "rgba("+r+", "+g+", "+b+", "+OPACITY+")";
      }else{
        particle_color = "rgba("+hexToR(particle_color)+", "+hexToG(particle_color)+", "+hexToB(particle_color)+", "+OPACITY+")";
      }

      c.beginPath();

      c.lineWidth = STROKE_SIZE;
      c.fillStyle = particle_color;

      if(SHADOW_BLUR>0){
        c.shadowBlur = SHADOW_BLUR;
        c.shadowOffsetX = 1;
        c.shadowOffsetY = 1;
        c.shadowColor = "rgba(100, 100, 100, 1)";
      }else{
        c.shadowBlur = null;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.shadowColor = "rgba(100, 100, 100, 0)";
      }

      var particle_stroke_color = "rgba("+hexToR(STROKE_COLOR)+", "+hexToG(STROKE_COLOR)+", "+hexToB(STROKE_COLOR)+", "+OPACITY+")";
      c.strokeStyle = particle_stroke_color;

      switch (TYPE_PARTICLE){
        case 'rect':
          c.fillRect(particle.x, particle.y, particle.size, particle.size);
          if(STROKE_SIZE>0){
            c.strokeRect(particle.x, particle.y, particle.size, particle.size);
          }
          break;
        case 'circle':
          var radius = particle.size/2;
          c.arc(particle.x, particle.y, radius, 0, 2 * Math.PI, false);
          c.fill();
          if(STROKE_SIZE>0){
            c.stroke();
          }
          break;
        case 'triangle':
          c.moveTo(particle.x, particle.y);
          c.lineTo(particle.x + (particle.size*2) , particle.y);
          c.lineTo(particle.x + particle.size , particle.y - particle.size);
          c.lineTo(particle.x, particle.y);
          c.fill();
          if(STROKE_SIZE>0){
            c.stroke();
          }
          break;
        }

      c.closePath();

      particle.x = particle.x + particle.xSpeed;
      particle.y = particle.y + particle.ySpeed;

      if(DEAD_PARTICLE==1){
        particle.size = particle.size * (0.9 + (randomRange(1,10)/100));
        if(particle.size<=0.25){
            particleArray[i] = createParticle();
        }
      }else{
        if(particle.x < -(particle.size) ||
           particle.y < -(particle.size) ||
           particle.x > window.innerWidth+particle.size ||
           particle.y > window.innerHeight+particle.size){
            particleArray[i] = createParticle();
        }

      }
  }
}

function animate(){
    requestAnimationFrame(animate);
    stats.begin();
    draw();
    stats.end();
}
