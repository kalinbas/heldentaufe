function TileStack(config) {

    var tiles = [];

    $.each(config, function (index, obj) {
        for (var i = 0; i < obj.count; i++) {
            tiles.push(new Tile(obj.type));
        }
    });

    this.removeOneOfType = function (type) {
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].hasType(type)) {
                tiles.splice(i, 1);
                return;
            }
        }
        throw new Error("No tile to remove found.");
    };

    this.shuffle = function () {
        tiles = Utils.randomizeArray(tiles);
    };

    this.hasCardsLeft = function() {
        return tiles.length > 0;
    };

    this.getRandomTile = function() {
        return tiles.pop();
    };

    this.getVillageTile = function () {
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].hasType(TileType.VILLAGE)) {
                var grassTile = tiles[i];
                tiles.splice(i, 1);
                return grassTile;
            }
        }
        throw new Error("No VILLAGE found.");
    };
}