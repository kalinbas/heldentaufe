function DungeonBoard(intitialWidthX, intitialHeightPx, minWidthPx) {

    var map, monsters, self, showBoard, showMonsterCards;

    monsters = [];
    self = this;

    setupMap();    

    this.setShowBoard = function (show) {
        showBoard = show;
    };
    
    this.setShowMonsterCards = function (show) {
        showMonsterCards = show;
    };

    this.areEntrancesFree = function() {
        var status = [];
        for (var i = 1; i <= 5; i++) {
            status.push(isEntranceFree(i));
        }
        return status;
    };

    function isEntranceFree(i) {
        var pp, type;
        type = getExitTileType(i);
        pp = map.findPositionOfType(type);
        return !map.hasPlayer(pp.x, pp.y);
    }

    this.getTileAt = function(x, y) {
        return map.getTileAt(x, y).getTile();
    };

    this.getCharacterAt = function (x, y) {
        return map.getTileAt(x, y).getPlayers()[0];
    };
    
    this.playerEnters = function(player, i) {
        var pp, type;
        type = getExitTileType(i);
        pp = map.findPositionOfType(type);
        self.movePlayerTo(pp.x, pp.y, player);
    };

    function isCharacterInDungeon(checkMonsters) {
        var allCharacters = map.getAllCharacters();
        var isCharacterLeft = false;
        var i = allCharacters.length;
        while (i--) {
            if (allCharacters[i].isPlayer() && !checkMonsters || !allCharacters[i].isPlayer() && checkMonsters) {
                isCharacterLeft = true;
                break;
            }
        }
        return isCharacterLeft;
    }

    this.isPlayerInDungeon = function() {
        return isCharacterInDungeon(false);
    };
    
    this.isMonsterInDungeon = function () {
        return isCharacterInDungeon(true);
    };

    this.playerLeaves = function(player) {

        map.removePlayer(player);
        
        // if all players left - reset dungeon
        if (!isCharacterInDungeon(false)) {
            levelUpDeadMonsters();
            positionMonsters();
            resetTiles();
            
            // trigger special tutorial after last player leaves
            game.showLastHeroLeavesDungeonTutorial();
        }
    };

    this.movePlayerTo = function (x, y, player) {
        if (player.setIsInDungeon) {
            player.setIsInDungeon(true);
        }
        map.movePlayerTo(x, y, player);
    };

    this.getAbsolutePosition = function (x, y) {
        var coords = map.getTileCoords(x - 0.5, y);
        return coords;
    };

    this.render = function (mapDiv, monsterDiv, currentPlayer, doesCurrentTileHaveAction) {
        mapDiv.empty();
        monsterDiv.empty();
        if (showBoard) {
            map.render(mapDiv, currentPlayer, false, game.clickOnDungeonTile, doesCurrentTileHaveAction, true);
            if (showMonsterCards) {
                appendMonsters(monsterDiv, currentPlayer, $(monsterDiv).width(), $(mapDiv).height());
            }
        }
    };

    function appendMonsters(monsterDiv, currentPlayer, monsterDivWidth, dungeonMapHeight) {
        var i, l, isControlled;
        for (i = 0, l = monsters.length; i < l; i++) {
            isControlled = currentPlayer && currentPlayer.isMonsterPlayer() && currentPlayer.getControlledMonster() === monsters[i];
            monsterDiv.append(monsters[i].render(monsterDivWidth, dungeonMapHeight, currentPlayer && currentPlayer.isMonsterPlayer(), isControlled));
        }
    }
    
    function setupMap() {
        map = new HexagonMap(15, 15, 0, -1.5, false, intitialWidthX, intitialHeightPx, minWidthPx, true);

        map.addTile(4, 0, new HexagonMapTile(new Tile(TileType.DUNGEONEXIT2), 0));
        
        map.addTile(3, 1, new HexagonMapTile(new Tile(TileType.DUNGEONFLOOR), 0));
        map.addTile(4, 1, new HexagonMapTile(new Tile(TileType.DUNGEONEXIT3), 0));

        map.addTile(0, 2, new HexagonMapTile(new Tile(TileType.DUNGEONEXIT1), 0));
        map.addTile(1, 2, new HexagonMapTile(new Tile(TileType.DUNGEONFLOOR), 0));
        map.addTile(2, 2, new HexagonMapTile(new Tile(TileType.DUNGEONTRAP), 0));
        map.addTile(3, 2, new HexagonMapTile(new Tile(TileType.DUNGEONFLOOR), 0));

        map.addTile(1, 3, new HexagonMapTile(new Tile(TileType.DUNGEONTRAP), 0));
        map.addTile(2, 3, new HexagonMapTile(new Tile(TileType.DUNGEONFLOOR), 0));
        map.addTile(3, 3, new HexagonMapTile(new Tile(TileType.DUNGEONTRAP), 0));
        map.addTile(4, 3, new HexagonMapTile(new Tile(TileType.DUNGEONTRAP), 0));
        
        map.addTile(1, 4, new HexagonMapTile(new Tile(TileType.DUNGEONFLOOR), 0));
        map.addTile(2, 4, new HexagonMapTile(new Tile(TileType.DUNGEONTREASURE), 0));
        map.addTile(4, 4, new HexagonMapTile(new Tile(TileType.DUNGEONEXIT4), 0));

        map.addTile(0, 5, new HexagonMapTile(new Tile(TileType.DUNGEONFLOOR), 0));
        map.addTile(1, 5, new HexagonMapTile(new Tile(TileType.DUNGEONFLOOR), 0));
        map.addTile(2, 5, new HexagonMapTile(new Tile(TileType.DUNGEONFLOOR), 0));
        map.addTile(3, 5, new HexagonMapTile(new Tile(TileType.DUNGEONFLOOR), 0));

        map.addTile(0, 6, new HexagonMapTile(new Tile(TileType.DUNGEONTRAP), 0));
         
        map.addTile(0, 7, new HexagonMapTile(new Tile(TileType.DUNGEONFLOOR), 0));
        map.addTile(1, 7, new HexagonMapTile(new Tile(TileType.DUNGEONEXIT5), 0));
    }

    function resetTiles() {
        self.setupTraps();
        self.setupTreasure();  
    }

    this.markTreasureTaken = function() {
        var p = map.findPositionOfType(TileType.DUNGEONTREASURE);
        map.setChip(p.x, p.y, null);
    };

    this.markTrapOpen = function (x, y) {
        map.setChip(x, y, ChipType.TRAPOPEN);
    };

    this.markTrapRemoved = function (x, y) {
        map.setChip(x, y, null);
    };

    this.markNonTrapOpen = function (x, y) {
        map.setChip(x, y, null);
    };

    this.checkDeadMonsters = function() {
        var i = monsters.length;
        while (i--) {
            // remove dead monsters from the map
            if (monsters[i].isDead()) {
                map.removePlayer(monsters[i]);
            }
        }
    };

    this.setupTraps = function () {
        var types = [ChipType.TRAPCLOSED, ChipType.TRAPCLOSED, ChipType.NOTRAPCLOSED, ChipType.NOTRAPCLOSED, ChipType.NOTRAPCLOSED];
        types = Utils.randomizeArray(types);

        // set trap chips
        map.setChip(2, 2, types[0]);
        map.setChip(1, 3, types[1]);
        map.setChip(3, 3, types[2]);
        map.setChip(4, 3, types[3]);
        map.setChip(0, 6, types[4]);
    };

    this.setupTreasure = function () {
        // set treasure chip
        map.setChip(2, 4, ChipType.TREASURE);
    };

    this.setupMonsters = function() {
        monsters = [];
        
        var levels = Utils.randomizeArray([0, 1, 2]);

        monsters.push(new Monster(MonsterType.ZIPFLER, levels[0]));
        monsters.push(new Monster(MonsterType.ULUMUTU, levels[1]));
        monsters.push(new Monster(MonsterType.WALLROG, levels[2]));

        positionMonsters();
    };

    this.showMonsterHearts = function() {
        var i = monsters.length;
        while (i--) {
            monsters[i].setDoesShowLives();
        }
    };

    this.showMonsterTeeth = function() {
        var i = monsters.length;
        while (i--) {
            monsters[i].setDoesShowTeeth();
        }
    };

    function levelUpDeadMonsters() {
        var i = monsters.length;
        while (i--) {
            if (monsters[i].isDead()) {
                monsters[i].reset();
            }
        }
    }

    function positionMonsters() {
        var i;

        // remove all to avoid collisions
        i = monsters.length;
        while (i--) {
            map.removePlayer(monsters[i]);
        }

        // add all to start positions
        i = monsters.length;
        while (i--) {           
            map.movePlayerTo(monsters[i].getStartX(), monsters[i].getStartY(), monsters[i]);
        }
    }

    function getExitTileType(i) {
        switch (i) {
            case 1:
                return TileType.DUNGEONEXIT1;
            case 2:
                return TileType.DUNGEONEXIT2;
            case 3:
                return TileType.DUNGEONEXIT3;
            case 4:
                return TileType.DUNGEONEXIT4;
            case 5:
                return TileType.DUNGEONEXIT5;
        }
        throw new Error("Invalid dungeon exit number: " + i);
    }
}