function SurfaceBoard(startTileTile, intitialWidthX, intitialHeightPx, minWidthPx) {
    var map, startTile, startX, startY, self, showBoard;
    
    self = this;

    this.setShowBoard = function (show) {
        showBoard = show;
    };

    startX = 5;
    startY = 5;

    map = new HexagonMap(15, 15, -3, -2, true, intitialWidthX, intitialHeightPx, minWidthPx, false);
    startTile = new HexagonMapTile(startTileTile, 0);

    map.addTile(startX, startY, startTile);   

    this.addPlayerToStart = function (player) {
        map.movePlayerTo(startY, startY, player);
    };

    this.addPlayersToStart = function (players) {

        for (var i = players.length - 1; i >= 0; i--) {
            map.movePlayerTo(startY, startY, players[i]);
        }
    };

    this.areEntrancesFree = function () {
        var status = [];
        for (var i = 1; i <= 5; i++) {
            status.push(hasEntranceBeUncovered(i));
        }
        return status;
    };
 
    function hasEntranceBeUncovered (i) {
        var pp, type;
        type = getEntraceTileType(i);
        pp = map.findPositionOfType(type);
        return pp;
    }

    this.playerEnters = function(player, i) {
        var pp, type;
        type = getEntraceTileType(i);
        pp = map.findPositionOfType(type);
        self.movePlayerTo(pp.x, pp.y, player);
    };

    this.playerEntersAfterDeath = function (player) {       
        var pos = map.getRandomPosition();
        map.movePlayerTo(pos.x, pos.y, player);
    };

    this.playerLeaves = function(player) {
        map.removePlayer(player);
    };

    this.hasTileAt = function (x, y) {
        var tile = map.getTileAt(x, y);
        return tile;
    };

    this.getAbsolutePosition = function (x, y) {
        var coords = map.getTileCoords(x + 0.5, y);
        return coords;
    };

    this.addTileAt = function (x, y, tile) {
        // -60, 0 or 60 degrees rotated
        map.addTile(x, y, new HexagonMapTile(tile, 0)); //(Math.floor(Math.random() * 3) - 1) * 60));
    };

    this.movePlayerTo = function (x, y, player) {
        player.setIsInDungeon(false);
        map.movePlayerTo(x, y, player);
    };

    this.render = function (mapDiv, currentPlayer, cardsLeft, doesCurrentTileHaveAction) {
        mapDiv.empty();
        if (showBoard) {
            map.render(mapDiv, currentPlayer, cardsLeft, game.clickOnTile, doesCurrentTileHaveAction, true);
        }
    };

    function getEntraceTileType(i) {
        switch (i) {
            case 1:
                return TileType.DUNGEON1;
            case 2:
                return TileType.DUNGEON2;
            case 3:
                return TileType.DUNGEON3;
            case 4:
                return TileType.DUNGEON4;
            case 5:
                return TileType.DUNGEON5;
        }
        throw new Error("Invalid dungeon entrance number: " + i);
    }
}