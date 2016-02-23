function Player(type) {

    var allItems, missionCards, stepsInTurn, points, lives, currentTile, neighbourTiles, berserkerBonus, teleportMode, usedTeleportThisTurn, usedCastleThisTurn, usedTraderThisTurn, isInDungeon, controlledMonster, self;
    var hasFocus, hasMissionFocus, hasPointsFocus, hasStepFocus, doesShowLives, lastDice, lastTotal, lastWasAttacker;

    if (type === PlayerType.MONSTERPLAYER) {
        hasFocus = true;
        hasStepFocus = true;
    }

    self = this;

    allItems = [];
    //allItems = [new Item(ItemType.APPLE), new Item(ItemType.FISH), new Item(ItemType.MUSHROOM), new Item(ItemType.POTION, 3), new Item(ItemType.SWORD, 3), new Item(ItemType.RING, 3), new Item(ItemType.BOOT, 3)];
    //allItems = [new Item(ItemType.APPLE), new Item(ItemType.FISH), new Item(ItemType.MUSHROOM), new Item(ItemType.SWORD, 3), new Item(ItemType.RING, 3), new Item(ItemType.BOOT, 3)];
    //allItems = [new Item(ItemType.POTION, 2), new Item(ItemType.SWORD, 1), new Item(ItemType.RING, 1), new Item(ItemType.BOOT, 1), new Item(ItemType.SWORD, 1), new Item(ItemType.RING, 1), new Item(ItemType.BOOT, 1)];
    //allItems = [new Item(ItemType.POTION, 2), new Item(ItemType.POTION, 2), new Item(ItemType.POTION, 2)];
    //allItems = [new Item(ItemType.RING, 1), new Item(ItemType.RING, 2), new Item(ItemType.RING, 2), new Item(ItemType.SWORD, 1), new Item(ItemType.SWORD, 2)];

    missionCards = [];

    points = 0;
    berserkerBonus = 0;
    teleportMode = false;
    usedTeleportThisTurn = false;
    usedCastleThisTurn = false;
    usedTraderThisTurn = false;

    // only monster player starts in dungeon
    isInDungeon = isMonsterPlayer();

    lives = type.lives;

    currentTile = null;
    neighbourTiles = [];

    controlledMonster = null;

    this.setFocus = function (focus) {
        hasFocus = focus;
    };

    this.setMissionFocus = function (focus) {
        hasMissionFocus = focus;
    };

    this.setPointsFocus = function (focus) {
        hasPointsFocus = focus;
    };

    this.getCurrentLifes = function () {
        return lives;
    };

    this.setHasStepFocus = function (focus) {
        hasStepFocus = focus;
    };

    this.setLastFightResults = function (dice, total, wasAttacker) {
        lastDice = dice;
        lastTotal = total;
        lastWasAttacker = wasAttacker;
    };

    this.getHasStepFocus = function () {
        return hasStepFocus;
    };

    this.setDoesShowLives = function () {
        doesShowLives = true;
    };

    this.isPlayer = function () {
        return true;
    };

    this.getName = function () {
        return $.i18n.prop(type.nameKey);
    };

    this.getColor = function () {
        return type.color;
    };

    this.getCssClass = function () {
        return type.cssClass;
    };

    this.getImage = function () {
        return loader.getImage(type.tokenImage);
    };

    function isMonsterPlayer() {
        return type === PlayerType.MONSTERPLAYER;
    }

    this.isTeleporting = function () {
        return teleportMode;
    };

    this.removeTeleporting = function () {
        teleportMode = false;
    };

    this.isMonsterPlayer = function () {
        return isMonsterPlayer();
    };

    this.getControlledMonster = function () {
        return controlledMonster;
    };

    this.setControlledMonster = function (monster) {
        controlledMonster = monster;
    };

    this.isAlmostDead = function () {
        return lives === 1;
    };

    this.isDead = function () {
        return lives <= 0;
    };

    this.isInDungeon = function () {
        return isInDungeon;
    };

    this.setIsInDungeon = function (inDungeon) {
        isInDungeon = inDungeon;
    };

    this.hasWonGame = function (targetTeeth) {
        return points >= targetTeeth && currentTile && currentTile.hasType(TileType.VILLAGE);
    };

    this.calculatePower = function () {
        return calculatePower();
    };

    this.calculateMagic = function () {
        return calculateMagic();
    };

    this.getPoints = function () {
        return points;
    };

    this.setPoints = function (p) {
        points = p;
    };

    this.resetForNewTurn = function () {
        stepsInTurn = calculateSteps();
        controlledMonster = null;
    };

    this.resetForResurrection = function () {

        // reset lives
        lives = type.lives;

        stepsInTurn = 0;
        berserkerBonus = 0;
    };

    this.removeAllItems = function () {
        allItems = [];
    };

    this.hasStepsLeft = function () {
        return stepsInTurn > 0;
    };

    this.recieveDamage = function (amount, enemy) {
        lives -= amount;
    };

    this.removeStep = function () {
        if (stepsInTurn > 0) {
            stepsInTurn--;
        } else {
            throw new Error("Removed step without having step left.");
        }
    };

    this.removeAllSteps = function () {
        stepsInTurn = 0;
    };

    this.endTurn = function () {
        usedTeleportThisTurn = false;
        usedCastleThisTurn = false;
        usedTraderThisTurn = false;
    };

    this.standsOn = function (tileType) {
        return currentTile.hasType(tileType);
    };

    this.standsOnChip = function (chipType) {
        return currentTile.hasChip(chipType);
    };

    this.getLatestBackPackIndex = function () {
        return getBackpackItemCount();
    };

    this.getPortraitImage = function () {
        return type.portraitImage;
    };

    this.handleBackpackOverloadedDialog = function (afterFunction) {
        if (isBackpackOverloaded()) {
            var bestSword = getFirstBestItem(ItemType.SWORD);
            var bestBoot = getFirstBestItem(ItemType.BOOT);
            var bestRing = getFirstBestItem(ItemType.RING);

            game.showDialog(Dialog.createForcedDiscardDialog(allItems, bestSword, bestBoot, bestRing, self.discardItemAndCheckIfOverloaded), afterFunction);
        } else {
            if (afterFunction) {
                afterFunction();
            }
        }
    };

    this.hasBackpackSpace = function () {
        return hasBackpackSpace();
    };

    this.getMissionType = function (index) {
        return missionCards[index].getType();
    };

    this.needsNewMissionCard = function () {
        return missionCards.length < 3;
    };

    function isBackpackOverloaded() {
        return getBackpackItemCount() > type.backpackCapacity;
    };

    function hasBackpackSpace() {
        return getBackpackItemCount() < type.backpackCapacity;
    }

    function getBackpackItemCount() {
        var count = 0;
        count += getItemCount(ItemType.APPLE);
        count += getItemCount(ItemType.FISH);
        count += getItemCount(ItemType.MUSHROOM);
        count += Math.max(0, getItemCount(ItemType.SWORD) - 1);
        count += Math.max(0, getItemCount(ItemType.RING) - 1);
        count += Math.max(0, getItemCount(ItemType.BOOT) - 1);
        return count;
    }

    function getFirstBestItem(typeToCheck) {
        var i = allItems.length, bestItem = null;
        while (i--) {
            if (allItems[i].hasType(typeToCheck) && (!bestItem || bestItem.getLevel() < allItems[i].getLevel())) {
                bestItem = allItems[i];
            }
        }
        return bestItem;
    }

    function getBestItemLevel(typeToCheck) {
        var item = getFirstBestItem(typeToCheck);
        return item ? item.getLevel() : 0;
    }

    function hasPotionSpace() {
        var count = getItemCount(ItemType.POTION);
        return count < type.potionCapacity;
    }

    function addItemToBackpack(item) {

        // modify steps if it is a better boot
        if (item.hasType(ItemType.BOOT)) {
            var bestLevelBefore = getBestItemLevel(ItemType.BOOT);
            if (bestLevelBefore < item.getLevel()) {
                stepsInTurn += item.getLevel() - bestLevelBefore;
            }
        }

        // add item
        allItems.push(item);
    }

    this.addItemToBackpack = function (item) {
        addItemToBackpack(item);
    };

    this.addMissionCard = function (card, i) {
        missionCards.splice(i, 0, card);
    };

    this.pushMissionCard = function (card) {
        missionCards.push(card);
    };

    this.removeMissionCard = function (i) {
        var card = missionCards[i];
        missionCards.splice(i, 1);
        return card;
    };

    this.getCreatablePotions = function () {

        var potions = [];
        if (hasPotionSpace()) {
            var magic = calculateMagic();
            var i1 = getFirstItemIndex(ItemType.APPLE);
            var i2 = getFirstItemIndex(ItemType.FISH);
            var i3 = getFirstItemIndex(ItemType.MUSHROOM);
            if (magic >= 1 && i1 >= 0 && i2 >= 0) {
                potions.push({ level: 1, i1: i1, i2: i2 });
            }
            if (magic >= 2 && i1 >= 0 && i3 >= 0) {
                potions.push({ level: 2, i1: i1, i2: i3 });
            }
            if (magic >= 3 && i2 >= 0 && i3 >= 0) {
                potions.push({ level: 3, i1: i2, i2: i3 });
            }
        }
        return potions;
    };

    this.getFinishableMission = function () {
        var i, l;
        for (i = 0, l = missionCards.length; i < l; i++) {
            var missionCard = missionCards[i];
            var isMissionReady = checkIfMissionReady(missionCard);
            if (isMissionReady) {
                return i;
            }
        }
        return null;
    };

    this.createPotion = function (i1, i2, level) {
        remove2ItemsAt(i1, i2);
        addItemToBackpack(new Item(ItemType.POTION, level));
    };

    this.doCurrentTileAction = function (traderAfterFunction) {
        if (currentTile.hasType(TileType.MUSHROOM)) {
            takeRessource(1);
        } else if (currentTile.hasType(TileType.FISH)) {
            takeRessource(2);
        } else if (currentTile.hasType(TileType.APPLE)) {
            takeRessource(3);
        } else if (currentTile.hasType(TileType.TRADER)) {
            game.showDialog(Dialog.createTraderDialog(!usedTraderThisTurn, allItems, self.changeItemType), function () {
                self.handleBackpackOverloadedDialog(function () {
                    // render only after discarding         
                    traderAfterFunction();
                });
            });
        } else if (currentTile.hasType(TileType.CASTLE)) {
            game.showDialog(Dialog.createCastleDialog(!usedCastleThisTurn, allItems, self.improveItemWaiting));
        } else if (currentTile.hasType(TileType.SMITH)) {
            game.showDialog(Dialog.createSmithDialog(allItems, self.improveItems));
        } else if (currentTile.hasType(TileType.DUNGEON1) || currentTile.hasType(TileType.DUNGEON2) || currentTile.hasType(TileType.DUNGEON3) || currentTile.hasType(TileType.DUNGEON4) || currentTile.hasType(TileType.DUNGEON5)) {
            enterDungeon();
        } else if (currentTile.hasType(TileType.DUNGEONEXIT1) || currentTile.hasType(TileType.DUNGEONEXIT2) || currentTile.hasType(TileType.DUNGEONEXIT3) || currentTile.hasType(TileType.DUNGEONEXIT4) || currentTile.hasType(TileType.DUNGEONEXIT5)) {
            leaveDungeon();
        }
        return currentTile;
    };

    function addPoints(count) {
        points += count;
    }

    this.addPoints = function (count) {
        addPoints(count);
    };

    this.setCurrentTile = function (tile, neighbours) {
        currentTile = tile;
        neighbourTiles = neighbours;
    };

    function calculateSteps() {
        return type.steps + getBestItemLevel(ItemType.BOOT);
    }

    function calculatePower() {
        return type.power + getBestItemLevel(ItemType.SWORD) + berserkerBonus;
    }

    function calculateMagic() {
        return type.magic + getBestItemLevel(ItemType.RING);
    }

    this.doesCurrentTileHaveAction = function (areEntrancesFree) {

        var hasAction = currentTile && (
            (currentTile.hasType(TileType.DUNGEONEXIT1) && stepsInTurn > 0 && areEntrancesFree[0]) ||
                (currentTile.hasType(TileType.DUNGEONEXIT2) && stepsInTurn > 0 && areEntrancesFree[1]) ||
                (currentTile.hasType(TileType.DUNGEONEXIT3) && stepsInTurn > 0 && areEntrancesFree[2]) ||
                (currentTile.hasType(TileType.DUNGEONEXIT4) && stepsInTurn > 0 && areEntrancesFree[3]) ||
                (currentTile.hasType(TileType.DUNGEONEXIT5) && stepsInTurn > 0 && areEntrancesFree[4]) ||
                (currentTile.hasType(TileType.DUNGEON1) && stepsInTurn > 0 && areEntrancesFree[0]) ||
                (currentTile.hasType(TileType.DUNGEON2) && stepsInTurn > 0 && areEntrancesFree[1]) ||
                (currentTile.hasType(TileType.DUNGEON3) && stepsInTurn > 0 && areEntrancesFree[2]) ||
                (currentTile.hasType(TileType.DUNGEON4) && stepsInTurn > 0 && areEntrancesFree[3]) ||
                (currentTile.hasType(TileType.DUNGEON5) && stepsInTurn > 0 && areEntrancesFree[4]) ||
                (hasBackpackSpace() && (currentTile.hasType(TileType.FISH) || currentTile.hasType(TileType.APPLE) || currentTile.hasType(TileType.MUSHROOM))) ||
                (currentTile.hasType(TileType.SMITH) || currentTile.hasType(TileType.TRADER) || currentTile.hasType(TileType.CASTLE))
        );

        return hasAction;
    };

    function checkIfMissionReady(card) {
        var actionReady = false;
        if (currentTile) {
            if (card.hasType(MissionType.MISSION1)) {
                actionReady = getItemCount(ItemType.SWORD, 1) >= 1 && currentTile.hasType(TileType.CASTLE);
            } else if (card.hasType(MissionType.MISSION2)) {
                actionReady = getItemCount(ItemType.RING, 1) >= 1 && currentTile.hasType(TileType.CASTLE);
            } else if (card.hasType(MissionType.MISSION3)) {
                actionReady = getItemCount(ItemType.BOOT, 1) >= 1 && currentTile.hasType(TileType.CASTLE);
            } else if (card.hasType(MissionType.MISSION4)) {
                actionReady = getItemCount(ItemType.APPLE) >= 1 && getItemCount(ItemType.MUSHROOM) >= 1 && currentTile.hasType(TileType.FOREST);
            } else if (card.hasType(MissionType.MISSION5)) {
                actionReady = getItemCount(ItemType.APPLE) >= 1 && getItemCount(ItemType.FISH) >= 1 && currentTile.hasType(TileType.FOREST);
            } else if (card.hasType(MissionType.MISSION6)) {
                actionReady = getItemCount(ItemType.FISH) >= 1 && getItemCount(ItemType.MUSHROOM) >= 1 && currentTile.hasType(TileType.FOREST);
            } else if (card.hasType(MissionType.MISSION7)) {
                actionReady = currentTile.hasType(TileType.FISH);
            } else if (card.hasType(MissionType.MISSION8)) {
                actionReady = currentTile.hasType(TileType.MUSHROOM);
            } else if (card.hasType(MissionType.MISSION9)) {
                actionReady = currentTile.hasType(TileType.APPLE);
            } else if (card.hasType(MissionType.MISSION13)) {
                actionReady = points >= 1 && currentTile.hasType(TileType.VILLAGE) && getItemCount(ItemType.APPLE) >= 1;
            } else if (card.hasType(MissionType.MISSION14)) {
                actionReady = points >= 1 && currentTile.hasType(TileType.VILLAGE) && getItemCount(ItemType.MUSHROOM) >= 1;
            } else if (card.hasType(MissionType.MISSION15)) {
                actionReady = points >= 1 && currentTile.hasType(TileType.VILLAGE) && getItemCount(ItemType.FISH) >= 1;
            } else if (card.hasType(MissionType.MISSION16)) {
                actionReady = getItemCount(ItemType.POTION, 1) && currentTile.hasType(TileType.GRASS);
            } else if (card.hasType(MissionType.MISSION17)) {
                actionReady = getItemCount(ItemType.POTION, 1) && currentTile.hasType(TileType.GRASS);
            } else if (card.hasType(MissionType.MISSION18)) {
                actionReady = getItemCount(ItemType.POTION, 1) && currentTile.hasType(TileType.GRASS);
            } else if (card.hasType(MissionType.MISSION19)) {
                actionReady = currentTile.hasType(TileType.SMITH) && getItemCount(ItemType.APPLE) >= 4;
            } else if (card.hasType(MissionType.MISSION20)) {
                actionReady = currentTile.hasType(TileType.SMITH) && getItemCount(ItemType.FISH) >= 4;
            } else if (card.hasType(MissionType.MISSION21)) {
                actionReady = currentTile.hasType(TileType.SMITH) && getItemCount(ItemType.MUSHROOM) >= 4;
            } else if (card.hasType(MissionType.MISSION23)) {
                actionReady = currentTile.hasOtherPlayerWithPoints(self);
            }
        }
        return actionReady;
    }

    function getFirstItemIndex(typeToCheck, levelToCheck) {
        var i = allItems.length;
        while (i--) {
            if (allItems[i].hasType(typeToCheck) && (!levelToCheck || allItems[i].hasLevel(levelToCheck))) {
                return i;
            }
        }
        return -1;
    }

    function getItemCount(typeToCheck, levelToCheck) {
        var i = allItems.length, count = 0;
        while (i--) {
            if (allItems[i].hasType(typeToCheck) && (!levelToCheck || allItems[i].hasLevel(levelToCheck))) {
                count++;
            }
        }
        return count;
    }

    function removeItem(typeToCheck, level) {
        var i = getFirstItemIndex(typeToCheck, level);
        removeItemAt(i);
    }

    function removeItemAt(i, allowNegativeSteps) {
        if (i >= 0) {
            var item = allItems[i];
            allItems.splice(i, 1);

            // if best boot was removed - remove steps in turn
            if (item.hasType(ItemType.BOOT) && getBestItemLevel(ItemType.BOOT) < item.getLevel()) {
                stepsInTurn -= item.getLevel() - getBestItemLevel(ItemType.BOOT);
                if (stepsInTurn < 0 && !allowNegativeSteps) {
                    stepsInTurn = 0;
                }
            }
        } else {
            throw new Error("Tried to remove not existing item.");
        }
    }

    function remove2ItemsAt(i1, i2, allowNegativeSteps) {
        var min = Math.min(i1, i2);
        var max = Math.max(i1, i2);
        removeItemAt(max, allowNegativeSteps);
        removeItemAt(min, allowNegativeSteps);
    }

    this.changeItemType = function (i, itemType) {
        var item = allItems[i];

        removeItemAt(i);
        item.changeType(itemType);
        addItemToBackpack(item);

        usedTraderThisTurn = true;
    };

    this.improveItems = function (i1, i2) {
        var item = allItems[i2];

        remove2ItemsAt(i1, i2, true);

        item.increaseLevel();
        addItemToBackpack(item);
    };

    this.improveItemWaiting = function (i) {
        var item = allItems[i];
   
        removeItemAt(i, true);

        // increase level but remove steps
        item.increaseLevel();
       
        addItemToBackpack(item);

        // remove steps at the end because if a boot is improved a step is added - this should't happen here
        stepsInTurn = 0;
        usedCastleThisTurn = true;
    };

    function takeRessource(i) {
        if (i === 1) {
            addItemToBackpack(new Item(ItemType.MUSHROOM));
        } else if (i === 2) {
            addItemToBackpack(new Item(ItemType.FISH));
        } else {
            addItemToBackpack(new Item(ItemType.APPLE));
        }
    }

    function enterDungeon() {
        stepsInTurn -= 1;
    }

    function leaveDungeon() {
        berserkerBonus = 0;
        stepsInTurn -= 1;
    }

    this.attack = function (defender) {
        var attacker, attackerPower, defenderPower, attackerDice, defenderDice, looser;
        attacker = isMonsterPlayer() ? controlledMonster : self;

        attackerDice = Utils.getRandomNumber(1, 6);
        attackerPower = attacker.calculatePower() + attackerDice;

        defenderDice = Utils.getRandomNumber(1, 6);
        defenderPower = defender.calculatePower() + defenderDice;

        if (attackerPower >= defenderPower) {
            defender.recieveDamage(1, attacker);
            looser = defender;
        } else {
            attacker.recieveDamage(1, defender);
            looser = attacker;
        }

        attacker.setLastFightResults(attackerDice, attackerPower, true);
        defender.setLastFightResults(defenderDice, defenderPower, false);

        stepsInTurn -= 1;

        return looser;
    };

    this.executeTrapMissionIfAvailable = function () {
        var i = missionCards.length;
        while (i--) {
            if (missionCards[i].hasType(MissionType.MISSION22)) {
                finishMission(i);
                return i;
            }
        }
        return -1;
    };

    this.executeMonsterKillMissionsIfAvailable = function (monster) {
        var i = missionCards.length, monsterName = monster.getNameKey();
        while (i--) {
            if (missionCards[i].hasType(MissionType.MISSION10) && monsterName === MonsterType.ULUMUTU.nameKey) {
                finishMission(i);
                return i;
            } else if (missionCards[i].hasType(MissionType.MISSION11) && monsterName === MonsterType.WALLROG.nameKey) {
                finishMission(i);
                return i;
            } else if (missionCards[i].hasType(MissionType.MISSION12) && monsterName === MonsterType.ZIPFLER.nameKey) {
                finishMission(i);
                return i;
            }
        }
        return -1;
    };

    this.fulfillMission = function (i, param) {
        return finishMission(i, param);
    };

    function finishMission(i, param) {
        var mission = missionCards[i];
        if (mission.hasType(MissionType.MISSION1)) {
            removeItem(ItemType.SWORD, 1);
            addPoints(2);
        } else if (mission.hasType(MissionType.MISSION2)) {
            removeItem(ItemType.RING, 1);
            addPoints(2);
        } else if (mission.hasType(MissionType.MISSION3)) {
            removeItem(ItemType.BOOT, 1);
            addPoints(2);
        } else if (mission.hasType(MissionType.MISSION4)) {
            removeItem(ItemType.APPLE); removeItem(ItemType.MUSHROOM);
            addPoints(1);
        } else if (mission.hasType(MissionType.MISSION5)) {
            removeItem(ItemType.APPLE); removeItem(ItemType.FISH);
            addPoints(1);
        } else if (mission.hasType(MissionType.MISSION6)) {
            removeItem(ItemType.FISH); removeItem(ItemType.MUSHROOM);
            addPoints(1);
        } else if (mission.hasType(MissionType.MISSION7)) {            
            if (param) { addPoints(1); } else { addItemToBackpack(new Item(ItemType.BOOT, 1)); }
            stepsInTurn = 0;
        } else if (mission.hasType(MissionType.MISSION8)) {           
            if (param) { addPoints(1); } else { addItemToBackpack(new Item(ItemType.RING, 1)); }
            stepsInTurn = 0;
        } else if (mission.hasType(MissionType.MISSION9)) {            
            if (param) { addPoints(1); } else { addItemToBackpack(new Item(ItemType.SWORD, 1)); }
            stepsInTurn = 0;
        }
        else if (mission.hasType(MissionType.MISSION10) || mission.hasType(MissionType.MISSION11) || mission.hasType(MissionType.MISSION12)) {
            addPoints(2);
        } else if (mission.hasType(MissionType.MISSION13)) {
            removeItem(ItemType.APPLE);
            addPoints(-1);
            addItemToBackpack(new Item(ItemType.BOOT, 1));
        } else if (mission.hasType(MissionType.MISSION14)) {
            removeItem(ItemType.MUSHROOM);
            addPoints(-1);
            addItemToBackpack(new Item(ItemType.SWORD, 1));
        } else if (mission.hasType(MissionType.MISSION15)) {
            removeItem(ItemType.FISH);
            addPoints(-1);
            addItemToBackpack(new Item(ItemType.RING, 1));
        } else if (mission.hasType(MissionType.MISSION16)) {
            removeItem(ItemType.POTION, 1);
            addItemToBackpack(new Item(ItemType.BOOT, 2));
        } else if (mission.hasType(MissionType.MISSION17)) {
            removeItem(ItemType.POTION, 1);
            addItemToBackpack(new Item(ItemType.SWORD, 2));
        } else if (mission.hasType(MissionType.MISSION18)) {
            removeItem(ItemType.POTION, 1);
            addItemToBackpack(new Item(ItemType.RING, 2));
        } else if (mission.hasType(MissionType.MISSION19)) {
            addPoints(3);
            removeItem(ItemType.APPLE); removeItem(ItemType.APPLE); removeItem(ItemType.APPLE); removeItem(ItemType.APPLE);
        } else if (mission.hasType(MissionType.MISSION20)) {
            addPoints(3);
            removeItem(ItemType.FISH); removeItem(ItemType.FISH); removeItem(ItemType.FISH); removeItem(ItemType.FISH);
        } else if (mission.hasType(MissionType.MISSION21)) {
            addPoints(3);
            removeItem(ItemType.MUSHROOM); removeItem(ItemType.MUSHROOM); removeItem(ItemType.MUSHROOM); removeItem(ItemType.MUSHROOM);
        } else if (mission.hasType(MissionType.MISSION22)) {
            addPoints(2);
        } else if (mission.hasType(MissionType.MISSION23)) {
            addPoints(1);
            currentTile.removeOtherPlayerPoint(self);
        }
    }

    this.discardItemAndCheckIfOverloaded = function (i) {
        removeItemAt(i);
        return isBackpackOverloaded();
    };

    this.discardItem = function (i) {
        removeItemAt(i);
    };

    this.getItem = function (i) {
        return allItems[i];
    };

    this.useItem = function (i) {
        var item = allItems[i], itemWasUsed = false;

        if (item.hasType(ItemType.MUSHROOM) || item.hasType(ItemType.FISH) || item.hasType(ItemType.APPLE)) {
            // only allow when not full lives - otherwise discard mechanism
            if (lives < type.lives) {
                lives++;
                itemWasUsed = true;
            }
        } else if (item.hasType(ItemType.POTION)) {
            if (item.hasLevel(1)) {
                if (lives < type.lives) {
                    lives = type.lives;
                    itemWasUsed = true;
                }
            } else if (item.hasLevel(2)) {
                berserkerBonus += 3;
                itemWasUsed = true;
                game.showBerserkerTutorial();
            } else {
                if (!teleportMode) {
                    teleportMode = true;
                    usedTeleportThisTurn = true;
                    itemWasUsed = true;
                    game.showTeleportTutorial();
                }
            }
        }

        // remove after use - otherwise discard dialog will be shown
        if (itemWasUsed) {
            removeItemAt(i);
        }

        return itemWasUsed;
    };

    this.renderNotActive = function () {
        var panel = $("<div>").addClass("playerPortait shadowed").addClass(type.cssClass);
        var img = $("<img>").attr("src", "img/" + type.portraitImage);
        if (!isMonsterPlayer()) {
            panel.addClass("clickable");
            img.click(function (event) {
                event.stopPropagation();
                game.clickOnOtherPlayer(self);
            });
        }

        panel.append(img);
        return panel;
    };

    this.render = function (playerDiv, stepDiv) {

        $(playerDiv).empty();
        $(stepDiv).empty();

        if (hasFocus) {
            $(playerDiv).append(self.renderPlayerBoard(true));
        }

        if (!isMonsterPlayer()) {
            if (hasMissionFocus) {
                $(playerDiv).append(renderMissions());
            }
        }

        if (hasStepFocus) {
            stepDiv.append(renderStepBox());
        }
    };

    this.renderOther = function () {
        return self.renderPlayerBoard(false);
    };

    this.renderPlayerBoard = function (isCurrentPlayer) {
        var panel;
        if (isMonsterPlayer() && controlledMonster !== null) {
            panel = controlledMonster.renderPlayerBoard();
        } else {
            panel = $("<div>").addClass("playerBoard shadowed").addClass(type.cssClass);

            panel.addClass(isCurrentPlayer ? "current" : "other");

            panel.append($("<img>").addClass("board").attr("src", "img/" + type.boardImage));
            if (!isMonsterPlayer()) {
                appendEquippedItems(panel);
                appendBackpackItems(panel, isCurrentPlayer);
                appendPotionItems(panel, isCurrentPlayer);
                appendHearts(panel);
                if (hasPointsFocus) {
                    panel.append($("<div>").addClass("pointLabel shadowed").append($("<span>").text(points)).append($("<span>").text(game.getTargetTeeth())));
                }
                if (lastDice) {
                    panel.append($("<div>").addClass("dice dice" + (lastWasAttacker ? "White" : "Black") + " dice" + lastDice));
                }
            }
        }
        return panel;
    };

    function renderStepBox() {
        var stepBox = $("<div>").addClass("stepBox");

        var button = $("<img>").attr("src", stepsInTurn === 0 ? "img/nextbuttonred.png" : "img/nextbuttongreen.png");
        if (game.isRunning()) {
            button.addClass("clickable shadowed").click(function () { game.clickOnNextPlayer(); });
        }
        stepBox.append(button);

        if (stepsInTurn > 0) {
            stepBox.append($("<span>").text(stepsInTurn));
        }

        return stepBox;
    }

    this.toggleStepBox = function (isActive) {
        if (isActive) {
            $(".stepBox img").unbind("click");
            $(".stepBox img").removeClass("clickable");
        } else {
            $(".stepBox img").click(function () { game.clickOnNextPlayer(); });
            $(".stepBox img").addClass("clickable");
        }
    };

    function appendEquippedItems(panel) {
        var bestSword = getFirstBestItem(ItemType.SWORD);
        var bestBoot = getFirstBestItem(ItemType.BOOT);
        var bestRing = getFirstBestItem(ItemType.RING);

        if (bestSword) {
            panel.append(renderEquippedItem(bestSword, "item swordItem"));
        }
        if (bestBoot) {
            panel.append(renderEquippedItem(bestBoot, "item bootItem"));
        }
        if (bestRing) {
            panel.append(renderEquippedItem(bestRing, "item ringItem"));
        }

        // equipped pseudo potions
        if (berserkerBonus > 0) {
            panel.append($("<img>").attr("src", "img/potion2_back.png").addClass("item potion1Item shadowed"));
        }
        if (usedTeleportThisTurn) {
            panel.append($("<img>").attr("src", "img/potion3_back.png").addClass("item potion1Item shadowed"));
        }
    }

    function renderEquippedItem(item, className) {
        var itemImg = $("<img>").attr("src", "img/" + item.getImageName()).addClass(className + " shadowed");
        return itemImg;
    }

    function appendPotionItems(panel, isCurrentPlayer) {
        var i, l, index = 1;
        for (i = 0, l = allItems.length; i < l; i++) {
            if (allItems[i].hasType(ItemType.POTION)) {
                panel.append(renderPotionItem(i, index, isCurrentPlayer));
                index++;
            }
        }
        // add potion placeholder if there is space left & if potion can be brewed
        if (isCurrentPlayer && hasPotionSpace()) {
            var creatablePotions = self.getCreatablePotions();
            if (creatablePotions.length > 0 && !usedTeleportThisTurn && berserkerBonus === 0) {
                panel.append(renderPotionPlaceholderItem(index, creatablePotions));
                index++;
            }
        }
        return panel;
    }

    function renderPotionItem(i, index, isCurrentPlayer) {
        var item = allItems[i];
        var itemImg = $("<img>").addClass("item potion" + index + "Item shadowed").attr("src", "img/" + item.getImageName());
        if (isCurrentPlayer && game.isRunning()) {
            itemImg.addClass("clickable").click(function () { game.clickOnItem(i); });
        }
        return itemImg;
    }

    function renderPotionPlaceholderItem(index) {
        var itemImg = $("<img>").addClass("item potion" + index + "Item potionPlaceholder shadowed").attr("src", "img/potion_placeholder.png");
        if (game.isRunning()) {
            itemImg.addClass("clickable animated").click(function () { game.showDialog(Dialog.createPotionDialog(allItems, calculateMagic(), self.createPotion)); });
        }
        return itemImg;
    }

    function appendBackpackItems(panel, isCurrentPlayer) {
        var bestSword = getFirstBestItem(ItemType.SWORD);
        var bestBoot = getFirstBestItem(ItemType.BOOT);
        var bestRing = getFirstBestItem(ItemType.RING);

        var i, l, index = 1;
        for (i = 0, l = allItems.length; i < l; i++) {
            if (allItems[i] !== bestSword && allItems[i] !== bestBoot && allItems[i] !== bestRing && !allItems[i].hasType(ItemType.POTION)) {
                panel.append(renderBackpackItem(i, index, isCurrentPlayer));
                index++;
            }
        }
    }

    function renderBackpackItem(i, index, isCurrentPlayer) {
        var item = allItems[i];
        var itemImg = $("<img>").addClass("item backpack" + index + "Item shadowed").attr("src", "img/" + item.getImageName());
        if (isCurrentPlayer && game.isRunning()) {
            itemImg.addClass("clickable").click(function () { game.clickOnItem(i); });
        }
        return itemImg;
    }

    function appendHearts(panel) {
        var i, img;
        if (doesShowLives) {
            for (i = 0; i < lives; i++) {
                img = $("<img>").addClass("heart heart" + (i + 1) + " shadowed").attr("src", "img/heart.png");
                panel.append(img);
            }
        }
    }

    function renderMissions() {
        var panel = $("<div>").addClass("missionPanel");

        var img = $("<img>").attr("src", "img/MissionCards.png").addClass("shadowed").attr("title", mouseover_mission_cards);

        if (game.isRunning()) {
            img.addClass("clickable").click(function (event) {
                event.stopPropagation();
                game.clickOnMissionCards();
            });
        }

        if (self.getFinishableMission() !== null) {
            img.addClass("animated");
        }

        panel.append(img);
        return panel;
    }

    this.renderMissionCards = function () {
        var panel = $("<div>").addClass("clearfix");
        var i, l;
        for (i = 0, l = missionCards.length; i < l; i++) {
            panel.append(renderMissionCard(i));
        }
        return panel;
    };

    function renderMissionCard(i) {
        var missionCard = missionCards[i];
        var mission = $("<div>").addClass("missionCard shadowed").append($("<p>").text($.i18n.prop('missiontext_' + missionCard.getType().descKey )));

        var isMissionReady = checkIfMissionReady(missionCard);
        if (isMissionReady) {
            var fulfillButton = $("<div>").addClass("fulfillButton clickable animated").attr("title", dialog_mission_finish_title).click(function (event) { event.stopPropagation(); game.clickOnFulfillMission(i); });
            mission.append(fulfillButton);
        } else if (stepsInTurn > 0) {
            var replaceButton = $("<div>").addClass("replaceButton clickable").attr("title", dialog_mission_replace_title).click(function (event) { event.stopPropagation(); game.clickOnDiscardMission(i); });
            mission.append(replaceButton);
        }
        if (!isMissionReady) {
            mission.append($("<div>").addClass("explainReward").attr("title", dialog_mission_reward_title));
            mission.append($("<div>").addClass("explainCondition").attr("title", dialog_mission_condition_title));
        }
        mission.append($("<img>").attr("src", "img/" + missionCard.getImageName()));
        return mission;
    }
}