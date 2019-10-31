function game() {
  // console.log('hello')
  const pacmanBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 5, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]


  //---------BOARD CREATION----------------
  const board = []
  const grid = document.querySelector('.grid')
  // Assigns the cells on creation different class's
  function assignCellClass(inele, cell) {
    switch (inele) {
      case 0: cell.classList.add('wall'); break
      case 1: {
        cell.classList.add('fruit')
        cell.innerHTML = '-'
      } break
      case 2: cell.classList.add('empty'); break
      case 3: cell.classList.add('ghost'); break
      case 4: cell.classList.add('pill'); break
      case 5: cell.classList.add('pacman'); break
    }
  }
  // Creates the actualy board from array. Does each Row, then elements in that row
  function createBoard() {
    pacmanBoard.forEach((ele, i) => {
      const row = document.createElement('div')
      const rows = []
      row.classList.add(`row${i}`)
      grid.appendChild(row)
      // console.log(row)
      ele.forEach((inele) => {
        const cell = document.createElement('div')
        assignCellClass(inele, cell)
        row.appendChild(cell)
        // console.log(cell)
        rows.push(cell)
      })
      board.push(rows)
    })
  }
  createBoard()
  // console.log(board)
  // ----------PACMAN---------------

  // Basic movement, create function for move left, right etc.
  const scoreDisplay = document.querySelector('.score')
  const lifeDisplay = document.querySelector('.life')
  let pacmanRow = 12
  let pacmanCell = 9
  let score = 0
  let life = 3

  // move left function
  function pacmanLeft(cellMove, rowMove) {
    if (board[rowMove][cellMove].classList.value === 'wall') {
      return
    } else if (board[rowMove][cellMove].classList.value === 'fruit') {
      board[pacmanRow][pacmanCell].classList.remove('pacman')
      board[pacmanRow][pacmanCell].classList.add('empty')
      board[rowMove][cellMove].classList.remove('fruit')
      board[rowMove][cellMove].innerHTML = ''
      pacmanCell = cellMove
      pacmanRow = rowMove
      board[rowMove][pacmanCell].classList.add('pacman')
      score++
      console.log(score)
      console.log('test')
    } else if (board[rowMove][cellMove].classList.value === 'empty') {
      board[pacmanRow][pacmanCell].classList.remove('pacman')
      board[rowMove][cellMove].classList.remove('empty')
      board[pacmanRow][pacmanCell].classList.add('empty')
      pacmanCell = cellMove
      pacmanRow = rowMove
      board[rowMove][pacmanCell].classList.add('pacman')
    } else if (board[rowMove][cellMove].classList.value === 'pill') {
      board[pacmanRow][pacmanCell].classList.remove('pacman')
      board[rowMove][cellMove].classList.remove('pill')
      board[pacmanRow][pacmanCell].classList.add('empty')
      pacmanCell = cellMove
      pacmanRow = rowMove
      board[rowMove][pacmanCell].classList.add('pacman')
      score = score + 10
      console.log(score)
      // Add a new class that makes it FLASH
    } else if (board[rowMove][cellMove].classList.value === 'ghost') {
      board[pacmanRow][pacmanCell].classList.remove('pacman')
      board[pacmanRow][pacmanCell].classList.add('empty')
      pacmanCell = 9
      pacmanRow = 12
      board[pacmanRow][pacmanCell].classList.add('pacman')
      life = life - 1
      console.log(life)
      // Add something that ends the game
    }
   
  }

  document.addEventListener('keyup', (e) => {
    console.log(e.key)
    // console.log(board[pacmanRow][pacmanCell - 1].classList)
    if (e.key === 'a') {
      if (pacmanCell === 0) {
        let cellMove = 18
        let rowMove = pacmanRow
        pacmanLeft(cellMove, rowMove)
      } else {
        let cellMove = pacmanCell - 1
        let rowMove = pacmanRow
        pacmanLeft(cellMove, rowMove)
      }
    } else if (e.key === 'd') {
      if (pacmanCell === 18) {
        let cellMove = 0
        let rowMove = pacmanRow
        pacmanLeft(cellMove, rowMove)
      } else {
        let cellMove = pacmanCell + 1
        let rowMove = pacmanRow
        pacmanLeft(cellMove, rowMove)
      }
    } else if (e.key === 'w') {
      let cellMove = pacmanCell
      let rowMove = pacmanRow - 1
      pacmanLeft(cellMove, rowMove)
    } else if (e.key === 's') {
      let cellMove = pacmanCell
      let rowMove = pacmanRow + 1
      pacmanLeft(cellMove, rowMove)
    }
    scoreDisplay.innerHTML = `Your Score is : ${score}`
    lifeDisplay.innerHTML = `Number of lives : ${life}`
  })


  // some Basic logic for left A




  // console.log(pacmanBoard.length)
  // console.log(pacmanBoard[1].length)




















}
window.addEventListener('DOMContentLoaded', game)