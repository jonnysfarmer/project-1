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
    [2, 2, 2, 2, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 2],
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
      case 5: cell.classList.add('pacman'); break
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

  // move function
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
      score = score + 10
      // Add a new class that makes it FLASH
    } else if (board[rowMove][cellMove].classList.value === 'ghost') {
      board[pacmanRow][pacmanCell].classList.remove('pacman')
      board[pacmanRow][pacmanCell].classList.add('empty')
      pacmanCell = 9
      pacmanRow = 12
      board[pacmanRow][pacmanCell].classList.add('pacman')
      life = life - 1
      clearInterval(pacIntervalID)
      // Add something that ends the game
    }
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
        pacmanMove(cellMove, rowMove, key)
      }, speed)
    } else if (e.key === 'd') {
      clearInterval(pacIntervalID)
      pacIntervalID = setInterval(() => {
        const key = 'd'
        const cellMove = pacmanCell + 1
        const rowMove = pacmanRow
        pacmanMove(cellMove, rowMove, key)
      }, speed)
    } else if (e.key === 'w') {
      clearInterval(pacIntervalID)
      pacIntervalID = setInterval(() => {
        const cellMove = pacmanCell
        const rowMove = pacmanRow - 1
        pacmanMove(cellMove, rowMove)
      }, speed)
    } else if (e.key === 's') {
      clearInterval(pacIntervalID)
      pacIntervalID = setInterval(() => {
        const cellMove = pacmanCell
        const rowMove = pacmanRow + 1
        pacmanMove(cellMove, rowMove)
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
  //ghost array for ghost 2 and 3!
  let ghostAray = [
    [10, 9, [10, 9]],
    [10, 8, [10, 8]],
    [10, 10, [10, 10]]
  ]

  // Ghost history is an array which means it can not go back on itself

  // These are 4 functions, with the first move L, R, D, U
  function ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele) {
    // move down first    
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
    } else {
      console.log('fail')
    }
    ele[0] = ghostRow
    ele[1] = ghostCell
    ele[2] = ghostHistory
  }

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
      setInterval(() => {
        let ghostRow = ele[0]
        let ghostCell = ele[1]
        let ghostHistory = ele[2]
        let counter = 0
        if (ghostRow === pacmanRow) {
          if (ghostCell > pacmanCell) {
            ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele)
            counter ++
          } else {
            ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele)
            counter ++
          }
        } else if (counter % 2 === 1) {
          if (ghostCell > pacmanCell) {
            ghostMoveRUDL(ghostRow, ghostCell, ghostHistory, ele)
            counter++
          } else if (ghostCell < pacmanCell) {
            ghostMoveLDRU(ghostRow, ghostCell, ghostHistory, ele)
            counter++
          } 
        }
        if (ghostCell === pacmanCell) {
          if (ghostRow > pacmanRow) {
            ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele)
            counter ++
          } else {
            ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele)
            counter ++
          }
        } else if (counter % 2 === 0) {
          if (ghostRow > pacmanRow) {
            ghostMoveULDR(ghostRow, ghostCell, ghostHistory, ele)
            counter++
          } else {
            ghostMoveDRUL(ghostRow, ghostCell, ghostHistory, ele)
            counter++
          } 
       
          
        }
      }, 300)
    })
  }



  ghostChase2()


  // setInterval(() => {
  //   let ghostRow = ghost1Row
  //   let ghostCell = ghost1Cell
  //   let ghostHistory = ghost1History
  //   ghostMoveLDRU(ghost1Row, ghostCell, ghostHistory)
  // }, 1000)

  // ghost1Move()

  /*
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
      score = score + 10
      */

  //NEED TO DO
  // start function
  // end function
  //new level

  //GHOST IDEA
  //can do a counter, which has 2 options when divisable by 2 % has 2 different options.  So mini patterns




  // console.log(pacmanBoard.length)
  // console.log(pacmanBoard[1].length)




















}
window.addEventListener('DOMContentLoaded', game)