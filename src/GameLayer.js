var GameLayer = cc.Layer.extend({
    _board : null,

ctor : function (){
    this._super();
    var size = cc.winSize;

        this._board = new Board();
        this._board.x = size.width/2;
        this._board.y = size.height/2;
        this.addChild(this._board);

    var t = new Tile(this._board.randomAvailableCell(),4)
    this._board.insertTile(t);
},


});

var GameScene = cc.Scene.extend({
    onEnter : function(){
    this._super();
    var layer = new GameLayer();
    this.addChild(layer);
    }


})
