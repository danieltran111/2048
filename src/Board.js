var Board = cc.Sprite.extend({
        
    _cells : [],
        
    ctor : function(){
        this._super(res.Board_png);

        for(var i = 0; i < BOARD_SIZE; i++){
            this._cells[i] = new Array(BOARD_SIZE);
        }
    },

    randomAvailableCell : function(){
        var cells = this.availableCells();

        if(cells.length){
            return cells[Math.floor(Math.random()*cells.length)];
        }
    },

    insertTile : function(tile){
        this._cells[tile.xPos][tile.yPos] = tile;

        this.addChild(tile, 2);
    },

    removeTile : function(tile){
        this._cells[tile.xPos][tile.yPos] = null;
        this.removeFromParentAndCleanup(true);
    },

    _eachCell: function(callback) {
        for (var x = 0; x < BOARD_SIZE; x++)
            for (var y = 0; y < BOARD_SIZE; y++)
                callback(x, y, this._cells[x][y]);
    },    

    availableCells: function() {
        var cells = [];
        this._eachCell(function (xPos, yPos, tile) {
            if (!tile) {
                cells.push({xPos: xPos, yPos: yPos});
            }
        });
        return cells;
    },

    cellsAvailable: function() {
        return !!this.availableCells().length;
    },

    _withinBounds: function(position) {
        return position.xPos >= 0 && position.xPos < BOARD_SIZE &&
            position.yPos >= 0 && position.yPos < BOARD_SIZE;
    },

    cellContent:function(cell){
        if(this._withinBounds(cell)){
            return this._cells[cell.xPos][cell.yPos];
        }   else {
            return null;
        }
    },

    cellAvailable : function(cell){
        return !this.cellOccupied(cell);
    },

    cellOccupied: function(cell){
        return !!this.cellContent(cell);
    },



    findFarthestPosition : function(cell,vector){
        var previous;

        do{
            previous = cell;
            cell = {
                xPos: previous.xPos + vector.xPos, yPos: previous.yPos + vector.yPos
            };
        }   while (this._withinBounds(cell) && this.cellAvailable(cell));

        return {
            farthest : previous,
            next : cell
        };
    },

    moveTile: function(tile, cell) {
        this._cells[tile.xPos][tile.yPos] = null;
        this._cells[cell.xPos][cell.yPos] = tile;
        tile.updatePosition(cell);
    },
})