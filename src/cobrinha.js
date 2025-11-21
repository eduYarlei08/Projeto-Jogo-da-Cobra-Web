var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//variáveis de som
//O som foi criado por D.S.G., lançado na plataforma FreeSound (Nome do som: Pop 4)
var pop = new Audio();
pop.src = "../assets/pop.mp3"

//O som foi criado por um usuário com a conta deletada, lançado na plataforma FreeSound (Nome do som: Game_over)
var gameover = new Audio();
gameover.src = "../assets/gameover.mp3"

var box = 20;
var cobra = [];
cobra[0] = 
{
    x: 10 * box,
    y: 10 * box
}

var comida = 
{
    x: Math.floor(Math.random()*29+1) * box,
    y: Math.floor(Math.random()*29+1) * box
}

var pontos = 0;

var d;

document.addEventListener("keydown", direcao);

function direcao(event)
{
    var key = event.keyCode;
    if(key == 37 && d != "DIREITA")
    {
        d = "ESQUERDA";
    } else if (key == 38 && d != "BAIXO")
    {
        d = "CIMA";
    } else if (key == 39 && d != "ESQUERDA")
    {
        d = "DIREITA";
    } else if (key == 40 && d != "CIMA")
    {
        d = "BAIXO";
    } 
}

function collision(cabeca, array)
{
    for(i = 1; i < array.length; i++)
    {
        if(cabeca.x == array[i].x && cabeca.y == array[i].y)
        {
            return true;
        }
    }
    return false;
}

function draw()
{
    ctx.fillStyle = "#dbdbdb";
    ctx.fillRect(0, 20, cvs.width, cvs.height - 20);

    for(i = 0; i < cobra.length; i++)
    {
        ctx.fillStyle = (i == 0)? "#45ba49ff" : "#1b6738ff";
        ctx.fillRect(cobra[i].x, cobra[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(cobra[i].x, cobra[i].y, box, box);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(comida.x, comida.y, box, box);

    var cobraX = cobra[0].x;
    var cobraY = cobra[0].y;

    if (d == "ESQUERDA") cobraX -= box;
    if (d == "DIREITA") cobraX += box;
    if (d == "CIMA") cobraY -= box;
    if (d == "BAIXO") cobraY += box;

    var novaCabeca =
    {
        x: cobraX, 
        y: cobraY
    }

    
    if(cobraX < 0 || cobraX > cvs.width-box || cobraY < 20 || cobraY > cvs.height-box || collision(novaCabeca, cobra))
    {
        clearInterval(game);
        gameover.play();
        var recorde = localStorage.getItem("pontuacaoCobra");
        gravaRecorde();
    }

     if(cobraX == comida.x && cobraY == comida.y)
    {
        comida = 
        {
            x: Math.floor(Math.random()*29+1) * 20,
            y: Math.floor(Math.random()*29+1) * 20
        }
        pop.play();
        somaPonto();
    } 
    else 
    {
        cobra.pop();
    }

    cobra.unshift(novaCabeca);    
}

function somaPonto()
{
    pontos++;
    mostrarPontos();
}

function gravaRecorde()
{
    var recorde = 0;
    if(localStorage.getItem("pontuacaoCobra") != null)
    {
        recorde = parseInt(localStorage.getItem("pontuacaoCobra"));
        if (recorde < pontos)
        {
            recorde = pontos;
        }
    } 
    else 
    {
        recorde = pontos;
    }

    localStorage.setItem("pontuacaoCobra", recorde);
    mostrarRecorde();
}

function mostrarRecorde()
{
    ctx.clearRect(cvs.width -250, 0, cvs.width, 20);
    var recorde = 0;
    ctx.fillStyle = "#0000ff";
    ctx.font="20px Arial";
    if(localStorage.getItem("pontuacaoCobra") != null)
    {
        recorde = parseInt(localStorage.getItem("pontuacaoCobra"));
    }
    ctx.fillText("Recorde: " +  recorde, cvs.width - 250, 16, 250);
}

function mostrarPontos()
{
    ctx.clearRect(0, 0, 250, 20);
    ctx.fillStyle = "#0c2f31ff";
    ctx.fillText("Pontos: " + pontos, 1, 16, 250);
}

mostrarRecorde();
mostrarPontos();

var game = setInterval(draw, 100);