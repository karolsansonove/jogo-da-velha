// Iniciando partida
const btnStart = document.querySelector('.btn-start');
const sectionBtns = document.querySelector('.section-btn');
const currentPlayer = document.querySelector('[data-player]');
const fields = document.querySelectorAll('[data-letter-board]');
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

  event.target.innerText = currentPlayer.dataset.letter;
  event.target.dataset.letterBoard = currentPlayer.dataset.letter;
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
    field.parentNode.style.backgroundColor = 'transparent';
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
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner;
  winningCombination.forEach((item) => {
    const result = compareValues(
      document.querySelector(`[data-letter-position="${item[0]}"]`).innerText,
      document.querySelector(`[data-letter-position="${item[1]}"]`).innerText,
      document.querySelector(`[data-letter-position="${item[2]}"]`).innerText,
    );
    if (result) {
      winner = item;
      return;
    }
  });

  if (winner) {
    const field0 = document.querySelector(
      `[data-letter-position="${winner[0]}"]`,
    ).parentNode;
    const field1 = document.querySelector(
      `[data-letter-position="${winner[1]}"]`,
    ).parentNode;
    const field2 = document.querySelector(
      `[data-letter-position="${winner[2]}"]`,
    ).parentNode;

    field0.style.backgroundColor = 'green';
    field1.style.backgroundColor = 'green';
    field2.style.backgroundColor = 'green';
  }
}

function compareValues(value1, value2, value3) {
  return (
    ('X' === value1 && value1 === value2 && value2 === value3) ||
    ('O' === value1 && value1 === value2 && value2 === value3)
  );
}
