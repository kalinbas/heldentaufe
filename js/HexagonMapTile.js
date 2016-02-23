function HexagonMapTile(tile, angle) {

    var players = [], chipType = null;

    this.getAngle = function () {
        return angle;
    };

    this.setChip = function (c) {
        chipType = c;
    };
  
    this.hasChip = function (c) {
        if (c) {
            return chipType === c;
        }
        return chipType;        
    };

    this.getPlayers = function () {
        return players;
    };

    this.hasPlayer = function () {
        return players.length > 0;
    };

    this.hasOtherPlayerWithPoints = function (currentPlayer) {
        var i, l;
        for (i = 0, l = players.length; i < l; i++) {
            if (players[i] !== currentPlayer) {
                if (players[i].getPoints() > 0) {
                    return true;
                }
            }           
        }
        return false;
    };

    this.removeOtherPlayerPoint = function (currentPlayer) {
        var i, l;
        for (i = 0, l = players.length; i < l; i++) {
            if (players[i] !== currentPlayer) {
                if (players[i].getPoints() > 0) {
                    players[i].addPoints(-1);
                    return;
                }
            }
        }       
    };

    this.containsPlayer = function (player) {
        return (players.indexOf(player) >= 0);
    };

    this.addPlayer = function (player) {
        players.push(player);
    };

    this.removePlayer = function (player) {
        var index = players.indexOf(player);
        if (index > -1) {
            players.splice(index, 1);
        }
    };

    this.hasType = function (typeToCheck) {
        return tile.hasType(typeToCheck);
    };

    this.changeType = function (typeToChange) {
        tile.changeType(typeToChange);
    };

    this.getImage = function () {
        return loader.getImage(tile.getImageName());
    };

    this.getChipImage = function () {
        return loader.getImage(chipType.image);
    };

    this.getLabel = function () {
        return tile.toString();
    };

    this.getTile = function () {
        return tile;
    };
}