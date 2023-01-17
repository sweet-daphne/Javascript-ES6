const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const img2 = new Image();
img2.src = 'dinosaur.png';

const dino = {
  x : 10,
  y : 200,
  width : 50,
  height : 50,
  draw(){
    ctx.fillStyle = 'green';
    //ctx.fillRect(this.x,this.y, this.width,this.height);
    ctx.drawImage(img2, this.x, this.y);
  }
}

const img1 = new Image();
img1.src = 'cactus.png';

class Cactus {
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    ctx.fillStyle = 'red';
    //ctx.fillRect(this.x,this.y, this.width,this.height);
    ctx.drawImage(img1, this.x, this.y)
  }
}

let timer = 0;
let cactusArray = [];
let jumpTimer = 0;
let jumpSwitch = false;
let animation;

function frameExe(){
  animation = requestAnimationFrame(frameExe);
  timer++;
  
  ctx.clearRect(0,0,canvas.width, canvas.height);
  
  if(timer % 200 === 0){
    let cactus = new Cactus();
    cactusArray.push(cactus);
  }
    
  cactusArray.forEach((enermy,i,o)=>{
    //x좌표가 0미만이면 제거
    if(enermy.x < 0){
      o.splice(i, 1);
    }
    enermy.x--;
    collsionCheck(dino, enermy);
    enermy.draw();
  });

  if(jumpSwitch == true){
    dino.y--;
    jumpTimer++;
  }

  if(jumpSwitch == false){
    if(dino.y < 200){
      dino.y++;
    }
  }

  if(jumpTimer > 100){
    jumpSwitch = false;
    jumpTimer = 0;
  }

  dino.draw();
}

frameExe();

// 충돌확인

function collsionCheck(dino, cactus){
  let xDiff = cactus.x - (dino.x + dino.width);
  let yDiff = cactus.y - (dino.y + dino.height);
  if(xDiff < 0 && yDiff < 0){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

document.addEventListener('keydown',function(e){
  if(e.code == 'Space'){
    jumpSwitch = true;
  }
})