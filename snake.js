//Puxando o canvas do HTML para ser desenhado no JS
var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");

setInterval(jogo, 60);  //fazendo o js rodar constantemente
document.addEventListener("keydown",start); //para usar teclas na function start

var vmx = 0;    //variável de movimento eixo X
var vmy = 0;    //variável de movimento eixo X

var snakex = 200;   //variável eixo X da cabeça da cobra
var snakey = 200;   //variável eixo Y da cabeça da cobra
var tam = 10;   //variável tamanho da cobra
var rabo = 0;   //variável tamanho do rabo

var aux = [200];    //array para marca os valores anteriores de X da cobra
var aux2 = [200];   //array para marca os valores anteriores de Y da cobra

//variáveis para randomizar a posição da fruta (gambiarra, mas funciona perfeitamente)
var random=[0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380];
var r = 2;

var score=0;
var scoremax=0;

var frutax = 20;    //posição no eixo X da fruta
var frutay = 20;    //posição no eixo Y da fruta

//configurando as teclas
function start(event){
    switch (event.keyCode) {
        case 37:  //esquerda
            if(vmx==10 && vmy==0){
                break;
            }
            else{
                vmx=-10;
                vmy=0;
                break;
            }
        case 38:  //cima
            if(vmx==0 && vmy==10){
                break;
            }
            else{
                vmx=0;
                vmy=-10;
                break;
            }
        case 39:  //direita
            if(vmx==-10 && vmy==0){
                break;
            }
            else{
                vmx=10;
                vmy=0;
                break;
            }
        case 40:  //baixo
            if(vmx==0 && vmy==-10){
                break;
            }
            else{
                vmx=0;
                vmy=10;
                break;
            }
        default:
            break;
    }
}

function jogo(){

    ctx.clearRect(0,0,400,400); //limpando tudo do canvas
    ctx.fillStyle = "#B22222";
    for (var i=rabo;i>0;i--){   //for que desenha o rabo a partir da primeira fruta
        aux[i]= aux[i-1];   //troca o valor do numeros do array, eliminando o ultimo pedaço do rabo
        aux2[i]=aux2[i-1];
        ctx.fillRect(aux[i],aux2[i],tam,tam); //desenha a partir do segundo pedaço do rabo

    }
    //recebe os valores antigo da cobra
    aux[0]=snakex;
    aux2[0]=snakey;
    ctx.fillRect(aux[0],aux2[0],tam,tam);   //desenha a ultima posição da cobra
    
    //muda a posição da cabeça da cobra
    snakex += vmx;
    snakey += vmy;

    //determina se a cabeça encostou no rabo e reinicia o jogo, gravando o score
    for(var k=rabo;k>0;k--){
        if(aux[k]==snakex && aux2[k]==snakey){
            snakex=200;
            snakey=200;
            rabo=0;
            if(scoremax<score){
                scoremax=score;
            }
            score=0;
        }
    }

    //desenha a fruta
    ctx.fillStyle = "blue";
    ctx.fillRect(frutax,frutay,tam,tam);

    //desenha a cabeça da cobra
    ctx.fillStyle = "#8B0000";
    ctx.fillRect(snakex,snakey,tam,tam);

    //se acerta a fruta, muda ela de posição, aumenta o rabo e o score
    if(frutax==snakex&&frutay==snakey){ 
        r = Math.floor(Math.random()*39);
        frutax = random[r];
        r = Math.floor(Math.random()*39);
        frutay = random[r];
        rabo++;
        score++;
    }

    //se a cobra chegar nas extremidades do quadrado, movimenta a cobra para o lado oposto
    if(snakex < 0){
        snakex = 390;
    }
    if(snakex > 390){
        snakex = -10;
    }
    if(snakey < 0){
        snakey = 390;
    }
    if(snakey > 390){
        snakey = -10;
    }

    //score
    var passwd = document.querySelector("h1");
    passwd.textContent = "Score: "+score;
    //score máximo
    var caiolr = document.querySelector("h2");
    caiolr.textContent = "Score Máximo: "+scoremax;
}
