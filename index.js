function startGame() {
  let matrix = new Array(4);

  for (let i = 0; i < matrix.length; i++) {
    let asd = 0;
    matrix[i] = new Array(asd, asd, asd, asd);
  }

  let firstCoordinates = generateRandomCoordinates(matrix);
  let secondCoordinates = generateRandomCoordinates(matrix);
  setCellValue(matrix, firstCoordinates);
  fillInitialValues(matrix, secondCoordinates);

  function fillInitialValues(matrix, secondCoordinates) {
    if (isEmpty(matrix, secondCoordinates)) {
      setCellValue(matrix, secondCoordinates, 2);
      return;
    }
    secondCoordinates = generateRandomCoordinates(matrix);
    return fillInitialValues(matrix, secondCoordinates);
  };
  return matrix;
}

let matrix = startGame();

function setCellValue(matrix, coordinates) {
  matrix[coordinates[0]][coordinates[1]] = 2;
}

function findAllEmptySpaces(matrix) {
  let arr = [];
  for (let i = 0; i < matrix[0].length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 0) arr.push([i, j]);
    }
  }
  return arr;
}

function addNewValue(matrix) {
  let coordinates = generateRandomCoordinates(matrix);
  if (coordinates.length === 0) return;
  else matrix[coordinates[0]][coordinates[1]] = 2;
}

function generateRandomCoordinates(matrix) {
  let arr = findAllEmptySpaces(matrix);
  if (arr.length === 0) return [];
  let output = Math.floor(Math.random() * arr.length);
  return arr[output];
}

function isEmpty(matrix, [firstRandom, secondRandom]) {
  if (matrix[firstRandom][secondRandom] === 0) return true;
  return false;
}


function moveRight(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let row = [];
    for (let j = matrix[i].length - 1; j >= 0; j--) {
      if (!isEmpty(matrix, [i, j])) {
        if (row.length > 0 && row[0] === matrix[i][j]) {
          row[0] *= 2;
          row.unshift(0);
        } else if (row.length > 0 && row[0] === 0) row[0] = matrix[i][j];
        else row.unshift(matrix[i][j]);
      }
    }
    let newArr = new Array(matrix[i].length - row.length).fill(0);
    newArr = newArr.concat(row);
    matrix[i] = newArr.slice();
  }
}

function moveLeft(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let row = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (!isEmpty(matrix, [i, j])) {
        if (row.length > 0 && row[row.length - 1] === matrix[i][j]) {
          row[row.length - 1] *= 2;
          row.push(0);
        } else if (row.length > 0 && row[row.length - 1] === 0) row[row.length - 1] = matrix[i][j];
        else row.push(matrix[i][j]);
      }
    }
    let newArr = new Array(matrix[i].length - row.length).fill(0);
    newArr = row.concat(newArr);
    matrix[i] = newArr.slice();
  }
}

function moveDown(matrix) {
  for (let i = 0; i < matrix[0].length; i++) {
    let col = [];
    for (let j = matrix.length - 1; j >= 0; j--) {
      if (!isEmpty(matrix, [j, i])) { // Не е ли празна ли е кутийката?
        if (col.length > 0 && col[0] === matrix[j][i]) {
          col[0] *= 2;
          col.unshift(0);
        } else if (col.length > 0 && col[0] === 0) col[0] = matrix[j][i];
        else col.unshift(matrix[j][i]);
      }
    }
    let newArr = new Array(matrix.length - col.length).fill(0);
    newArr = newArr.concat(col);
    for (let l = 0; l < matrix.length; l++) {
      matrix[l][i] = newArr[l];
    }
  }
}

function moveUp(matrix) {
  for (let i = 0; i < matrix[0].length; i++) {
    let col = [];
    for (let j = 0; j < matrix.length; j++) {
      if (!isEmpty(matrix, [j, i])) {
        if (col.length > 0 && col[col.length - 1] === matrix[j][i]) {
          col[col.length - 1] *= 2;
          col.push(0);
        } else if (col.length > 0 && col[col.length - 1] === 0) col[col.length - 1] = matrix[j][i];
        else col.push(matrix[j][i]);
      }
    }
    let newArr = new Array(matrix.length - col.length).fill(0);
    newArr = col.concat(newArr);
    for (let l = 0; l < matrix.length; l++) {
      matrix[l][i] = newArr[l];
    }
  }
}

document.body.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 37: {
      moveLeft(matrix);
      addNewValue(matrix);
      printGameBoard(container, matrix);
    }
      break;
    case 38: {
      moveUp(matrix);
      addNewValue(matrix);
      printGameBoard(container, matrix);
    }
      break;
    case 39: {
      moveRight(matrix);
      addNewValue(matrix);
      printGameBoard(container, matrix);
    }
      break;
    case 40: {
      moveDown(matrix);
      addNewValue(matrix);
      printGameBoard(container, matrix);
    }
      break;
    default: break;
  }
});

document.addEventListener('keyup', e => {
  if(!Array.from(document.body.querySelectorAll('#container div')).find(el => el.innerText === '')) {
    isTheGameOver(matrix) ? window.alert('Game Over') : console.log('prodyljavai');
  }
});

document.addEventListener('keydown', e => {
  Array.from(document.body.querySelectorAll('#container div')).forEach(el => {
    switch(el.innerHTML) {
      case '2': {
        el.style.backgroundColor = 'rgb(92,112,123)'
      }
      break;
      case '4': {
        el.style.backgroundColor = 'rgb(66,181,166)'
      }
      break;
      case '8': {
        el.style.backgroundColor = 'rgba(157,96,15,0.5)'
      }
      break;
      case '16': {
        el.style.backgroundColor = 'rgb(185,44,146)'
      }
      break;
      case '32': {
        el.style.backgroundColor = 'rgb(255,210,3)'
      }
      break;
      case '64': {
        el.style.backgroundColor = 'rgb(1,135,82)'
      }
      break;
      case '128': {
        el.style.backgroundColor = 'rgb(1,90,86)'
      }
      break;
      case '256': {
        el.style.backgroundColor = 'strawberry'
      }
      break;
      case '512': {
        el.style.backgroundColor = 'orange'
      }
      break;
      case '1024': {
        el.style.backgroundColor = 'green'
      }
      break;
      case '2048': {
        el.style.backgroundColor = 'red'
      }
      break;
      default: el.style.backgroundColor = 'white'
    }
    console.log(el.innerHTML)
  })
})

let container = document.createElement('div');
container.id = 'container';
document.body.append(container);
let gameBoard = document.getElementById('container');

for(let i = 0; i < 16; i++) {
  let div = document.createElement('div');
  container.append(div);
}

printGameBoard(container, matrix);

function printGameBoard(container, matrix) {
  let newValues = container.children;
  for(let i = 0; i < matrix[0].length; i++) {
    for(let j = 0; j < matrix.length; j++) {
      newValues[i*(matrix[0].length) + j].innerText = matrix[i][j] ? matrix[i][j] : '' ;
    }
  }
}

function isTheGameOver(matrix) {
  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix[i].length; j++) {
      if(j < matrix[i].length - 1 && matrix[i][j] === matrix[i][j + 1]) return false;
      if(j < matrix.length - 1 && matrix[j][i] === matrix[j + 1][i]) return false;
    }
  }
  return true;
}
