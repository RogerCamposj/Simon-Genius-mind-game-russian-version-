let order = [];         /* ordem das luzes */
let playerOrder = [];   /* ordem em que jogador pressiona os botões */
let flash;              /* tipo da variável, numero de flashes do jogo */
let turn;               /* manter contagem das rodadas  */
let good;               /* diz atravez de true ou false se o jogador esta indo bem o não */
let compTurn;           /* true ou false, mantem contagem se é a vez do pc ou do jogador*/
let intervalId;         /* roda uma função (flashes) a cada intervalo especifico em ms(milissegundos) */
let strict = false;     /*  se o botão for acionado, ocorre a insta-death */
let noise = true;       /* sons */
let on = false;         /* diz se o jogador ganhou o não */
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
/* escrito na ordem em que o jogo será jogado, acho */
strictButton.addEventListener('change', (event) => {     /* rolê do checkbox  */
    if (strictButton.checked == true) {              /* ".checked" para reagir a intereaçaõ com o checkbox*/
        strict = true;
    } else {
        strict = false;
    }
});

onButton.addEventListener('click', (event) => {    /* o "event" nã oé utilizado aqui, mas por causa do listener...só deixa o event aí blz? */
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "RUS";              /* ndicador de que está ligado (no html ele se encontra vazio) */
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clarColor();                                /* function */
        clearInterval(intervalId);                  /*  para em caso de desligar o console, não rodar o "gameTurn" (as luzes não piscarem() */
    }
});

startButton.addEventListener('click', (event) => {
    if (on || win) {
        play();
    }
});

function play() {                                   /* resetando variáveis */
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {                  /* for loop, inicia variavel, e ela se mantem até chear a 20(vigesima rodada) e ao final do loop adicionara um "i"*/
        order.push(Math.floor(Math.random() * 4) + 1);   /* numeros aleatórios entre 1 e 4 e preenche o array */
    }
    compTurn = true;                                 /* computador exibindo as luzes */

    intervalId = setInterval(gameTurn, 800);          /*  temporizador dos flashes */
}

function gameTurn() {                                  /* quando "false" o jogador não deve conseguir clicar nos botoes */
    on = false;

    if (flash == turn) {                                /*  se o numero de flashes for igual a rodada, significa que a rodada do pc terminou */
        clearInterval(intervalId);                     /*  parar os flashes */
        compTurn = false;
        clearColor();
        on = true;                                        /*  e o jogador pode voltar a clicar */
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {                    
            if (order[flash] == 1) one();                  /*  order=array, flash=numero de vezes q luz pisca, flash cujo começa em 0, então qunado o array randomiza numero entre 1 e 4 e for igual ao numero 1, ele vai rodar a função "one"  */
            if (order[flash] == 2) two(); 
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one() {                                          
    if (noise) {                                         /*  sons */
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";        /*  cores */
}

function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
}

function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
}

function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
  }

function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])  /*  PlayerOrder(".lenght -1" que se refere a ultima coisa q o jogador clicou)  não for igual a orfem real(a seguencia dita pelo pc) então "good=false" que é oq dita se o jogador esta acertando ou não */
    good = false;

  if (playerOrder.length == 20 && good) {
    winGame();
  }

 if (good == false) {                  /* em caso de erro */
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {                   /*  counter mostra o "no" e dps volta para o numero da rodada*/
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {                    /*  modo de insta-death */
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;                   /*  se o jogador errar, não róla som */
  }

  if (turn == playerOrder.length && good && !win) {      /*  se o jogador acertar, mas inda não tiver ganho o game */
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {            /*  se o jogador ganhar */
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
  let audio = document.getElementById("clipWin");
  audio.play();
}
