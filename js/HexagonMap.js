function HexagonMap(width, height, offsetX, offsetY, allowMultiplePlayers, intitialWidthPx, intitialHeightPx, minWidthPx, isDungeon) {

    var stage, map, self, animation, animationPosition = 0, tileRadius, tileWidth, scale;

    tileRadius = 35;
    tileWidth = tileRadius * Math.sqrt(3);

    self = this;

    map = new Array(width);

    var i = width;
    while (i--) {
        map[i] = new Array(height);
    }

    this.hasPlayer = function (x, y) {
        return map[x][y].hasPlayer();
    };

    this.setChip = function (x, y, value) {
        map[x][y].setChip(value);
    };

    this.findPositionOfType = function (type) {
        var x, y, tile;

        for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {
                tile = map[x][y];
                if (tile) {
                    if (tile.hasType(type)) {
                        return { x: x, y: y };
                    }
                }
            }
        }
        return null;
    };

    this.findPositionOfPlayer = function (player) {
        var x, y, tile;

        for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {
                tile = map[x][y];
                if (tile) {
                    if (tile.containsPlayer(player)) {
                        return { x: x, y: y };
                    }
                }
            }
        }

        return null;
    };

    this.getAllCharacters = function () {
        var x, y, tile, characters;

        characters = [];

        for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {
                tile = map[x][y];
                if (tile) {
                    characters = characters.concat(tile.getPlayers());
                }
            }
        }

        return characters;
    };

    this.getTileCoords = function (x, y) {
        return { x: scale * calculateX(x, y), y: scale * calculateY(x, y) };
    };

    function getNeighbourTiles(x, y) {
        var tiles = [];
        if (x > 0 && map[x - 1][y]) tiles.push(map[x - 1][y]);
        if (x > 0 && map[x - 1][y + 1]) tiles.push(map[x - 1][y + 1]);
        if (map[x][y - 1]) tiles.push(map[x][y - 1]);
        if (map[x][y + 1]) tiles.push(map[x][y + 1]);
        if (x < width - 1 && map[x + 1][y - 1]) tiles.push(map[x + 1][y - 1]);
        if (x < width - 1 && map[x + 1][y]) tiles.push(map[x + 1][y]);
        return tiles;
    }

    this.getRandomPosition = function () {
        var tile = null, pos = null;
        while (!tile) {
            pos = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
            tile = map[pos.x][pos.y];
        }
        return pos;
    }

    this.movePlayerTo = function (x, y, player) {

        self.removePlayer(player);

        var tile = map[x][y];

        if (tile.hasPlayer() && !allowMultiplePlayers) {
            throw new Error("Only one player allowed on this map.");
        }

        tile.addPlayer(player);
        player.setCurrentTile(tile, getNeighbourTiles(x, y));
    };

    this.removePlayer = function (player) {
        var pp = self.findPositionOfPlayer(player);
        if (pp) {
            var tile = map[pp.x][pp.y];
            tile.removePlayer(player);
            player.setCurrentTile(null, []);
        }
    };

    this.addTile = function (x, y, tile) {
        map[x][y] = tile;
    };

    this.getTileAt = function (x, y) {
        return map[x][y];
    };

    this.getWidth = function () {
        return map.length;
    };

    this.getHeight = function () {
        return map[0].length;
    };

    function calculateX(x, y) {
        if (isDungeon) {
            return tileRadius + (x + offsetX) * 1.5 * tileRadius + 9;
        } else {
            return tileRadius - 6 /*? calculatable ?*/ + (x + offsetX) * tileWidth + (y + offsetY) * tileWidth / 2.0;
        }
    }

    function calculateY(x, y) {
        if (isDungeon) {
            return tileWidth * (y + offsetY) + (x + offsetX) * (tileWidth / 2.0) + 38;
        } else {
            return tileRadius + 1.5 * tileRadius * (y + offsetY);
        }
    }

    this.render = function (mapDiv, currentPlayer, cardsLeft, clickFunction, doesCurrentTileHaveAction) {
        var x, y, mX, mY, pp, hexagon, shadowGroup, group, playerGroup, backgroundLayer, shadowLayer, layer, chipShadowLayer, chipLayer, playerLayer, tile, isPlayerTile, isNeighbourTile, isVisibleTile, clickFunc, cursorFunc, currentCharacter;

        // width was precalculated so just fit in
        scale = mapDiv.width() / intitialWidthPx;

        if (stage) {
            stage.destroyChildren();
            stage.destroy();
            stage = null;
        }

        stage = new Kinetic.Stage({
            container: mapDiv[0],
            width: intitialWidthPx * scale,
            height: intitialHeightPx * scale,
            scaleX: scale,
            scaleY: scale
        });


        shadowLayer = new Kinetic.Layer();
        layer = new Kinetic.Layer();
        chipShadowLayer = new Kinetic.Layer();
        chipLayer = new Kinetic.Layer();
        playerLayer = new Kinetic.Layer();

        backgroundLayer = new Kinetic.Layer();
        if (isDungeon) {
            var dungeonMap = new Kinetic.Rect({
                x: 0,
                y: 0,
                width: intitialWidthPx,
                height: intitialHeightPx,
                fillPatternImage: loader.getImage("dungeonboard.jpg"),
                fillPatternScaleX: 0.52,
                fillPatternScaleY: 0.52,
                fillPatternRepeat: 'no-repeat',
                stroke: null,
                strokeWidth: null,
                strokeEnabled: false,
                listening: false
            });
            backgroundLayer.add(dungeonMap);
        }


        if (currentPlayer && currentPlayer.isMonsterPlayer()) {
            currentCharacter = currentPlayer.getControlledMonster();
            pp = currentCharacter ? self.findPositionOfPlayer(currentCharacter) : null;
        } else {
            currentCharacter = currentPlayer;
            pp = self.findPositionOfPlayer(currentPlayer);
        }

        for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {

                isPlayerTile = pp && x === pp.x && y === pp.y;
                isNeighbourTile = pp && ((x === pp.x && (y === pp.y - 1 || y === pp.y + 1)) || (x === pp.x - 1 && (y === pp.y || y === pp.y + 1)) || (x === pp.x + 1 && (y === pp.y - 1 || y === pp.y)));

                // visible on surface map
                isVisibleTile = y > 1 && y < 9 &&
                                !(y === 2 && (x < 3 || x > 10)) &&
                                !(y === 3 && (x < 3 || x > 9)) &&
                                !(y === 4 && (x < 2 || x > 9)) &&
                                !(y === 5 && (x < 2 || x > 8)) &&
                                !(y === 6 && (x < 1 || x > 8)) &&
                                !(y === 7 && (x < 1 || x > 7)) &&
                                !(y === 8 && (x < 0 || x > 7));

                tile = map[x][y];

                // calculate position of polygon on screen
                mX = calculateX(x, y);
                mY = calculateY(x, y);

                // draw something
                if (tile || (isNeighbourTile && isVisibleTile && cardsLeft && currentPlayer && currentPlayer.hasStepsLeft())) {

                    shadowGroup = new Kinetic.Group({ x: mX + 1, y: mY + 2 });
                    group = new Kinetic.Group({ x: mX, y: mY });

                    // create click function - if player has steps left - or is teleporting
                    clickFunc = null;
                    cursorFunc = null;

                    if (currentPlayer && currentPlayer.isTeleporting()) {
                        // teleporting allows teleport to all possible fields
                        if (tile && !isPlayerTile && (allowMultiplePlayers || !tile.hasPlayer())) {
                            clickFunc = clickFunction;
                            cursorFunc = Utils.setTeleportCursor;
                        }
                    } else if (currentPlayer && currentPlayer.hasStepsLeft()) {
                        if (currentPlayer.isMonsterPlayer() && tile.hasPlayer() && !tile.getPlayers()[0].isPlayer() && currentPlayer.getControlledMonster() !== tile.getPlayers()[0]) {
                            // if its a tile with a monster and current player is monsterplayer
                            clickFunc = game.clickOnCharacterTile;
                            cursorFunc = Utils.setMonsterSelectCursor;
                        } else if (isNeighbourTile && tile && tile.hasPlayer() && !allowMultiplePlayers) {
                            // if its a neighbour tile with a character and on underground map - attackable
                            clickFunc = game.clickOnCharacterTile;
                            cursorFunc = Utils.setAttackCursor;
                        }
                        else {
                            clickFunc = isNeighbourTile && (!tile || !tile.hasChip(ChipType.TREASURE) || !currentPlayer.isMonsterPlayer()) && (allowMultiplePlayers || !tile.hasPlayer()) ? clickFunction : null;
                            cursorFunc = Utils.setWalkCursor;
                        }
                    }

                    // if this is the current tile - check possible player actions
                    if (clickFunc === null && isPlayerTile && doesCurrentTileHaveAction) {
                        clickFunc = game.clickOnPlayerTile;
                        cursorFunc = Utils.setActionCursor;
                    }

                    if (tile && !isDungeon) {
                        shadowGroup.add(createBlackHexagon(tileRadius));
                    }

                    hexagon = createHexagon(layer, x, y, tileRadius, tile, clickFunc, cursorFunc);
                    group.add(hexagon);

                    if (isDungeon && tile && tile.hasChip()) {

                        var chipShadowGroup = new Kinetic.Group({ x: mX + 1, y: mY + 2 });
                        var chipGroup = new Kinetic.Group({ x: mX, y: mY });

                        // add chip shadow
                        chipShadowGroup.add(createBlackCircle(tileRadius * 0.75));
                        chipGroup.add(createCircle(tileRadius * 0.75, tile));

                        chipShadowLayer.add(chipShadowGroup);
                        chipLayer.add(chipGroup);
                    }

                    /*
                    group.add(
                        new Kinetic.Text({
                            x: -5,
                            y: 25,
                            text: x + "/" + y,
                            fontSize: 8,
                            lineHeight: 1.0,

                            fill: 'black'
                        })
                    )
                    */

                    // add players if a real tile
                    if (tile && tile.getPlayers().length > 0) {
                        playerGroup = new Kinetic.Group({ x: mX, y: mY });

                        appendPlayers(tile, playerGroup, currentCharacter, playerLayer, currentPlayer && currentPlayer.hasStepsLeft());

                        playerLayer.add(playerGroup);
                    }

                    shadowLayer.add(shadowGroup);
                    layer.add(group);
                }
            }
        }

        if (isDungeon) {
            stage.add(backgroundLayer);
            stage.add(layer);
            stage.add(chipShadowLayer);
            stage.add(chipLayer);
        } else {
            stage.add(shadowLayer);
            stage.add(layer);
        }

        stage.add(playerLayer);
    };

    function appendPlayers(tile, group, currentCharacter, layer, currentPlayerHasStepsLeft) {
        var token, triangle, count;

        count = tile.getPlayers().length;

        $.each(tile.getPlayers(), function (i, character) {
            var px, py;

            px = (count <= 1 ? 0 : (i % 2) * 25 - 12);
            py = (count <= 2 ? 0 : Math.floor(i / 2) * 25 - 12);

            if (currentCharacter === character) {

                triangle = new Kinetic.RegularPolygon({
                    x: px,
                    y: py - 70,
                    sides: 3,
                    radius: 12,
                    fill: character.getColor(),
                    stroke: 'black',
                    strokeWidth: 1,
                    rotation: 60,
                    listening: false
                });
                group.add(triangle);
                if (animation != null) {
                    animation.stop();
                    animation = null;
                }

                animation = new Kinetic.Animation(function (frame) {
                    animationPosition += frame.timeDiff;
                    var delta = (Math.cos(animationPosition / 125.0)) * 5;
                    triangle.setPosition({ x: px, y: py - 70 + delta });
                }, layer);
                animation.start();

            }

            token = new Kinetic.Rect({
                x: px - 40,
                y: py - 60,
                width: 84,
                height: 84,
                fillPatternImage: character.getImage(),
                opacity: 1,
                fillPatternScaleX: 0.75,
                fillPatternScaleY: 0.75,
                fillPatternRepeat: 'no-repeat',
                stroke: null,
                strokeWidth: null,
                strokeEnabled: false,
                listening: false
            });

            group.add(token);
        });
    }

    function createCircle(radius, tile) {
        var circle = new Kinetic.Circle({
            x: 0,
            y: 0,
            sides: 6,
            radius: radius,
            fillPatternImage: tile.getChipImage(),
            fillPatternX: 28,
            fillPatternY: 28,
            fillPatternScaleX: 0.55,
            fillPatternScaleY: 0.55,
            stroke: 'black',
            strokeWidth: 0.5,
            listening: false
        });
        return circle;
    }


    function createBlackCircle(radius) {
        var circle = new Kinetic.Circle({
            x: 0,
            y: 0,
            sides: 6,
            radius: radius,
            fill: '#000',
            listening: false
        });
        return circle;
    }

    function createBlackHexagon(radius) {
        var hexagon = new Kinetic.RegularPolygon({
            x: 0,
            y: 0,
            rotation: isDungeon ? -30 : 0,
            sides: 6,
            radius: radius,
            fill: '#000',
            listening: false
        });
        return hexagon;
    }

    function createHexagon(layer, x, y, radius, tile, clickFunction, cursorFunction) {

        var hexagon = new Kinetic.RegularPolygon({
            x: 0,
            y: 0,
            sides: 6,
            rotation: (isDungeon ? -30 : 0) + (tile ? tile.getAngle() : 0),
            radius: radius,
            fill: tile ? null : '#FFF',
            opacity: tile ? 1.0 : (isDungeon ? 0.0 : 0.1),
            fillPatternImage: tile && !isDungeon ? tile.getImage() : null,
            fillPatternX: 31,
            fillPatternY: 35,
            fillPatternScaleX: 0.44,
            fillPatternScaleY: 0.44,
            stroke: isDungeon || tile ? null : 'black',
            strokeWidth: 0.5
        });

        // attach event if provided
        if (clickFunction && game.isRunning()) {
            hexagon.on('mouseover touchstart', function () {

                cursorFunction();

                if (!isDungeon) {
                    if (!tile) {
                        this.opacity(0.6);
                    } else {
                        this.opacity(1.0);
                    }
                    layer.draw();
                }

            });

            hexagon.on('mouseout touchend', function () {

                Utils.setDefaultCursor();

                if (!isDungeon) {
                    if (!tile) {
                        this.opacity(0.1);
                    } else {
                        this.opacity(1.0);
                    }
                    layer.draw();
                }
            });

            hexagon.on('click tap', function () {

                Utils.setDefaultCursor();

                if (!isDungeon) {
                    if (!tile) {
                        this.opacity(0.1);
                    } else {
                        this.opacity(1.0);
                    }
                    layer.draw();
                }
                clickFunction(x, y);
            });
        }

        return hexagon;
    }
}