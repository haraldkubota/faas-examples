"use strict";
const ttt = require('../src/ttt');

describe('Tic Tac Toe Check Win/Lose', function() {

  it('should report who wins in a horizoncal winning situation', function(done) {
    expect(ttt.checkWin('X', 'XXX......')).toBe(true);
    expect(ttt.checkWin('X', '...XXX...')).toBe(true);
    expect(ttt.checkWin('X', '......XXX')).toBe(true);
    expect(ttt.checkWin('O', 'OOO......')).toBe(true);
    expect(ttt.checkWin('O', '...OOO...')).toBe(true);
    expect(ttt.checkWin('O', '......OOO')).toBe(true);
    expect(ttt.checkWin('X', 'O.....XOO')).toBe(false);
    done();
  });

  it('should report who wins in a vertical winning situation', function(done) {
    expect(ttt.checkWin('X', 'X..X..X..')).toBe(true);
    expect(ttt.checkWin('X', '.X..X..X.')).toBe(true);
    expect(ttt.checkWin('X', '..X..X..X')).toBe(true);
    expect(ttt.checkWin('O', 'O..O..O..')).toBe(true);
    expect(ttt.checkWin('O', '.O..O..O.')).toBe(true);
    expect(ttt.checkWin('O', '..O..O..O')).toBe(true);
    expect(ttt.checkWin('O', '..O.O...O')).toBe(false);
    expect(ttt.checkWin('X', 'OOXXOXOXX')).toBe(true);
    done();
  })

  it('should report who wins in a diagonal winning situation', function(done) {
    expect(ttt.checkWin('X', 'X...X...X')).toBe(true);
    expect(ttt.checkWin('X', '..X.X.X..')).toBe(true);
    expect(ttt.checkWin('O', 'O...O...O')).toBe(true);
    expect(ttt.checkWin('O', '..O.O.O..')).toBe(true);
    done();
  })
});

/*
describe('Find possible fields', function() {

  function compareArrays(a, b) {
    let result = true;
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] != b[i]) result = false;
    }
    return result;
  }

  it('should find the single empty field', function(done) {
    expect(compareArrays(ttt.findPossibleFields('XXOOOXXO.'), [8])).toBe(
      true);
    expect(compareArrays(ttt.findPossibleFields('.XOOOXXOX'), [0])).toBe(
      true);
    done();
  })

  it('should find multiple empty fields', function(done) {
    expect(compareArrays(ttt.findPossibleFields('.........'), [0, 1, 2,
      3, 4, 5, 6, 7, 8
    ])).toBe(true);
    expect(compareArrays(ttt.findPossibleFields('X.......O'), [1, 2, 3,
      4, 5, 6, 7
    ])).toBe(true);
    done();
  })
})
*/

describe('Find random move', function() {

  it('should find a random field)', function(done) {
    expect(ttt.pickNext(0, 'X', '.........')).toBeGreaterThanOrEqual(0);
    done();
  })
  it('should find a random field but not themiddle)', function(done) {
    expect(ttt.pickNext(0, 'X', '....O....')).not.toBe(4);
    done();
  })
});


describe('Find no move as board is full', function() {
  it('should return -1 since the board is full', function(done) {
    expect(ttt.pickNext(0, 'X', 'XOXXOXOXX')).toBe(-1);
    done();
  })
});

describe('Find winning move without looking ahead', function() {

  it('should find the winning move top right, random)', function(done) {
    expect(ttt.pickNext(2, 'X', '.O.XOXOXX')).toBe(2);
    done();
  })

  it('should find the winning bottom mid, random', function(done) {
    expect(ttt.pickNext(2, 'O', 'XOX.OX...')).toBe(7);
    done();
  })
});

describe('Find center field', function() {

  it('for level 1)', function(done) {
    expect(ttt.pickNext(1, 'X', 'OX.......')).toBe(4);
    done();
  })
  it('for level 3)', function(done) {
    expect(ttt.pickNext(3, 'X', '.O.....X.')).toBe(4);
    done();
  })
  it('for level 5)', function(done) {
    expect(ttt.pickNext(5, 'X', '......XO.')).toBe(4);
    done();
  })
});

describe('Find winning move with looking 1 step ahead', function() {

  it('should find the not losing move bottom left)', function(done) {
    expect(ttt.pickNext(4, 'X', 'OX.O.....')).toBe(6);
    done();
  })

  it('should find the not losing move center', function(done) {
    expect(ttt.pickNext(4, 'O', 'O.X..X..O')).toBe(4);
    done();
  })
});

describe('Losing situation', function() {

  it('should find no good move (but a move)', function(done) {
    let a = ttt.pickNext(4, 'O', 'XX.XOO.O.');
    expect(a == 2 || a == 6 || a == 8).toBeTruthy();
    done();
  })
});