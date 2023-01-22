const x_class = 'x';
const o_class = 'o';
const cellele = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const resulttext = document.querySelector('[data-result-text]');
const resultshow = document.getElementById('result-text');
const restart = document.getElementById('rst');
const wincombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
let oturn;
start();
restart.addEventListener('click',start)
function start() {
  oturn = false;
  resultshow.classList.remove('show');
  cellele.forEach(cell => {

    cell.classList.remove(x_class);
    cell.classList.remove(o_class);
    cell.removeEventListener('click', checkclick);
    cell.addEventListener('click', checkclick, { once: true })
  })
  sethover();
}
function checkclick(e) {
  const cell = e.target;
  const currentclass = oturn ? o_class : x_class;
  placemark(cell, currentclass);
  if (checkwin(currentclass)) {
    endgame(false);
  }
  else if (isDraw()) {
    endgame(true);
  }
  else {
    swap();
    sethover();
  }
}
function placemark(cell, currentclass) {
  cell.classList.add(currentclass);
}
function swap() {
  oturn = !oturn;
}
function sethover() {
  board.classList.remove(x_class);
  board.classList.remove(o_class);
  if (oturn) {
    board.classList.add(o_class);
  }
  else {
    board.classList.add(x_class);
  }
}
function checkwin(currentclass) {
  return wincombo.some(combo => {
    return combo.every(index => {
      return cellele[index].classList.contains(currentclass);
    })
  })
}

function endgame(draw) {
  if (draw) {
    resulttext.innerText = `It's a Draw`
  }
  else {
    resulttext.innerText = `${oturn ? "'O'" : "'X'"} Wins`;
  }
  resultshow.classList.add('show');

}

function isDraw() {
  return [...cellele].every(cell => {
    return cell.classList.contains(x_class) || cell.classList.contains(o_class);
  })
}
