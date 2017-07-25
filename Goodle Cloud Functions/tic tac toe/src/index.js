// Tic Tac Toe as a Microservice
// Harald Kubota 2017-07

// To test this GCF with an HTML file which is accessed
// via file://, we need CORS 
// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
// Luckily this is easy to do in Node.js with https://www.npmjs.com/package/cors

const cors = require('cors');

exports.ttt = function publicttt(req, res) {
  var corsFn = cors();
  corsFn(req, res, function() {
    ttt(req, res);
  });
}

function ttt(req, res) {
  let playerWon;
  
  // 4 parameter: cmd, level, player and board
  let level = parseInt(req.query.level);
  if (level < 0 || level > 5) {
    res.status(400).send("level must be 0..5");
    return;
  }
  let player = req.query.player;
  if (player != 'X' && player != 'O') {
    res.status(400).send("player must be X or O");
    return;
  }
  let boardString = req.query.board;
  if (boardString.length != 9) {
    res.status(400).send("board must be 9 char string");
  }
  for (let i=0; i<9; ++i)
    if (boardString.charAt(i) != 'X' && boardString.charAt(i) != 'O' && boardString.charAt(i) != '.') {
      res.status(400).send("board must only consist of X and O and .");
      return;
    }
  let cmd=req.query.cmd;
  
  switch(cmd) {
    case 'checkWin':
      playerWon=checkWin(player, boardString);
      res.set('Content-Type', 'application/json');
      res.status(200).send(
        JSON.stringify( {
          'player': player,
          'checkWin': playerWon
        })
      );
      break;
    case 'nextMove':
      let nextMove = pickNext(level, player, boardString);
      // Check if player now won
      // saves us from calling checkWin
      boardString=updateBoard(nextMove, player, boardString);
      playerWon=checkWin(player, boardString);
      res.set('Content-Type', 'application/json');
      res.status(200).send(
        JSON.stringify( {
          'player': player,
          'nextMove': nextMove,
          'board': boardString,
          'checkWin': playerWon
        })
      );
      break;
    default:
      res.status(400).send("Unknown command \""+cmd+"\"");
  }
};

function updateBoard(position, player, boardString) {
  let board=boardString.split('');
  board[position]=player;
  return board.join('');
}


  /*
   * Tic Tac Toe as an API
   *
   * Using
   * Jest for testing
   */
  // Internal board:
  // 0 1 2
  // 3 4 5
  // 6 7 8
  // Choices: X, O (capital o), . as empty

  // checkWin(player, boardString)
  // player: character 'X' or 'O'
  // boardString: string 9 characters, char[0]=top left, char[1]=top mid, etc.
  // Returns:
  //   true: player won
  //   false: player did not win

  function checkWin(player, boardString) {

    function checkWinHorizontal(player, boardString) {
      let board = boardString.split('');
      for (let row = 0; row < 3; ++row) {
        if (board[row * 3] === player && board[row * 3 + 1] === player &&
          board[row * 3 + 2] === player) {
          return true;
        }
      }
      return false;
    }

    function checkWinVertical(player, boardString) {
      let board = boardString.split('');
      for (let col = 0; col < 3; ++col) {
        if (board[col] === player && board[col + 3] === player &&
          board[col + 6] === player) return true;
      }
      return false;
    }

    function checkWinDiagonal(player, boardString) {
      let board = boardString.split('');
      if (board[0] === player && board[4] === player && board[8] === player ||
        board[2] === player && board[4] === player && board[6] === player) return true;
      return false;
    }

    if (checkWinHorizontal(player, boardString) ||
      checkWinVertical(player, boardString) ||
      checkWinDiagonal(player, boardString)) return true;
    return false;
  }

  // Return an array of indices of empty fields

  function findPossibleFields(boardString) {
    let emptyFields = [];
    let board = boardString.split('');

    for (let i = 0; i < 9; ++i) {
      if (board[i] === '.') emptyFields.push(i);
    }
    return emptyFields;
  }

  // Return the other player

  function otherPlayer(player) {
    return (player === 'X') ? 'O' : 'X';
  }

  // return a random field or -1 if no field available

  function returnRandomField(fieldArray) {
    if (fieldArray.length === 0)
      return -1
    else
      return fieldArray[Math.floor(Math.random() * fieldArray.length)];
  }

  // pickNext(level, player, boardString)
  // level:
  //   0: Random Move
  //   2: Pick winning move, else random
  //   4: Pick winning move, or simulate opponent for each possible move, and then pick non-losing one
  //   1, 3, 5: same as level-1, but pick mid if possible
  // player: character 'X' or 'O'
  // boardString: string 9 characters, char[0]=top left, char[1]=top mid, etc.
  // Returns:
  //   0..8: field to use
  //    -1: no field left

  function pickNext(level, player, boardString) {
    let board = boardString.split('');

    if ((level & 1) && board[4] === '.')
      return 4;

    let possibleFields = findPossibleFields(boardString); // There should be a shuffle

    // Level 0, 1
    // 0: Random
    // 1: Same, but prefer mid

    if (level === 0)
      return returnRandomField(possibleFields);

    // Level 2: no winning move, so return a random possible one
    // Level 3: Same, but prefer mid

    for (let i = 0; i < possibleFields.length; ++i) {
      let tempBoard = board.slice();
      tempBoard[possibleFields[i]] = player;

      if (checkWin(player, tempBoard.join(''))) {
        return possibleFields[i];
      }
    }

    if (level === 2)
      return returnRandomField(possibleFields);

    // Level 4: Now try all possible ones and let opponent move
    //          and see if that makes us lose
    // Level 5: Same, but prefer mid

    let notLosingFields = [];

    for (let i = 0; i < possibleFields.length; ++i) {
      let tempBoard = board.slice();
      tempBoard[possibleFields[i]] = player;
      let opponentPosition = pickNext(2, otherPlayer(player), tempBoard.join(''));
      tempBoard[opponentPosition] = otherPlayer(player);

      if (!checkWin(otherPlayer(player), tempBoard.join(''))) {
        notLosingFields.push(possibleFields[i]);
      }
    }

    if (notLosingFields.length > 0)
      return returnRandomField(notLosingFields);
    else
      return returnRandomField(possibleFields);
  }