// Iniciando partida
const btnStart = document.querySelector('.btn-start');
const sectionBtns = document.querySelector('.section-btn');
const currentPlayer = document.querySelector('[data-player]');
const fields = document.querySelectorAll('.field');
const boardSection = document.querySelector('.section-board');
const playersSection = document.querySelector('.section-players');
let player1;
let player2;

function initGame(event) {
  event.preventDefault();

  // coletando nome dos jogadores
  player1 = document.querySelector('input[name="name-player-1"]');
  player2 = document.querySelector('input[name="name-player-2"]');

  const alert = document.querySelector('.alert');

  if (player1.value === '' || player2.value === '') {
    alert.classList.add('active');
  } else {
    boardSection.classList.add('active');
    playersSection.classList.remove('active');
    sectionBtns.classList.add('active');
    alert.classList.remove('active');
  }

  currentPlayer.innerText = player1.value;
}

btnStart.addEventListener('click', initGame);

// jogador da vez
function initCurrentPlayer() {
  // altera para o próximo player e retorna o anterior
  const dataPlayerTurn = document.querySelector('[data-player-turn]');
  if (currentPlayer.innerText === player1.value) {
    currentPlayer.innerText = player2.value;
    dataPlayerTurn.dataset.playerTurn = 2;
    return player1;
  } else {
    currentPlayer.innerText = player1.value;
    dataPlayerTurn.dataset.playerTurn = 1;
    return player2;
  }
}

// inserindo letra no tabuleiro
function writeLetter(event) {
  const currentPlayer = initCurrentPlayer();

  const p = document.createElement('p');
  p.classList.add('letter');
  p.innerText = currentPlayer.dataset.letter;
  event.target.appendChild(p);
  event.target.removeEventListener('click', writeLetter); // remove interação de escrita
  event.target.classList.remove('clickable'); // field não mais clicável visualmente

  calculateWinner();
}

fields.forEach((field) => {
  field.addEventListener('click', writeLetter);
});

//zerar tabuleiro
const btnReset = document.querySelector('.btn-reset');

function resetBoard() {
  fields.forEach((field) => {
    field.innerText = '';
    field.addEventListener('click', writeLetter);
    field.classList.add('clickable');
  });
}

btnReset.addEventListener('click', resetBoard);

// novos jogadores
const btnNewPlayers = document.querySelector('.btn-new-players');

function changePlayers() {
  boardSection.classList.remove('active');
  playersSection.classList.add('active');
  sectionBtns.classList.remove('active');
}

btnNewPlayers.addEventListener('click', changePlayers);

// calcular vencedor
function calculateWinner() {
  const arrBoard = [];

  fields.forEach((item) => {
    arrBoard.push(item.innerText);
  });

  if (arrBoard[0] === arrBoard[1] && arrBoard[0] === arrBoard[2]) {
    return arrBoard[0];
    // return { 0: arrBoard[0], 1: arrBoard[0], 2: arrBoard[0] };
  } else if (arrBoard[3] === arrBoard[4] && arrBoard[3] === arrBoard[5]) {
    return arrBoard[3];
    // return { 3: arrBoard[3], 4: arrBoard[3], 5: arrBoard[3] };
  } else if (arrBoard[6] === arrBoard[7] && arrBoard[6] === arrBoard[8]) {
    return arrBoard[6];
    // return { 6: arrBoard[6], 7: arrBoard[6], 8: arrBoard[6] };
  } else if (arrBoard[0] === arrBoard[4] && arrBoard[0] === arrBoard[8]) {
    return arrBoard[0];
    // return { 0: arrBoard[0], 4: arrBoard[0], 8: arrBoard[0] };
  } else if (arrBoard[2] === arrBoard[4] && arrBoard[2] === arrBoard[6]) {
    return arrBoard[2];
    // return { 2: arrBoard[2], 4: arrBoard[2], 6: arrBoard[2] };
  }
}
