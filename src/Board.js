(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    hasRowConflictAt: function(rowIndex) {
      return this.get(rowIndex).reduce(function(a,b) { return a + b} ) > 1;
    },

    hasAnyRowConflicts: function() {

      for ( var i=0; i<this.get('n'); i++ ){
        if (this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false; 
    },

    hasColConflictAt: function(colIndex) {
      var rows = this.rows();
      var totals = 0;

      for (var i=0; i<rows.length; i++ ){
        totals += rows[i][colIndex];
      }
      return totals > 1;
    },

    
    hasAnyColConflicts: function() {
      var rows = this.rows();

      for (var i=0; i<rows.length; i++ ){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      var total = 0;
      var currIndex = majorDiagonalColumnIndexAtFirstRow;

      for(var i = 0; i < rows.length; i++){
        if(typeof rows[i][currIndex] === 'number'){
          total += rows[i][currIndex];
          currIndex++;
        }
      }

      return total > 1;
    },
    
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      for(var i = 0; i < rows.length; i++){
        for(var item = 0; item < rows[i].length; item++){
          if(this.hasMajorDiagonalConflictAt(item)) return true;
        }
      }
      return false;
   },
    
    
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rows = this.rows();
      var total = 0;
      var currIndex = minorDiagonalColumnIndexAtFirstRow;

      for(var i = 0; i < rows.length; i++){ 
        if(typeof rows[i][currIndex] !== 'undefined'){
          total += rows[i][currIndex];
          currIndex --;
        }
      }
      return total > 1;
    },

    
    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      for(var i = 0; i<rows.length; i++){
        for(var item = rows[i].length-1; item >= 0; item--){
          if(this.hasMinorDiagonalConflictAt(item)) return true;
        }
      }
      return false;
    }
  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
