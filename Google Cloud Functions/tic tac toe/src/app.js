// app.js

const ttt = require('../src/ttt');
const readline = require('readline');



function printBoard(boardString) {
	let board = boardString.split('');
	for (let row=0; row<3; ++row) {
		console.log(board[row*3],board[row*3+1],board[row*3+2]);
	}
}

function movePlayer(player, position, boardString) {
	let board=boardString.split('');
	board[position]=player;
	return board.join('');
}

function oneGame(level) {
	let currentPlayer='X';
	let boardString='.........';
	let nextMove;

	while ((nextMove=ttt.pickNext(level, currentPlayer, boardString)) != -1) {
		if (nextMove === -1) break;
		console.log(`Player ${currentPlayer} move to field ${nextMove}`);
		boardString=movePlayer(currentPlayer, nextMove, boardString);
		printBoard(boardString);
		if (ttt.checkWin(currentPlayer, boardString)) {
			return currentPlayer;
			process.exit(0);
		}

  	currentPlayer = ( currentPlayer === 'X' ) ? 'O' : 'X';
	}
	return "-";
}

function runStats() {
	let stats={
		XWin:0,
		OWin:0,
		draw:0};
	let level=parseInt(process.argv[2]);

	for (let i=0; i<100; ++i) {
		let win=oneGame(level);
		switch(win) {
			case 'X': stats.XWin++; console.log("*** Player X won"); break;
			case 'O': stats.OWin++; console.log("*** Player O won"); break;
			case '-': stats.draw++; console.log("*** Draw"); break;
		}
	}
	console.log("Level="+level);
	console.log(stats);
}

runStats();
