const main = document.getElementById("main");
const placarTag = document.getElementById("placar");
const roundTag = document.getElementById("placar");
const botaoEncerrar = document.getElementById("encerrar");
const botaoJogar = document.getElementById("jogar");
let click01 = null;
let click02 = null;
let podeClicar = true;
let parEncontrados = 0;
let placar = 0;
let round = 1;
const defaultSrc = (window.location.origin + window.location.pathname + "src/img/QuestionBlock.png").replace("/Jogo.html", "/");

renderizarCartas();

botaoJogar.addEventListener("click", () => {
    window.location.assign("../../Jogo.html");
    console.log("joghar");
});

botaoEncerrar.addEventListener("click", () => {
    round = 1;
    placar = 0;
    window.location.assign("../../index.html");
});

function renderizarCartas() {
  const cartas = duplicarArrayAleatorio(personagens);
  if (main === null) return;

  for (let i = 0; i < cartas.length; i++) {
    const carta = criarCarta(cartas[i]);
    main.appendChild(carta);
  }
}

function criarCarta(personagem) {
  const carta = document.createElement("img");
  carta.id = personagem.id;
  carta.src = defaultSrc;
  carta.addEventListener("click", clickCarta);
  return carta;
}

function clickCarta(event) {
  const img = event.target;

  if (!podeClicar || img.src !== defaultSrc) return;

  const personagem = personagens.find((elemento) => elemento.id === img.id);
  img.src = personagem.src;

  if (podeClicar) {
    if (click01 === null) {
      click01 = img;
    } else {
      click02 = img;
      podeClicar = false;
      testarPar();
    }
  }
}

function testarPar() {
  if (click01 === null || click02 === null) return;

  if (click01.id === click02.id) {
    console.log("É um par");
    parEncontrados++;
    click01 = null;
    click02 = null;
    podeClicar = true;
    if(parEncontrados === 4) {
        placar+=10;
        placarTag.innerText = placar;
        round++;
        roundTag.innerText = round;
        
        setTimeout(() => {
            main.innerHTML ="";
            renderizarCartas();
            parEncontrados = 0;
        }, 500);
      
    }
  } else {
    setTimeout(() => {
      click01.src = defaultSrc;
      click02.src = defaultSrc;
      click01 = null;
      click02 = null;
      podeClicar = true;
    }, 1000);
    console.log("Não é um par");
  }
}

function duplicarArrayAleatorio(array) {
  const novoArray = array.concat(array);

  for (let i = novoArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
  }

  return novoArray;
}
