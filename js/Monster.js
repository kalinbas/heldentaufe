function Monster(type, startLevel) {

    var level, lives, currentTile, neighbourTiles, self, doesShowLives, doesShowTeeth, lastDice, lastTotal, lastWasAttacker;

    self = this;

    level = startLevel;
    lives = getLives();

    currentTile = null;
    neighbourTiles = [];

    this.getNeighbourTiles = function () {
        return neighbourTiles;
    };

    this.setDoesShowLives = function () {
        doesShowLives = true;
    };
    
    this.setLastFightResults = function (dice, total, wasAttacker) {
        lastDice = dice;
        lastTotal = total;
        lastWasAttacker = wasAttacker;
    };

    this.setDoesShowTeeth = function () {
        doesShowTeeth = true;
    };

    this.isPlayer = function () {
        return false;
    };

    this.getCurrentLifes = function () {
        return lives;
    };

    this.getNameKey = function () {
        return type.nameKey;
    };

    this.getName = function () {
        return $.i18n.prop(type.nameKey);
    };

    this.getImage = function () {
        return loader.getImage(type.tokenImage);
    };
    
    this.getCssClass = function () {
        return type.cssClass;
    };
   
    this.isDead = function () {
        return lives <= 0;
    };

    this.getStartX = function () {
        return type.x;
    };

    this.getStartY = function () {
        return type.y;
    };

    function getPower() {
        return type.stats[level].power;
    }

    this.getPortraitImage = function () {
        return type.portraitImage;
    };

    function getLives() {
        return type.stats[level].lives;
    }

    this.getColor = function () {
        return type.color;
    };

    this.calculatePower = function () {
        return getPower();
    };

    this.recieveDamage = function (amount, enemy) {
        lives -= amount;
    };

    this.getReward = function () {
        return level + 1;
    };

    this.levelUp = function () {
        if (level < 4) {
            level++;
        }
    };

    this.reset = function () {
        lives = getLives();
    };

    this.setCurrentTile = function (tile, neighbours) {
        currentTile = tile;
        neighbourTiles = neighbours;
    };

    this.renderPlayerBoard = function() {
        return self.render();
    };

    this.render = function (width, dungeonMapHeight, isSelectable, isControlled) {

        var div;
        var renderFull = !width;

        if (!renderFull) {
            // factor
            var factor = (width / 120.0);
            var scaleFactor = factor * 0.3;
            var height = 60 * factor;
            var marginTop = (dungeonMapHeight - 3 * height) / 4;

            // scale according to width
            div = $("<div>").addClass("monsterBoard shadowed").addClass("clearfix").addClass(type.cssClass).css("width", width + "px").css("height", height + "px").css("margin-top", marginTop + "px");
            div.css("transform", "scale(" + scaleFactor + ", " + scaleFactor + ")");
            div.css("mozTransform", "scale(" + scaleFactor + ", " + scaleFactor + ")");
            div.css("msTransform", "scale(" + scaleFactor + ", " + scaleFactor + ")");
            div.css("oTransform", "scale(" + scaleFactor + ", " + scaleFactor + ")");
            div.css("webkitTransform", "scale(" + scaleFactor + ", " + scaleFactor + ")");


            if (isSelectable && !isControlled && !self.isDead()) {
                div.addClass("clickable").click(function() { game.clickOnControllableMonster(self); });
            }

            if (isControlled) {
                div.addClass("controlled");
            }

            if (self.isDead()) {
                div.addClass("dead");
            }
        } else {
            div = $("<div>").addClass("monsterBoard shadowed").addClass("clearfix").addClass(type.cssClass);
            if (lastDice) {
                div.append($("<div>").addClass("dice dice" + (lastWasAttacker ? "White" : "Black") + " dice" + lastDice));
            }
        }

        div.append($("<img>").addClass("board").attr("src", "img/" + type.boardImage));
        if (doesShowLives) {
            for (var i = 0; i < lives; i++) {
                div.append($("<img>").addClass("heart heart" + (i + 1) + " shadowed").attr("src", "img/heart.png"));
            }
        }
        if (doesShowTeeth) {
            i = 5 - level;
            while (i--) {
                div.append($("<img>").addClass("level level" + (i + 1 + level) + " shadowed").attr("src", "img/tooth" + (i + 1 + level) + ".png"));
            }
        }
        return div;
    };
}