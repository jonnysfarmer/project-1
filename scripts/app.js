function game() {
  // This is the inital plan - ie. Level one.  With this we can change everything
  const pacmanBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 4, 6, 1, 6, 6, 6, 1, 0, 1, 6, 6, 6, 1, 6, 4, 1, 0],
    [0, 1, 6, 6, 1, 6, 6, 6, 1, 0, 1, 6, 6, 6, 1, 6, 6, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 6, 6, 6, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 6, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 6, 6, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 6, 6, 1, 0],
    [0, 1, 6, 6, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 6, 6, 1, 0],
    [0, 1, 6, 6, 1, 6, 1, 0, 0, 0, 0, 0, 1, 6, 1, 6, 6, 1, 0],
    [0, 1, 6, 6, 1, 6, 1, 2, 2, 5, 2, 2, 1, 6, 1, 6, 6, 1, 0],
    [0, 1, 1, 1, 1, 6, 1, 0, 0, 0, 0, 0, 1, 6, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 6, 6, 1, 6, 6, 6, 1, 0, 1, 6, 6, 6, 1, 6, 6, 1, 0],
    [0, 1, 4, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 4, 1, 0],
    [0, 6, 1, 6, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 6, 1, 6, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  // idea for design ‘Composition C (No.III) with Red, Yellow and Blue’ – Piet Mondrian, 1935
  //---------BOARD CREATION----------------
  let board = []
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
        cell.classList.add('empty')
      } break
      case 4: cell.classList.add('pill'); break
      case 5: cell.classList.add('pacman'); break
      case 6: cell.classList.add('wallGrey'); break
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
      ele.forEach((inele) => {
        const cell = document.createElement('div')
        assignCellClass(inele, cell)
        row.appendChild(cell)
        rows.push(cell)
      })
      board.push(rows)
    })
  }

  // ----------PACMAN---------------

  // Movement variables for Pacman
  const scoreDisplay = document.querySelector('.score')
  const lifeDisplay = document.querySelector('.life')
  let pacmanRow = 12
  let pacmanCell = 9
  let score = 0
  let life = 3
  let pacIntervalID = NaN
  const speed = 200
  let ghostSpeed = 300
  let startButton = document.querySelector('.start')

  // my sendgame function.  If life ==0 then it sends the game.  Clears the board,  Creates a new info screen.  Then recalls the 
  // go function
  function endGame() {
    if (life === 0 || score === 245) {
      // console.log('endgame')
      // console.log(score)
      grid.innerHTML = ''
      const div = document.createElement('div')
      div.classList.add('intro')
      grid.appendChild(div)
      const button = document.createElement('button')
      button.classList.add('start')
      button.classList.add('after')
      div.appendChild(button)
      startButton = document.querySelector('.start')
      // storage()
      startButton.innerHTML = `Your score was ${score} <br> click to start <br>a new game`
      GO()
    }

  }
  // Local storage function, need to implement it
  function storage() {

    if (!localStorage.getItem('PAC-MANGame')) {
      const playersScores = []
      const name = prompt('Enter your name')
      playersScores.push({ name, score })
      localStorage.setItem('PAC-MANGame', JSON.stringify(playersScores))
    } else {
      const playersScores = JSON.parse(localStorage.getItem('PAC-MANGame'))
      const name = prompt('Enter your name')
      playersScores.push({ name, score })
      localStorage.setItem('PAC-MANGame', JSON.stringify(playersScores))
    }
    const scoresArray = JSON.parse(localStorage.getItem('PAC-MANGame'))
    const startButton = document.querySelector('.start')
    scoresArray.forEach(player => {
      startButton.innerHTML = `${player.name}, ${player.score} <br>`
    })


  }

  //New move function that adds the active function for 5000 ms if it goes over a pill!
  function pacmanMoveActivate(cellMove, rowMove, key) {
    // console.log(board[pacmanRow][pacmanCell].classList.value)
    if (board[pacmanRow][pacmanCell].classList.value === 'pacman' || board[pacmanRow][pacmanCell].classList.value === 'empty pacman') {

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
        }, 10000)
        // console.log('active')
        score = score + 10
        // Add a new class that makes it FLASH
      } else if (board[rowMove][cellMove].classList.value === 'empty ghost' || board[rowMove][cellMove].classList.value === 'fruit ghost' || board[rowMove][cellMove].classList.value === 'pill ghost') {
        board[pacmanRow][pacmanCell].classList.remove('pacman')
        board[pacmanRow][pacmanCell].classList.add('empty')
        pacmanCell = 9
        pacmanRow = 12
        board[pacmanRow][pacmanCell].classList.remove('empty')
        board[pacmanRow][pacmanCell].classList.add('pacman')
        life = life - 1
        clearInterval(pacIntervalID)
      }
    } else if (board[pacmanRow][pacmanCell].classList.value === 'pacman activate') {
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
      }
    }

    scoreDisplay.innerHTML = `Your Score is : ${score}`
    lifeDisplay.innerHTML = `Number of lives : ${life}`
  }

  // Actual movement event listenter (a,w,d,s) and referrs to function pacmanMove
  function movement() {
    document.addEventListener('keyup', (e) => {
      if (life > 0) {
        if (e.key === 'a') {
          clearInterval(pacIntervalID)
          pacIntervalID = setInterval(() => {
            const key = 'a'
            // console.log('test')
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
      }
    })
  }



  // ------------GHOST

  

  //ghost array for ghost 1, 2 and 3!  They go Ghost Cell, Ghost Row, Ghost History, Nan is to clear the timers, Speed, counter, orginal location
  // should of done this in an array of objects
  let ghostAray = [
    [10, 9, [10, 9], NaN, ghostSpeed, 0, [10, 9]],
    [10, 8, [10, 8], NaN, (ghostSpeed + 50), 0, [10, 8]],
    [10, 10, [10, 10], NaN, (ghostSpeed + 75), 0, [10, 10]]
  ]

  // These are 4 functions, with the first move L, R, D, U - then function if it comes across Pacman or comes accross another Ghost
  // These are pretty ineffecient, should of done a function for U D L R and used them individually.  Would of saved a lot of time
  // This also includes my interaction logic.
  //In hindisght, I should of done an Up Down, Left right function.  Would of saved me a decent amount of code.
  function ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele, orginalPos) {

    if ((board[ghostRow - 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman activate') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman activate')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = orginalPos[0]
      ghostCell = orginalPos[1]
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow - 1][ghostCell].classList.value === 'pacman') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman'))) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = pacmanRow
      ghostCell = pacmanCell
      board[ghostRow][ghostCell].classList.remove('pacman')
      board[ghostRow][ghostCell].classList.add('ghost')
      pacmanCell = 9
      pacmanRow = 12
      if (board[pacmanRow][pacmanCell].classList.value === 'empty') {
        board[pacmanRow][pacmanCell].classList.remove('empty')
        board[pacmanRow][pacmanCell].classList.add('pacman')
      } else {
        pacmanCell = 9
        pacmanRow = 10
        board[10][9].classList.remove('empty')
        board[10][9].classList.add('pacman')
      }
      life = life - 1
      clearInterval(pacIntervalID)
      // endGame()
      // console.log('pacman Up')

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
    } else if (((board[ghostRow][ghostCell + 1].classList.value === 'empty') || (board[ghostRow][ghostCell + 1].classList.value === 'fruit') || (board[ghostRow][ghostCell + 1].classList.value === 'pill')) && (ghostCell + 1 !== ghostHistory[1])) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      if (board[ghostRow][ghostCell].classList.value === '') {
        board[ghostRow][ghostCell].classList.add('empty')
      }
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostCell = ghostCell + 1
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if ((board[ghostRow - 1][ghostCell].classList.value === 'empty ghost' || board[ghostRow - 1][ghostCell].classList.value === 'fruit ghost' || board[ghostRow - 1][ghostCell].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = ghostHistory[0]
      ghostCell = ghostHistory[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow + 1, ghostCell)
      // console.log('ghost Up - reverse!')
    } else if ((board[ghostRow][ghostCell - 1].classList.value === 'empty ghost' || board[ghostRow][ghostCell - 1].classList.value === 'fruit ghost' || board[ghostRow][ghostCell - 1].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = ghostHistory[0]
      ghostCell = ghostHistory[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell + 1)
      // console.log('ghost left - reverse!')
    } else if ((board[ghostRow + 1][ghostCell].classList.value === 'empty ghost' || board[ghostRow + 1][ghostCell].classList.value === 'fruit ghost' || board[ghostRow + 1][ghostCell].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = ghostHistory[0]
      ghostCell = ghostHistory[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow - 1, ghostCell)
      // console.log('ghost down - reverse!')
    } else if ((board[ghostRow][ghostCell + 1].classList.value === 'empty ghost' || board[ghostRow][ghostCell + 1].classList.value === 'fruit ghost' || board[ghostRow][ghostCell + 1].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = ghostHistory[0]
      ghostCell = ghostHistory[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell - 1)
    } else {
      // console.log('fail')
    }


    ele[0] = ghostRow
    ele[1] = ghostCell
    ele[2] = ghostHistory

    // console.log([[ghostRow + 1],[ghostCell]])
  }
  function ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele, orginalPos) {
    if ((board[ghostRow - 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman activate') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman activate')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = orginalPos[0]
      ghostCell = orginalPos[1]
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow - 1][ghostCell].classList.value === 'pacman') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman'))) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = pacmanRow
      ghostCell = pacmanCell
      board[ghostRow][ghostCell].classList.remove('pacman')
      board[ghostRow][ghostCell].classList.add('ghost')
      pacmanCell = 9
      pacmanRow = 12
      if (board[pacmanRow][pacmanCell].classList.value === 'empty') {
        board[pacmanRow][pacmanCell].classList.remove('empty')
        board[pacmanRow][pacmanCell].classList.add('pacman')
      } else {
        pacmanCell = 9
        pacmanRow = 10
        board[10][9].classList.remove('empty')
        board[10][9].classList.add('pacman')
      }
      life = life - 1
      clearInterval(pacIntervalID)

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
      // console.log('pacman to left')
    } else if ((board[ghostRow - 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman activate') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman activate')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = orginalPos[0]
      ghostCell = orginalPos[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      // endGame()
    } else if ((board[ghostRow][ghostCell - 1].classList.value === 'empty ghost' || board[ghostRow][ghostCell - 1].classList.value === 'fruit ghost' || board[ghostRow][ghostCell - 1].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = ghostHistory[0]
      ghostCell = ghostHistory[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow + 1, ghostCell)
      // console.log('ghost left - reverse!')
    } else if ((board[ghostRow + 1][ghostCell].classList.value === 'empty ghost' || board[ghostRow + 1][ghostCell].classList.value === 'fruit ghost' || board[ghostRow + 1][ghostCell].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = ghostHistory[0]
      ghostCell = ghostHistory[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow - 1, ghostCell)
    } else {
      // console.log('fail')
    }
    ele[0] = ghostRow
    ele[1] = ghostCell
    ele[2] = ghostHistory

    // console.log([[ghostRow + 1],[ghostCell]])
  }
  function ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele, orginalPos) {
    if ((board[ghostRow - 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman activate') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman activate')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = orginalPos[0]
      ghostCell = orginalPos[1]
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow - 1][ghostCell].classList.value === 'pacman') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman'))) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = pacmanRow
      ghostCell = pacmanCell
      board[ghostRow][ghostCell].classList.remove('pacman')
      board[ghostRow][ghostCell].classList.add('ghost')
      pacmanCell = 9
      pacmanRow = 12
      if (board[pacmanRow][pacmanCell].classList.value === 'empty') {
        board[pacmanRow][pacmanCell].classList.remove('empty')
        board[pacmanRow][pacmanCell].classList.add('pacman')
      } else {
        pacmanCell = 9
        pacmanRow = 10
        board[10][9].classList.remove('empty')
        board[10][9].classList.add('pacman')
      }
      life = life - 1
      clearInterval(pacIntervalID)
      // endGame()
      // console.log('pacman Up')

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
      // console.log('pacman down')
    } else if ((board[ghostRow - 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman activate') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman activate')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = orginalPos[0]
      ghostCell = orginalPos[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      // endGame()
    } else if ((board[ghostRow + 1][ghostCell].classList.value === 'empty ghost' || board[ghostRow + 1][ghostCell].classList.value === 'fruit ghost' || board[ghostRow + 1][ghostCell].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = ghostHistory[0]
      ghostCell = ghostHistory[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow - 1, ghostCell)
      // console.log('ghost down - reverse!')
    } else if ((board[ghostRow][ghostCell + 1].classList.value === 'empty ghost' || board[ghostRow][ghostCell + 1].classList.value === 'fruit ghost' || board[ghostRow][ghostCell + 1].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = ghostHistory[0]
      ghostCell = ghostHistory[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell - 1)
      // console.log('ghost right - reverse!')
    } else {
      // console.log('fail')
    }
    ele[0] = ghostRow
    ele[1] = ghostCell
    ele[2] = ghostHistory

    // console.log([[ghostRow + 1],[ghostCell]])
  }
  function ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele, orginalPos) {
    if ((board[ghostRow - 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman activate') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman activate')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = orginalPos[0]
      ghostCell = orginalPos[1]
      board[ghostRow][ghostCell].classList.add('ghost')
    } else if (((board[ghostRow - 1][ghostCell].classList.value === 'pacman') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman'))) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell)
      ghostRow = pacmanRow
      ghostCell = pacmanCell
      board[ghostRow][ghostCell].classList.remove('pacman')
      board[ghostRow][ghostCell].classList.add('ghost')
      pacmanCell = 9
      pacmanRow = 12
      if (board[pacmanRow][pacmanCell].classList.value === 'empty') {
        board[pacmanRow][pacmanCell].classList.remove('empty')
        board[pacmanRow][pacmanCell].classList.add('pacman')
      } else {
        pacmanCell = 9
        pacmanRow = 10
        board[10][9].classList.remove('empty')
        board[10][9].classList.add('pacman')
      }
      life = life - 1
      clearInterval(pacIntervalID)
      // endGame()
      // console.log('pacman Up')

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
      // console.log('pacman to right')
    } else if ((board[ghostRow - 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow + 1][ghostCell].classList.value === 'pacman activate') || (board[ghostRow][ghostCell + 1].classList.value === 'pacman activate') || (board[ghostRow][ghostCell - 1].classList.value === 'pacman activate')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = orginalPos[0]
      ghostCell = orginalPos[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      // endGame()
    } else if ((board[ghostRow][ghostCell + 1].classList.value === 'empty ghost' || board[ghostRow][ghostCell + 1].classList.value === 'fruit ghost' || board[ghostRow][ghostCell + 1].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = ghostHistory[0]
      ghostCell = ghostHistory[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow, ghostCell - 1)
      // console.log('ghost right - reverse!')
    } else if ((board[ghostRow - 1][ghostCell].classList.value === 'empty ghost' || board[ghostRow - 1][ghostCell].classList.value === 'fruit ghost' || board[ghostRow - 1][ghostCell].classList.value === 'pill ghost')) {
      board[ghostRow][ghostCell].classList.remove('ghost')
      ghostRow = ghostHistory[0]
      ghostCell = ghostHistory[1]
      board[ghostRow][ghostCell].classList.add('ghost')
      ghostHistory = []
      ghostHistory.push(ghostRow + 1, ghostCell)
    } else {
      // console.log('fail')
    }
    ele[0] = ghostRow
    ele[1] = ghostCell
    ele[2] = ghostHistory
  }

  // Ghost Chase 3 logic, but with running away function
  //I used multiple iterations.  My basic logic is:
  //If Pacman is on the same row or column - move towards pacman in that direction
  //otherwise, take it in turns to move in the X and Y direction towards Pacman
  function ghostChase4() {
    ghostAray.forEach((ele) => {
      ele[3] = setInterval(() => {
        let ghostRow = ele[0]
        let ghostCell = ele[1]
        let ghostHistory = ele[2]
        let counter = ele[5]
        let orginalPos = ele[6]
        // console.log(counter)
        if ((life > 0 ) && (score < 245)) {
          if (board[pacmanRow][pacmanCell].classList.value === 'pacman' || board[pacmanRow][pacmanCell].classList.value === 'empty pacman') {
            if (ghostRow === pacmanRow || ghostCell === pacmanCell) {
              if (ghostRow === pacmanRow && ghostCell < pacmanCell) {
                ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
              if (ghostRow === pacmanRow && ghostCell > pacmanCell) {
                ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
              if (ghostCell === pacmanCell && ghostRow > pacmanRow) {
                ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
              if (ghostCell === pacmanCell && ghostRow < pacmanRow) {
                ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
            } else if (counter % 2 === 1) {
              if (ghostCell < pacmanCell) {
                ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              } else if (ghostCell > pacmanCell) {
                ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
            } else if (counter % 2 === 0) {
              if (ghostRow > pacmanRow) {
                ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              } else {
                ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
            }
          } else {
            if (ghostRow === pacmanRow || ghostCell === pacmanCell) {
              if (ghostRow === pacmanRow && ghostCell > pacmanCell) {
                ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
              if (ghostRow === pacmanRow && ghostCell < pacmanCell) {
                ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
              if (ghostCell === pacmanCell && ghostRow < pacmanRow) {
                ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
              if (ghostCell === pacmanCell && ghostRow > pacmanRow) {
                ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
            } else if (counter % 2 === 1) {
              if (ghostCell > pacmanCell) {
                ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              } else if (ghostCell < pacmanCell) {
                ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
            } else if (counter % 2 === 0) {
              if (ghostRow < pacmanRow) {
                ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              } else {
                ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele, orginalPos)
                ele[5]++
              }
            }
          }
        } else {
          clearInterval(ele[3])
          endGame()
        }
        lifeDisplay.innerHTML = `Number of lives : ${life}`
      }, ele[4])

    })




  }


  // This is my start Button
  startButton = document.querySelector('.start')

 // launch! Go Go Go
  function GO() {
    // itsStorageYo()
    startButton.addEventListener('mousedown', () => {
      // console.log('startgame')
      grid.innerHTML = ''
      board = []
      createBoard()
      life = 3
      score = 0
      scoreDisplay.innerHTML = `Your Score is : ${score}`
      lifeDisplay.innerHTML = `Number of lives : ${life}`
      ghostAray = [
        [10, 9, [10, 9], NaN, ghostSpeed, 0, [10, 9]],
        [10, 8, [10, 8], NaN, (ghostSpeed + 50), 0, [10, 8]],
        [10, 10, [10, 10], NaN, (ghostSpeed + 75), 0, [10, 10]]
      ]
      pacIntervalID = setInterval(() => {
        const key = 'a'
        // console.log('test')
        const cellMove = pacmanCell - 1
        const rowMove = pacmanRow
        pacmanMoveActivate(cellMove, rowMove, key)
      }, speed)
      movement()
      ghostChase4()

    })
  }

  GO()



}
window.addEventListener('DOMContentLoaded', game)