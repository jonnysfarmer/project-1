function game() {
  // This is the inital plan - ie. Level one.  With this we can change everything
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
    [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 6, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 6, 2, 2, 2],
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

  // idea for design ‘Composition C (No.III) with Red, Yellow and Blue’ – Piet Mondrian, 1935

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
      case 3: {
        cell.classList.add('ghost')
        cell.classList.add('ghostBase')
      } break
      case 4: cell.classList.add('pill'); break
      case 5: {
        cell.classList.add('pacman')
        // cell.classList.add('activate')  TESTING TO SEE IF ACTIVATE WORKS
      } break
      case 6: cell.classList.add('ghostBase'); break
    }
  }
  // Creates the actualy board from array. Does each Row, then elements in each cell 
  //Then pushes to an array Board
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
  // ----------PACMAN---------------



  // Movement variables for Pacman
  const scoreDisplay = document.querySelector('.score')
  const lifeDisplay = document.querySelector('.life')
  let pacmanRow = 12
  let pacmanCell = 9
  let score = 0
  let life = 3
  let pacIntervalID = NaN
  const speed = 250
  let ghostIntervalID = NaN

  function endGame() {
    if (life <= 0) {
      clearInterval(pacIntervalID)
      clearInterval(ghostIntervalID)
      console.log('game over')
    }
  }

  // move function - OLD, NOT INCLUDING PILL
  function pacmanMove(cellMove, rowMove, key) {
    if (pacmanCell === 0 && key === 'a') {
      cellMove = 18
    }
    if (pacmanCell === 18 && key === 'd') {
      cellMove = 0
    }
    //The above 2 basically does the issue with the run around
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
      board[rowMove][pacmanCell].classList.add('activate')
      // setTimeout(() => {
      //   board[rowMove][pacmanCell].classList.remove('activate')
      // }, 5000)
      score = score + 10
      // Add a new class that makes it FLASH
    } else if (board[rowMove][cellMove].classList.value === 'empty ghost' || board[rowMove][cellMove].classList.value === 'fruit ghost' || board[rowMove][cellMove].classList.value === 'pill ghost') {
      board[pacmanRow][pacmanCell].classList.remove('pacman')
      board[pacmanRow][pacmanCell].classList.add('empty')
      pacmanCell = 9
      pacmanRow = 12
      board[pacmanRow][pacmanCell].classList.add('pacman')
      life = life - 1
      clearInterval(pacIntervalID)
      // endGame()
      // Add something that ends the game
    }
    scoreDisplay.innerHTML = `Your Score is : ${score}`
    lifeDisplay.innerHTML = `Number of lives : ${life}`
  }

  //New move function that adds the active function for 5000 ms if it goes over a pill!
  function pacmanMoveActivate(cellMove, rowMove, key) {
    if (board[pacmanRow][pacmanCell].classList.value === 'pacman') {
      if (pacmanCell === 0 && key === 'a') {
        cellMove = 18
      }
      if (pacmanCell === 18 && key === 'd') {
        cellMove = 0
      }
      //The above 2 basically does the issue with the run around
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
        board[pacmanRow][pacmanCell].classList.add('pacman')
        board[pacmanRow][pacmanCell].classList.add('activate')
        setTimeout(() => {
          board[pacmanRow][pacmanCell].classList.remove('activate')
        }, 5000)
        console.log('active')
        score = score + 10
        // Add a new class that makes it FLASH
      } else if (board[rowMove][cellMove].classList.value === 'empty ghost' || board[rowMove][cellMove].classList.value === 'fruit ghost' || board[rowMove][cellMove].classList.value === 'pill ghost') {
        board[pacmanRow][pacmanCell].classList.remove('pacman')
        board[pacmanRow][pacmanCell].classList.add('empty')
        pacmanCell = 9
        pacmanRow = 12
        board[pacmanRow][pacmanCell].classList.add('pacman')
        life = life - 1
        clearInterval(pacIntervalID)
        // endGame()
        // Add something that ends the game
      }
    } else if (board[pacmanRow][pacmanCell].classList.value === 'pacman activate'){
      if (pacmanCell === 0 && key === 'a') {
        cellMove = 18
      }
      if (pacmanCell === 18 && key === 'd') {
        cellMove = 0
      }
      //The above 2 basically does the issue with the run around
      if (board[rowMove][cellMove].classList.value === 'wall') {
        return
      } else if (board[rowMove][cellMove].classList.value === 'fruit') {
        board[pacmanRow][pacmanCell].classList.remove('pacman')
        board[pacmanRow][pacmanCell].classList.remove('activate')
        board[pacmanRow][pacmanCell].classList.add('empty')
        board[rowMove][cellMove].classList.remove('fruit')
        board[rowMove][cellMove].innerHTML = ''
        pacmanCell = cellMove
        pacmanRow = rowMove
        board[rowMove][pacmanCell].classList.add('pacman')
        board[rowMove][pacmanCell].classList.add('activate')
        score++
      } else if (board[rowMove][cellMove].classList.value === 'empty') {
        board[pacmanRow][pacmanCell].classList.remove('pacman')
        board[pacmanRow][pacmanCell].classList.remove('activate')
        board[rowMove][cellMove].classList.remove('empty')
        board[pacmanRow][pacmanCell].classList.add('empty')
        pacmanCell = cellMove
        pacmanRow = rowMove
        board[rowMove][pacmanCell].classList.add('pacman')
        board[rowMove][pacmanCell].classList.add('activate')
      } else if (board[rowMove][cellMove].classList.value === 'pill') {
        board[pacmanRow][pacmanCell].classList.remove('pacman')
        board[pacmanRow][pacmanCell].classList.remove('activate')
        board[rowMove][cellMove].classList.remove('pill')
        board[pacmanRow][pacmanCell].classList.add('empty')
        pacmanCell = cellMove
        pacmanRow = rowMove
        board[rowMove][pacmanCell].classList.add('pacman')
        board[rowMove][pacmanCell].classList.add('activate')
        // setTimeout(() => {
        //   board[rowMove][pacmanCell].classList.remove('activate')
        // }, 500)
        score = score + 10
        // Add a new class that makes it FLASH
      } else if (board[rowMove][cellMove].classList.value === 'empty ghost' || board[rowMove][cellMove].classList.value === 'fruit ghost' || board[rowMove][cellMove].classList.value === 'pill ghost') {
        board[pacmanRow][pacmanCell].classList.remove('pacman')
        board[pacmanRow][pacmanCell].classList.remove('activate')
        board[pacmanRow][pacmanCell].classList.add('empty')
        pacmanCell = 9
        pacmanRow = 12
        board[pacmanRow][pacmanCell].classList.add('pacman')
        life = life - 1
        clearInterval(pacIntervalID)
        // endGame()
        // Add something that ends the game

    }}
    scoreDisplay.innerHTML = `Your Score is : ${score}`
    lifeDisplay.innerHTML = `Number of lives : ${life}`
  }

  // Actual movement event listenter (a,w,d,s) and referrs to function pacmanMove
  document.addEventListener('keyup', (e) => {
    if (e.key === 'a') {
      clearInterval(pacIntervalID)
      pacIntervalID = setInterval(() => {
        const key = 'a'
        const cellMove = pacmanCell - 1
        const rowMove = pacmanRow
        pacmanMoveActivate(cellMove, rowMove, key)
      }, speed)
    } else if (e.key === 'd') {
      clearInterval(pacIntervalID)
      pacIntervalID = setInterval(() => {
        const key = 'd'
        const cellMove = pacmanCell + 1
        const rowMove = pacmanRow
        pacmanMoveActivate(cellMove, rowMove, key)
      }, speed)
    } else if (e.key === 'w') {
      clearInterval(pacIntervalID)
      pacIntervalID = setInterval(() => {
        const cellMove = pacmanCell
        const rowMove = pacmanRow - 1
        pacmanMoveActivate(cellMove, rowMove)
      }, speed)
    } else if (e.key === 's') {
      clearInterval(pacIntervalID)
      pacIntervalID = setInterval(() => {
        const cellMove = pacmanCell
        const rowMove = pacmanRow + 1
        pacmanMoveActivate(cellMove, rowMove)
      }, speed)
    }
  })



  // NEXT STEPS FOR PACMAN
  //can do the smooth transition later
  // do flashing  - some sort of background thing

  // ------------GHOST

  // Do a function for one Ghost first, we can always create a loop.  We can do an
  // event listen when we start the game

  // function, if pacmanRow > Ghost row.  Then move down.  If you cant, move left, then right, then up.
  // then it checks for pacmancell > Ghost cell.  Then more right.  If not, down, up, left and so on...

  let ghost1Row = 9
  let ghost1Cell = 9
  let ghost1History = []
  //ghost array for ghost 1, 2 and 3!  They go Ghost Cell, Ghost Row, Ghost History, Nan is to clear the timers, Speed, counter, orginal location
  let ghostAray = [
    [10, 9, [10, 9], NaN, 325, 0, [10.9]],
    [10, 8, [10, 8], NaN, 350, 0, [10, 8]],
    [10, 10, [10, 10], NaN, 400, 0, [10,10]]
  ]

  // Ghost history is an array which means it can not go back on itself

  // These are 4 functions, with the first move L, R, D, U - then function if it comes across Pacman or comes accross another Ghost
  function ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele) {

    if (((board[ghostRow - 1][ghostCell].classList.value === 'empty') || (board[ghostRow - 1][ghostCell].classList.value === 'fruit') || (board[ghostRow - 1][ghostCell].classList.value === 'pill')) && ((ghostRow - 1 !== ghostHistory[0]))) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow - 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow][ghostCell - 1].classList.value === 'empty') || (board[ghostRow][ghostCell - 1].classList.value === 'fruit') || (board[ghostRow][ghostCell - 1].classList.value === 'pill')) && (ghostCell - 1 !== ghostHistory[1])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell - 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow + 1][ghostCell].classList.value === 'empty') || (board[ghostRow + 1][ghostCell].classList.value === 'fruit') || (board[ghostRow + 1][ghostCell].classList.value === 'pill')) && (ghostRow + 1 !== ghostHistory[0])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow + 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow][ghostCell + 1].classList.value === 'empty') || (board[ghostRow][ghostCell + 1].classList.value === 'fruit') || (board[ghostRow][ghostCell + 1].classList.value === 'pill')) && (ghostCell + 1 !== ghostHistory[1])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell + 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if ((board[ghostRow - 1][ghostCell].classList.value === 'pacman')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow - 1
      board[ghostRow][ghostCell].classList.remove('pacman')
      board[ghostRow][ghostCell].classList.add('ghost')
      pacmanCell = 9
      pacmanRow = 12
      board[pacmanRow][pacmanCell].classList.add('pacman')
      life = life - 1
      clearInterval(pacIntervalID)
      // endGame()
      console.log('pacman Up')
    } else if ((board[ghostRow - 1][ghostCell].classList.value === 'empty ghost' || board[ghostRow - 1][ghostCell].classList.value === 'fruit ghost' || board[ghostRow - 1][ghostCell].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow + 1
      board[ghostRow][ghostCell].classList.add('ghost')
      console.log('ghost Up - reverse!')
    } else if ((board[ghostRow][ghostCell - 1].classList.value === 'empty ghost' || board[ghostRow][ghostCell - 1].classList.value === 'fruit ghost' || board[ghostRow][ghostCell - 1].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell + 1
      board[ghostRow][ghostCell].classList.add('ghost')
      console.log('ghost left - reverse!')
    } else if ((board[ghostRow + 1][ghostCell].classList.value === 'empty ghost' || board[ghostRow + 1][ghostCell].classList.value === 'fruit ghost' || board[ghostRow + 1][ghostCell].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow - 1
      board[ghostRow][ghostCell].classList.add('ghost')
      console.log('ghost down - reverse!')
    } else if ((board[ghostRow][ghostCell + 1].classList.value === 'empty ghost' || board[ghostRow][ghostCell + 1].classList.value === 'fruit ghost' || board[ghostRow][ghostCell + 1].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell - 1
      board[ghostRow][ghostCell].classList.add('ghost')
      console.log('ghost right - reverse!')
    } else {
      console.log('fail')
    }


    ele[0] = ghostRow
    ele[1] = ghostCell
    ele[2] = ghostHistory

    // console.log([[ghostRow + 1],[ghostCell]])
  }
  function ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele) {
    if (((board[ghostRow][ghostCell - 1].classList.value === 'empty') || (board[ghostRow][ghostCell - 1].classList.value === 'fruit') || (board[ghostRow][ghostCell - 1].classList.value === 'pill')) && (ghostCell - 1 !== ghostHistory[1])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell - 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow + 1][ghostCell].classList.value === 'empty') || (board[ghostRow + 1][ghostCell].classList.value === 'fruit') || (board[ghostRow + 1][ghostCell].classList.value === 'pill')) && (ghostRow + 1 !== ghostHistory[0])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow + 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow][ghostCell + 1].classList.value === 'empty') || (board[ghostRow][ghostCell + 1].classList.value === 'fruit') || (board[ghostRow][ghostCell + 1].classList.value === 'pill')) && (ghostCell + 1 !== ghostHistory[1])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell + 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow - 1][ghostCell].classList.value === 'empty') || (board[ghostRow - 1][ghostCell].classList.value === 'fruit') || (board[ghostRow - 1][ghostCell].classList.value === 'pill')) && ((ghostRow - 1 !== ghostHistory[0]))) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow - 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if ((board[ghostRow][ghostCell - 1].classList.value === 'pacman')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell - 1
      board[ghostRow][ghostCell].classList.remove('pacman')
      board[ghostRow][ghostCell].classList.add('ghost')
      pacmanCell = 9
      pacmanRow = 12
      board[pacmanRow][pacmanCell].classList.add('pacman')
      life = life - 1
      clearInterval(pacIntervalID)
      // endGame()
      console.log('pacman to left')
    } else if ((board[ghostRow][ghostCell - 1].classList.value === 'empty ghost' || board[ghostRow][ghostCell - 1].classList.value === 'fruit ghost' || board[ghostRow][ghostCell - 1].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell + 1
      board[ghostRow][ghostCell].classList.add('ghost')
      console.log('ghost left - reverse!')
    } else if ((board[ghostRow + 1][ghostCell].classList.value === 'empty ghost' || board[ghostRow + 1][ghostCell].classList.value === 'fruit ghost' || board[ghostRow + 1][ghostCell].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow - 1
      board[ghostRow][ghostCell].classList.add('ghost')
      console.log('ghost down - reverse!')
    } else {
      console.log('fail')
    }
    ele[0] = ghostRow
    ele[1] = ghostCell
    ele[2] = ghostHistory

    // console.log([[ghostRow + 1],[ghostCell]])
  }
  function ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele) {
    if (((board[ghostRow + 1][ghostCell].classList.value === 'empty') || (board[ghostRow + 1][ghostCell].classList.value === 'fruit') || (board[ghostRow + 1][ghostCell].classList.value === 'pill')) && (ghostRow + 1 !== ghostHistory[0])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow + 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow][ghostCell + 1].classList.value === 'empty') || (board[ghostRow][ghostCell + 1].classList.value === 'fruit') || (board[ghostRow][ghostCell + 1].classList.value === 'pill')) && (ghostCell + 1 !== ghostHistory[1])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell + 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow - 1][ghostCell].classList.value === 'empty') || (board[ghostRow - 1][ghostCell].classList.value === 'fruit') || (board[ghostRow - 1][ghostCell].classList.value === 'pill')) && ((ghostRow - 1 !== ghostHistory[0]))) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow - 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow][ghostCell - 1].classList.value === 'empty') || (board[ghostRow][ghostCell - 1].classList.value === 'fruit') || (board[ghostRow][ghostCell - 1].classList.value === 'pill')) && (ghostCell - 1 !== ghostHistory[1])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell - 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if ((board[ghostRow + 1][ghostCell].classList.value === 'pacman')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow + 1
      board[ghostRow][ghostCell].classList.remove('pacman')
      board[ghostRow][ghostCell].classList.add('ghost')
      pacmanCell = 9
      pacmanRow = 12
      board[pacmanRow][pacmanCell].classList.add('pacman')
      life = life - 1
      clearInterval(pacIntervalID)
      // endGame()
      console.log('pacman down')
    } else if ((board[ghostRow + 1][ghostCell].classList.value === 'empty ghost' || board[ghostRow + 1][ghostCell].classList.value === 'fruit ghost' || board[ghostRow + 1][ghostCell].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow - 1
      board[ghostRow][ghostCell].classList.add('ghost')
      console.log('ghost down - reverse!')
    } else if ((board[ghostRow][ghostCell + 1].classList.value === 'empty ghost' || board[ghostRow][ghostCell + 1].classList.value === 'fruit ghost' || board[ghostRow][ghostCell + 1].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell - 1
      board[ghostRow][ghostCell].classList.add('ghost')
      console.log('ghost right - reverse!')
    } else {
      console.log('fail')
    }
    ele[0] = ghostRow
    ele[1] = ghostCell
    ele[2] = ghostHistory

    // console.log([[ghostRow + 1],[ghostCell]])
  }
  function ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele) {
    if (((board[ghostRow][ghostCell + 1].classList.value === 'empty') || (board[ghostRow][ghostCell + 1].classList.value === 'fruit') || (board[ghostRow][ghostCell + 1].classList.value === 'pill')) && (ghostCell + 1 !== ghostHistory[1])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell + 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow - 1][ghostCell].classList.value === 'empty') || (board[ghostRow - 1][ghostCell].classList.value === 'fruit') || (board[ghostRow - 1][ghostCell].classList.value === 'pill')) && ((ghostRow - 1 !== ghostHistory[0]))) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow - 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow][ghostCell - 1].classList.value === 'empty') || (board[ghostRow][ghostCell - 1].classList.value === 'fruit') || (board[ghostRow][ghostCell - 1].classList.value === 'pill')) && (ghostCell - 1 !== ghostHistory[1])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell - 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow + 1][ghostCell].classList.value === 'empty') || (board[ghostRow + 1][ghostCell].classList.value === 'fruit') || (board[ghostRow + 1][ghostCell].classList.value === 'pill')) && (ghostRow + 1 !== ghostHistory[0])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow + 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if ((board[ghostRow][ghostCell + 1].classList.value === 'pacman')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell + 1
      board[ghostRow][ghostCell].classList.remove('pacman')
      board[ghostRow][ghostCell].classList.add('ghost')
      pacmanCell = 9
      pacmanRow = 12
      board[pacmanRow][pacmanCell].classList.add('pacman')
      life = life - 1
      clearInterval(pacIntervalID)
      // endGame()
      console.log('pacman to right')
    } else if ((board[ghostRow][ghostCell + 1].classList.value === 'empty ghost' || board[ghostRow][ghostCell + 1].classList.value === 'fruit ghost' || board[ghostRow][ghostCell + 1].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell - 1
      board[ghostRow][ghostCell].classList.add('ghost')
      console.log('ghost right - reverse!')
    } else if ((board[ghostRow - 1][ghostCell].classList.value === 'empty ghost' || board[ghostRow - 1][ghostCell].classList.value === 'fruit ghost' || board[ghostRow - 1][ghostCell].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = ghostRow + 1
      board[ghostRow][ghostCell].classList.add('ghost')
      console.log('ghost Up - reverse!')
    } else {
      console.log('fail')
    }
    ele[0] = ghostRow
    ele[1] = ghostCell
    ele[2] = ghostHistory
  }

  // Old logic - GhostChase2 is improved and uses the loop for all of the ghosts!!!
  function ghostChase1() {
    ghostAray.forEach((ele) => {
      setInterval(() => {
        let ghostRow = ele[0]
        let ghostCell = ele[1]
        let ghostHistory = ele[2]
        let counter = 0
        if (counter % 2 === 0) {
          if (ghostRow > pacmanRow) {
            ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele)
            counter++
          } else if (ghostRow < pacmanRow) {
            ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele)
            counter++
          } else if (ghostRow === pacmanRow) {
            if (ghostCell > pacmanCell) {
              ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele)
              counter++
            } else {
              ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele)
              counter++
            }
          }
        } else {
          if (ghostCell > pacmanCell) {
            ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele)
            counter++
          } else if (ghostCell < pacmanCell) {
            ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele)
            counter++
          } else if (ghostCell === pacmanCell) {
            if (ghostRow > pacmanRow) {
              ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele)
              counter++
            } else if (ghostRow < pacmanRow) {
              ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele)
              counter++
            }
          }
        }
      }, 300)
    })
  }

  // imrpoved chasing logic.  Need to improve it incase them come into contact with one another
  function ghostChase2() {
    ghostAray.forEach((ele) => {
      ele[3] = setInterval(() => {
        let ghostRow = ele[0]
        let ghostCell = ele[1]
        let ghostHistory = ele[2]
        let counter = ele[5]
        if (life > 0) {
          if (ghostRow === pacmanRow) {
            if (ghostCell < pacmanCell) {
              ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            } else {
              ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            }
          } else if (counter % 2 === 1) {
            if (ghostCell < pacmanCell) {
              ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            } else if (ghostCell > pacmanCell) {
              ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            }
          }
          if (ghostCell === pacmanCell) {
            if (ghostRow > pacmanRow) {
              ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            } else {
              ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            }
          } else if (counter % 2 === 0) {
            if (ghostRow > pacmanRow) {
              ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            } else {
              ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            }
          }
        } else {
          clearInterval(ele[3])
        }

      }, ele[4])

    })
  }
  // Best logic so far!!! Woop go 3
  function ghostChase3() {
    ghostAray.forEach((ele) => {
      ele[3] = setInterval(() => {
        let ghostRow = ele[0]
        let ghostCell = ele[1]
        let ghostHistory = ele[2]
        let counter = ele[5]
        console.log(counter)
        if (life > 0) {
          if (ghostRow === pacmanRow || ghostCell === pacmanCell) {
            if (ghostRow === pacmanRow && ghostCell < pacmanCell) {
              ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            }
            if (ghostRow === pacmanRow && ghostCell > pacmanCell) {
              ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            }
            if (ghostCell === pacmanCell && ghostRow > pacmanRow) {
              ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            }
            if (ghostCell === pacmanCell && ghostRow < pacmanRow) {
              ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            }
          } else if (counter % 2 === 1) {
            if (ghostCell < pacmanCell) {
              ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            } else if (ghostCell > pacmanCell) {
              ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            }
          } else if (counter % 2 === 0) {
            if (ghostRow > pacmanRow) {
              ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            } else {
              ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele)
              ele[5]++
            }
          }
        } else {
          clearInterval(ele[3])
        }

      }, ele[4])

    })
  }


  ghostChase3()
  //this logic is pretty good.

  //  need to reverse when pacman has a new class
  //Update when the lives are viewed


  // Also need to do something for the run off for the ghosts, I recon we do not allow ghosts to run off . have changed class, just need to add it to pacmans movements
  // maybe something to do with starting Logic? 

  //NEED TO DO
  // start function
  // end function
  // new level ??






  // console.log(pacmanBoard.length)
  // console.log(pacmanBoard[1].length)




















}
window.addEventListener('DOMContentLoaded', game)