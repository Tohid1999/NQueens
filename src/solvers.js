
window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var innerFind = function(startRow){

    if(startRow === n) {
      console.log(board);
      return board;
    } else {
      for (var col = 0; col < n; col++){
        board.togglePiece(startRow, col);

        if(!board.hasAnyRooksConflicts()){
          innerFind(startRow+1);
        }
        board.togglePiece(startRow,col);
      }
    }
  };

  innerFind(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  console.log(board.rows());
  return board.rows();
};




window.countNRooksSolutions = function(n) {
  var results = 0;
  var board = new Board({n:n});

  var innerCount = function(startRow){

    if(startRow === n) {
      results++;
    } else {
      for(var col = 0; col < n; col++){
        board.togglePiece(startRow, col);

        if(!board.hasAnyRooksConflicts()){
          innerCount(startRow+1);
        }
        board.togglePiece(startRow,col);
      }
    }
  };

  innerCount(0);
  console.log('Number of solutions for ' + n + ' rooks:', results);
  return results;
};




window.findNQueensSolution = function(n) {
  var solution = new Board({n:n});

  var innerFind = function(startRow){

    if(startRow === n) {
      return;
    } else {
      for (var col = 0; col < n; col++){
        solution.togglePiece(startRow, col);

        if(!board.hasAnyQueensConflicts()){
          innerFind(startRow+1);
        }
        board.togglePiece(startRow,col);
      }
    }
  };

  innerFind(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};



window.countNQueensSolutions = function(n) {
  var results = 0;
  var board = new Board({n:n});

  var innerCount = function(startRow){

    if(startRow === n) {
      results++;

    } else {
      for(var col = 0; col < n; col++){
        board.togglePiece(startRow, col);

        if(!board.hasAnyQueensConflicts()){
          innerCount(startRow+1);
        }
        board.togglePiece(startRow,col);
      }
    }
  };

  innerCount(0);

  console.log('Number of solutions for ' + n + ' queens:', results);
  return results;
};
