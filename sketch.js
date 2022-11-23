// imagens do game
let imagem1;
let imagem2;
let imagem3;

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200; 
let diametro = 19.9;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6; 

//variáveis da raquete
let xRaquete = 3;
let yRaquete = 150; 
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 587; 
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false; 
let jogando = false;
let player1venceu = false;
let player2venceu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada; 
let ponto; 

function preload(){
  ponto = loadSound("ponto.wav");
  raquetada = loadSound("raquetada.wav");
}

function setup() {
    alert('-> Pong JavaScript Developed by Marcelo Abreu');
  
  createCanvas(600, 400);
  imagem1 = loadImage('planodefundo.png');
  imagem2 = loadImage('player1venceu.png');
  imagem3 = loadImage('player2venceu.png');
}

function draw() {
   background(imagem1)
  if(!jogando && key === "z") {
    
jogando = true;
  }
  else if 
    (jogando){
  background(0,0,0);
  stroke(51);
  rect(298.5, 32, 3, 336);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente(); 
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar(); 
  marcaPonto();
  definaVencedor();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
  stroke(255);
  fill(color(79,79,79));
}
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if(xBolinha + raio > width || 
    xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
    
  }
  
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10; 
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10; 
  }
}

function verificaColisaoRaquete () {
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1; 
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar; 
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35;
    }
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(color(54,54, 54))
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(54,54,54));
  rect(410, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 430, 26); 
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1; 
    ponto.play();
  }
  if(xBolinha < 10){
    pontosDoOponente += 1; 
    ponto.play();
  }
}

function definaVencedor(){
        if (meusPontos == 11){
        player1venceu = true;
        background(imagem2);
        noLoop();
        return;
         }
      if (pontosDoOponente == 11){
        player2venceu = true;
        background(imagem3);
        noLoop();
        return;
      }
}

// Gambiarra para pausar o jogo
window.addEventListener("keydown", function(pausar){
  let key = pausar.keyCode
  if(key == 32){
    setup()
  }
})