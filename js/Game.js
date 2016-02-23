function Game() {

    var playerCount, targetTeeth, players, currentPlayer, monsterPlayer, defendingCharacter, tileStack, missionStack, surfaceBoard, dungeonBoard, turns, startTime, self, onMessageClose, shownTutorials, shownDialogs, isSetupTutorialEnabled, isGameTutorialEnabled, isInSetup, tutorialStack, shownDialogOptions, resizeTimer, showOtherPlayers;

    playerCount = 5;  // assume playerCount = 5, is changed later when players are selected
    targetTeeth = 12; // assume targetTeeth = 12, is changed later when players are selected
    self = this;
    shownTutorials = [];
    shownDialogs = [];
    players = [];
    tutorialStack = [];

    isSetupTutorialEnabled = true;
    isGameTutorialEnabled = true;

    isInSetup = true;
    shownDialogOptions = null;

    // to check if actions are enabled
    this.isRunning = function () {
        return !isInSetup;
    };

    // init game
    this.init = function () {

        turns = 0;
        startTime = new Date();

        // setup game
        setupMissionStack();

        setupTileStack();

        setupBoards();

        // render first time
        render();

        // startup tutorial - building up game board
        doStartupTutorial();

        // setup render on resizing window
        $(window).bind('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () { render(); }, 250);
        });

        // setup question when user leaves page
        $(window).bind('beforeunload', function () {
            return $.i18n.prop("game_leave_confirm");
        });

        // clicking anywhere closes message
        $("body").click(function () {
            if (!defendingCharacter && shownDialogOptions && shownDialogOptions.isWithoutBorder) {
                self.closeDialog();
            }
        });

        $("#helpButton").click(function (event) {
            event.stopPropagation();
            self.clickOnHelpButton();
        });

        $("#contactButton").click(function (event) {
            event.stopPropagation();
            self.clickOnContactButton();
        });

        $("#alchemyButton").click(function (event) {
            event.stopPropagation();
            self.clickOnAlchemyButton();
        });

        window.ondragstart = function () { return false; }

        /*$(document).keypress(function (e) {
            if (e.which == 32) {
                hideTutorial();
            }
        });*/
    };

    this.clickOnTutorialCheckbox = function (enabled) {
        isGameTutorialEnabled = enabled;
        isSetupTutorialEnabled = enabled;
    };

    this.clickOnPlayerTile = function () {

        // close old tutorial
        hideTutorial();

        var tile = currentPlayer.doCurrentTileAction(function () {
            render();
            handleTutorialsWhenItemWasAdded();
        });

        // do additional work for special actions
        if (tile.hasType(TileType.DUNGEON1)) { enterDungeon(1); }
        if (tile.hasType(TileType.DUNGEON2)) { enterDungeon(2); }
        if (tile.hasType(TileType.DUNGEON3)) { enterDungeon(3); }
        if (tile.hasType(TileType.DUNGEON4)) { enterDungeon(4); }
        if (tile.hasType(TileType.DUNGEON5)) { enterDungeon(5); }

        if (tile.hasType(TileType.DUNGEONEXIT1)) { leaveDungeon(1); }
        if (tile.hasType(TileType.DUNGEONEXIT2)) { leaveDungeon(2); }
        if (tile.hasType(TileType.DUNGEONEXIT3)) { leaveDungeon(3); }
        if (tile.hasType(TileType.DUNGEONEXIT4)) { leaveDungeon(4); }
        if (tile.hasType(TileType.DUNGEONEXIT5)) { leaveDungeon(5); }

        render();

        // show relevant tutorials
        if (tile.hasType(TileType.APPLE) || tile.hasType(TileType.FISH) || tile.hasType(TileType.MUSHROOM)) {

            // show tutorial for food added
            var pp = getElementPosition(".playerBoard img.backpack" + currentPlayer.getLatestBackPackIndex() + "Item");
            showTutorial(TutorialStep.STEP_FOODAVAILABLE, pp);

            // show general tutorials when item was added
            handleTutorialsWhenItemWasAdded(tile.hasType(TileType.APPLE) ? ItemType.APPLE : (tile.hasType(TileType.FISH) ? ItemType.FISH : ItemType.MUSHROOM));
        }
    };


    // callbacks from UI
    this.clickOnTile = function (x, y) {

        var alreadyRendered, tileExists, tile, r1, pp;

        // close old tutorial
        hideTutorial();

        // teleport handling
        if (currentPlayer.isTeleporting()) {
            // teleport out of dungeon
            if (currentPlayer.isInDungeon()) {
                leaveDungeon();
            }
            currentPlayer.removeTeleporting();
        }
        else {
            // remove step if was not teleport
            currentPlayer.removeStep();
        }

        tileExists = surfaceBoard.hasTileAt(x, y);

        if (!tileExists) {

            // add new field
            tile = tileStack.getRandomTile();
            surfaceBoard.addTileAt(x, y, tile);

            // move player to new field
            surfaceBoard.movePlayerTo(x, y, currentPlayer);

            // if its a forest render now
            if (tile.hasType(TileType.FOREST)) {
                currentPlayer.removeAllSteps();
                render();
                alreadyRendered = true;

                // roll dice and wait with rendering until dialog closed
                r1 = rollTreasureDice();
                // steps from boots do not count in this case
                currentPlayer.removeAllSteps();

                self.showDialog(Dialog.createForestDialog(r1), function() {
                    currentPlayer.handleBackpackOverloadedDialog(function() {
                        // render only after discarding         
                        render();                        
                        handleTeethCollectedTutorial();                        
                        // if player found an item
                        handleTutorialsWhenItemWasAdded(r1 === 1 ? ItemType.BOOT : (r1 === 2 ? ItemType.SWORD : (r1 === 3 ? ItemType.RING : null)));
                        handleTutorialsWhenMissionPossible();
                        handleLastTileTutorial(x, y);
                        handleNoStepsLeftTutorial();
                    });
                });
            } else {
                // tutorial handling for normal fields
                pp = getSurfacePosition(x, y);
                showTutorial(TutorialStep.FIELDS[tile.getType().name], pp);
                
                if (tile.hasType(TileType.APPLE) || tile.hasType(TileType.FISH) || tile.hasType(TileType.MUSHROOM)) {
                    handlePotionRelevantTutorial();
                } else if (tile.hasType(TileType.SMITH) || tile.hasType(TileType.TRADER) || tile.hasType(TileType.CASTLE)) {
                    handleGuideRelevantTutorial();
                }
            }
        } else {
            // move player to new field
            surfaceBoard.movePlayerTo(x, y, currentPlayer);
                     
            if (currentPlayer.hasWonGame(targetTeeth)) {
                currentPlayer.removeAllSteps();               
                // end game
                checkWinCondition();
            }
        }

        if (!alreadyRendered) {
            render();
            handleTutorialsWhenMissionPossible();
            handleLastTileTutorial(x, y);
            handleNoStepsLeftTutorial();
        }
    };

    this.clickOnDungeonTile = function (x, y) {
        var missionCardIndex, r1, r2, r3, alreadyRendered = false;

        // close old tutorial
        hideTutorial();

        if (currentPlayer.isMonsterPlayer()) {
            dungeonBoard.movePlayerTo(x, y, currentPlayer.getControlledMonster());
            currentPlayer.removeStep();
        } else {

            // tutorial handling
            var tile = dungeonBoard.getTileAt(x, y);
            var pp = getDungeonPosition(x, y);

            var hasTeleported = false;

            // teleport handling
            if (currentPlayer.isTeleporting()) {

                hasTeleported = true;

                // teleport into dungeon
                if (!currentPlayer.isInDungeon()) {
                    enterDungeon();
                }
                currentPlayer.removeTeleporting();
            }
            else
            {
                currentPlayer.removeStep();
            }

            dungeonBoard.movePlayerTo(x, y, currentPlayer);

            // trap handling
            if (currentPlayer.standsOnChip(ChipType.TRAPCLOSED)) {
                dungeonBoard.markTrapOpen(x, y);
                currentPlayer.recieveDamage(1);
                currentPlayer.removeAllSteps();

                // if there was a trap mission - execute it and get new card
                missionCardIndex = currentPlayer.executeTrapMissionIfAvailable();
                if (missionCardIndex >= 0) {
                    removeMissionCard(currentPlayer, missionCardIndex);                    
                }

                render();
                alreadyRendered = true;
                var playerIsDead = currentPlayer.isDead();

                self.showDialog(Dialog.createTrapDialog(), function () {

                    if (missionCardIndex >= 0) {
                        self.showDialog(Dialog.createMissionFulfilledDialog(MissionType.MISSION22), showDeadDialog);
                    } else {
                        showDeadDialog();
                    }
                  
                    function showDeadDialog() {
                        if (playerIsDead) {
                            self.showDialog(Dialog.createDeathDialog(currentPlayer, true, false), function () {
                                updateUi();
                            });
                        }
                        else {
                            updateUi();
                        }
                    }

                    function updateUi() {
                        dungeonBoard.markTrapRemoved(x, y);
                        render();
                    }
                });

                if (currentPlayer.isDead()) {
                    currentPlayer.removeAllItems();
                }

                // check dead characters and if monsterplayer is still needed
                checkDeadCharacters();
                checkMonsterPlayerObsolete();

            } else if (currentPlayer.standsOnChip(ChipType.NOTRAPCLOSED)) {
                dungeonBoard.markNonTrapOpen(x, y);

                showTutorial(TutorialStep.STEP_NOTRAP, pp, null, true);

            } else if (currentPlayer.standsOnChip(ChipType.TREASURE)) {

                render();
                alreadyRendered = true;

                // roll dices and wait with rendering until dialog closed
                r1 = rollTreasureDice(); r2 = rollTreasureDice(); r3 = rollTreasureDice();
                dungeonBoard.markTreasureTaken();
                self.showDialog(Dialog.createTreasureDialog(r1, r2, r3), function () {
                    currentPlayer.handleBackpackOverloadedDialog(function () {
                        // render only after discarding                       
                        render();

                        handleTeethCollectedTutorial();

                        handleTutorialsWhenItemWasAdded(r1 === 1 ? ItemType.BOOT : (r1 === 2 ? ItemType.SWORD : (r1 === 3 ? ItemType.RING : null)));
                        handleTutorialsWhenItemWasAdded(r2 === 1 ? ItemType.BOOT : (r2 === 2 ? ItemType.SWORD : (r2 === 3 ? ItemType.RING : null)));
                        handleTutorialsWhenItemWasAdded(r3 === 1 ? ItemType.BOOT : (r3 === 2 ? ItemType.SWORD : (r3 === 3 ? ItemType.RING : null)));
                    });
                });
            } else {
               
            }
        }

        if (!alreadyRendered) {
            render();
        }

        handleNoStepsLeftTutorial();
    };

    this.clickOnControllableMonster = function (monster) {

        // close old tutorial
        hideTutorial();

        currentPlayer.setControlledMonster(monster);
        render();
    };


    this.clickOnCharacterTile = function (x, y) {

        var character;

        // close old tutorial
        hideTutorial();

        // character that was clicked on
        character = dungeonBoard.getCharacterAt(x, y);

        // if monster player - selecting monster
        if (currentPlayer.isMonsterPlayer() && !character.isPlayer()) {
            self.clickOnControllableMonster(character);
        } else {
            defendingCharacter = character;
        }

        render();
    };

    this.clickOnAttack = function () {

        // close old tutorial
        hideTutorial(true);

        // attack the character
        var looser = currentPlayer.attack(defendingCharacter);
        var lifesBefore = looser.getCurrentLifes() + 1;
        var looserIsAttacker = (currentPlayer === looser || currentPlayer.getControlledMonster() === looser);
        var container = looserIsAttacker ? "#currentPlayer" : "#defendingCharacter";

        var pp = looser.isPlayer() ? getElementPosition(container + " .playerBoard .heart" + lifesBefore) : getElementPosition(container + " .monsterBoard .heart" + lifesBefore);
        showTutorial(looserIsAttacker ? TutorialStep.STEP_LOSTLIFESATT : TutorialStep.STEP_LOSTLIFESDEF, { x: pp.x + 30, y: pp.y + 30 });
        if (looser == currentPlayer && looser.isAlmostDead()) {
            showTutorial(TutorialStep.STEP_FEWLIFES, pp);
        }

        render();
    };


    this.clickOnDiscardMission = function (i) {

        replaceMissionCard(currentPlayer, i);
        currentPlayer.removeStep();
        render();

        handleNoStepsLeftTutorial();

        openMissionCardsDialog();
    };

    this.clickOnFulfillMission = function (i) {

        var oldMissionType = currentPlayer.getMissionType(i);

        // close old tutorial
        hideTutorial();

        // close dialog - a new one will be opened
        self.closeDialog();

        var dialogFunction = Dialog.createMissionFulfilledDialog;
        if (oldMissionType === MissionType.MISSION7 || oldMissionType === MissionType.MISSION8 || oldMissionType === MissionType.MISSION9) {
            dialogFunction = Dialog.createMissionFulfilledChooseDialog;
        }

        game.showDialog(dialogFunction(oldMissionType), function (param) {
            currentPlayer.fulfillMission(i, param);
            removeMissionCard(currentPlayer, i);
            currentPlayer.handleBackpackOverloadedDialog(function () {              

                render();

                handleTeethCollectedTutorial();
                handleTutorialsWhenItemWasAdded();
            });
        });      
        
    };

    this.clickOnPotion = function (i1, i2, level) {

        // close old tutorial
        hideTutorial();

        currentPlayer.createPotion(i1, i2, level);
        
        render();
        
        var pp = getElementPosition(".potion1Item");
        showTutorial(TutorialStep.STEP_POTIONCREATED, pp);
    };

    this.clickOnItem = function (i) {

        // close old tutorial
        hideTutorial();

        var wasUsed = currentPlayer.useItem(i);

        // if it was not used - player can decide to discard it
        if (!wasUsed) {
            self.showDialog(Dialog.createVoluntaryDiscardDialog(function () {
                currentPlayer.discardItem(i);
                render();
            }, currentPlayer.getItem(i)), null, { width: 320 });
        } else {
            render();
        }
    };

    this.clickOnNextPlayer = function () {
        if (currentPlayer.hasStepsLeft()) {
            self.showDialog(Dialog.createActionDiscardDialog(function () {
                setNextPlayersTurn();
            }), null, { width: 320 });
        } else {
            setNextPlayersTurn();
        }
    };

    this.clickOnOtherPlayer = function (player) {
        self.showDialog(Dialog.createOtherPlayerDialog(player), null, { isWithoutBorder: true, width: 400 });
    };

    this.clickOnMissionCards = function () {
        openMissionCardsDialog();
    };

    function openMissionCardsDialog() {
        self.showDialog(Dialog.createMissionCardDialog(currentPlayer), null, { isWithoutBorder: true, width: 257 * 3 + 20 + 20 });
    }

    this.clickOnContactButton = function () {
        self.showDialog(Dialog.createContactDialog());
    };

    this.clickOnHelpButton = function () {
        self.showDialog(Dialog.createGuideDialog(), null, { isWithoutBorder: true, width: 300, right: 30 });
    };

    //this.clickOnMissionButton = function () {
    //    self.showDialog(Dialog.createMissionGuideDialog(), null, { isWithoutBorder: true, width: 300, right: 30 });
    //};

    this.clickOnAlchemyButton = function () {
        self.showDialog(Dialog.createAlchemyGuideDialog(), null, { isWithoutBorder: true, width: 300, right: 30 });
    };

    this.getTargetTeeth = function () {
        return targetTeeth;
    };

    function setNextPlayersTurn() {
       
        // close old tutorial
        hideAllTutorials();
       
        // refill mission cards
        if (!currentPlayer.isMonsterPlayer()) {
            refillMissionCards(currentPlayer, setNextPlayersTurn2);
        } else {
            setNextPlayersTurn2();
        }
    }

    function setNextPlayersTurn2() {
        var pp;

        currentPlayer.removeAllSteps();
        currentPlayer.endTurn();

        var index = players.indexOf(currentPlayer);

        if (index === players.length - 1) {
            turns++;

            trackEvent('game', 'finishedTurn_' + turns);

            currentPlayer = players[0];
        } else {
            currentPlayer = players[index + 1];

            // first turn, add new player to map
            if (turns === 0) {
                if (!currentPlayer.isMonsterPlayer()) {
                    surfaceBoard.addPlayerToStart(currentPlayer);
                }
            }
        }

        // show other player tutorial on second turn
        if (index === 0 && turns === 0) {
            pp = getElementPosition(".playerBoard");
            showTutorial(TutorialStep.STEP_NEXTPLAYER, pp, null, true);
            if (isSetupTutorialEnabled) {
                enableAndShowOtherPlayersTutorial();
            }
        }

        // check if monster player can be removed now
        checkMonsterPlayerObsolete();

        currentPlayer.resetForNewTurn();

        render();

        if (currentPlayer.isMonsterPlayer()) {
            pp = getElementPosition(".playerBoard");
            showTutorial(TutorialStep.STEP_MONSTERPLAYERTURN, pp, null, true);
            showTutorial(TutorialStep.STEP_MONSTERPLAYERTURN2, pp, null, true);
        } else {
            // if player collected points why he was not playing handle it here
            handleTeethCollectedTutorial();

            // check if new mission became possible
            handleTutorialsWhenMissionPossible();
        }
    }

    function showTutorial(tutorialStep, pp, onClose, forceRightBubble) {
        tutorialStack.push({ tutorialStep: tutorialStep, x: pp.x, y: pp.y, onClose: onClose, forceRight: forceRightBubble });

        // if its the first one - show it
        if (tutorialStack.length === 1) {
            showTutorialImpl();
        } else if (tutorialStack.length > 1) {
            for (var i = 1; i < tutorialStack.length; i++) {
                // if there is a not shown tutorial in the stack
                if (shownTutorials.indexOf(tutorialStack[i].tutorialStep) < 0) {
                    $('#tutorial div.btn').text(tutorial_next);
                }
            }
        }
    }

    function showTutorialImpl() {

        var tutorial = tutorialStack[0];

        var width = $('#container').outerWidth();
        var tutorialHeight = 255, tutorialWidth = 300;
        var positionX = tutorial.x, positionY = tutorial.y;

        // if was already shown - cancel - execute followup action
        var index = shownTutorials.indexOf(tutorial.tutorialStep);
        if (index >= 0) {
            hideTutorial();
            return;
        }

        // mark as shown
        shownTutorials.push(tutorial.tutorialStep);

        // if tutorials disabled - cancel - execute followup action
        if (!isSetupTutorialEnabled && tutorial.tutorialStep.isSetup || !isGameTutorialEnabled && !tutorial.tutorialStep.isSetup) {
            hideTutorial();
            return;
        }

        // setup class depending on position
        $('#tutorial').removeClass();
        if (tutorial.y < tutorialHeight) {
            if (tutorial.x > width - tutorialWidth || tutorial.forceRight) {
                $('#tutorial').addClass("tr shadowed");
                positionX -= tutorialWidth;
            } else {
                $('#tutorial').addClass("tl shadowed");
            }
        } else {
            if (tutorial.x > width - tutorialWidth || tutorial.forceRight) {
                $('#tutorial').addClass("br shadowed");
                positionX -= tutorialWidth;
                positionY -= tutorialHeight;
            } else {
                $('#tutorial').addClass("bl shadowed");
                positionY -= tutorialHeight;
            }
        }

        // set in front
        if (tutorial.tutorialStep.inFront) {
            $('#tutorial').addClass("inFront");
        }

        // setup tutorial message
        $('#tutorial').css("left", positionX).css("top", positionY);

        $('#tutorial').empty();
        if (tutorial.tutorialStep.hasTitle) {
            $('#tutorial').append($("<h4>").text($.i18n.prop("tutorial_" + tutorial.tutorialStep.ressourceKey + "_title")));
        }

        $('#tutorial').append($("<p>").html($.i18n.prop("tutorial_" + tutorial.tutorialStep.ressourceKey + "_text")));

        // show next button if setup or more tutorials available
        var nextVisible = tutorial.tutorialStep.isSetup;
        if (!nextVisible && tutorialStack.length > 1) {
            for (var i = 1; i < tutorialStack.length; i++) {
                // if there is a not shown tutorial in the stack
                if (shownTutorials.indexOf(tutorialStack[i].tutorialStep) < 0) {
                    nextVisible = true;
                }
            }
        }

        var button = $("<div>").addClass("btn").text(nextVisible ? tutorial_next : tutorial_close).click(function () { hideTutorial(); });
        if (tutorial.tutorialStep.noCloseButton && !nextVisible) {
            button.hide();
        }
        $('#tutorial').append(button);

        $('#tutorial').show();
        
        // if it is mandatory - disable next player button
        if (tutorial.tutorialStep.isMandatory) {
            currentPlayer.toggleStepBox(false);
        }
    }


    function hideAllTutorials() {
        while (tutorialStack.length > 0) {
            hideTutorial();
        }
    }

    function hideTutorial(onlyIfInFront) {
        if (tutorialStack.length > 0) {
            var tutorial = tutorialStack[0];

            // if tutorial on fight screen - only close those
            if (onlyIfInFront && !tutorial.tutorialStep.inFront) {
                return;
            }

            // if it was mandatory - enable button again
            if (tutorial.tutorialStep.isMandatory) {
                currentPlayer.toggleStepBox(true);
            }

            // execute action
            if (tutorial.onClose) {
                tutorial.onClose();
            }

            // remove current tutorial
            tutorialStack.splice(0, 1);

            // show next if there is one
            if (tutorialStack.length >= 1) {
                showTutorialImpl();
            } else {
                $('#tutorial').hide();
            }
        }
    };

    this.showDialog = function (content, onClose, dialogOptions) {
        onMessageClose = onClose;
        shownDialogOptions = dialogOptions;

        if (dialogOptions && dialogOptions.isTutorial) {
            if (!isGameTutorialEnabled || shownDialogs.indexOf(dialogOptions.dialogKey) >= 0) {
                self.closeDialog();
                return;
            } else {
                shownDialogs.push(dialogOptions.dialogKey);
            }
        }

        // setup message
        $('#overlay').empty();
        $('#overlay').removeClass();
        $('#overlay').addClass("dialog");

        if (dialogOptions && dialogOptions.isWithoutBorder) {
            $('#overlay').addClass("withoutBorder");
        }
        if (dialogOptions && dialogOptions.width) {
            $('#overlay').css("width", dialogOptions.width + "px");
        } else {
            $('#overlay').css("width", "");
        }
        if (dialogOptions && dialogOptions.right) {
            $('#overlay').css("margin-right", dialogOptions.right + "px");
        } else {
            $('#overlay').css("margin-right", "");
        }

        $('#overlay').append(content);

        // show
        $('#fade').show();
        $('#overlay').show();
    };

    this.closeDialog = function (param, forceRender) {
        $('#overlay').hide();
        
        if (!defendingCharacter) {
            $('#fade').hide();
        }

        if (forceRender) {
            render();
        }

        executeAfterAction(param);
    };

    this.showBerserkerTutorial = function () {
        var pp = getElementPosition(".playerBoard");
        showTutorial(TutorialStep.STEP_BERSERKER, pp, null);
    };

    this.showTeleportTutorial = function () {
        var pp = getElementPosition(".playerBoard");
        showTutorial(TutorialStep.STEP_TELEPORT, pp, null);
    };

    this.showLastHeroLeavesDungeonTutorial = function () {
        var pp = getDungeonPosition(0, 4);
        showTutorial(TutorialStep.STEP_LASTHEROLEAVESDUNGEON, pp, null, true);
    };

    function hasShownTutorialStep(tutorialStep) {
        var index = shownTutorials.indexOf(tutorialStep);
        return (index >= 0);
    }

    function executeAfterAction(param) {
        // execute function if defined
        var action = onMessageClose;
        onMessageClose = null;
        if (action) {
            action(param);
        }
    }

    // private methods
    function removeMissionCard(player, i) {
        var card = player.removeMissionCard(i);
        missionStack.returnCard(card);
    }

    function replaceMissionCard(player, i) {
        removeMissionCard(player, i);
        player.addMissionCard(missionStack.getRandomCard(), i);
    }

    function refillMissionCards(player, onFinish) {
        if (player.needsNewMissionCard()) {
            var card = missionStack.getRandomCard();
            player.pushMissionCard(card);
            game.showDialog(Dialog.createNewMissionCardDialog(card.getType()), function () { refillMissionCards(player, onFinish); });
        } else {
            onFinish();
        }        
    }

    function checkDeadCharacters() {
        var controlledMonster, killedPlayer = null;

        dungeonBoard.checkDeadMonsters();

        if (monsterPlayer) {
            controlledMonster = monsterPlayer.getControlledMonster();
            if (controlledMonster && controlledMonster.isDead()) {
                monsterPlayer.setControlledMonster(null);
            }
        }

        var i = players.length;
        while (i--) {
            if (!players[i].isMonsterPlayer()) {
                if (players[i].isDead()) {
                    killedPlayer = players[i];
                    players[i].resetForResurrection();
                    dungeonBoard.playerLeaves(players[i]);
                    surfaceBoard.playerEntersAfterDeath(players[i]);
                }
            }
        }

        return killedPlayer;
    }

    function checkWinCondition() {
        var i = players.length, winners = [];
        while (i--) {
            if (players[i].hasWonGame(targetTeeth)) {
                winners.push(players[i]);
            }
        }

        if (winners.length > 0) {
            // this is the last dialog - so the page can be closed without message
            trackEvent('game', 'finishedGame');
            self.showDialog(Dialog.createWinDialog(winners), function () {
                $(window).unbind('beforeunload');
                self.showDialog(Dialog.createWinDialog2());
            });
        }
    }

    function rollTreasureDice() {
        var result = Utils.getRandomNumber(1, 6);
        if (result === 1) {
            currentPlayer.addItemToBackpack(new Item(ItemType.BOOT, 1));
        } else if (result === 2) {
            currentPlayer.addItemToBackpack(new Item(ItemType.SWORD, 1));
        } else if (result === 3) {
            currentPlayer.addItemToBackpack(new Item(ItemType.RING, 1));
        } else if (result === 4 || result === 5) {
            currentPlayer.addPoints(1);
        } else if (result === 6) {
            currentPlayer.addPoints(2);
        }
        return result;
    }

    function enterDungeon(nr) {

        // if there is no player in dungeon - this one is the first - add monster player after his turn
        if (!dungeonBoard.isPlayerInDungeon()) {
            monsterPlayer = new Player(PlayerType.MONSTERPLAYER);
            players.splice(players.indexOf(currentPlayer) + 1, 0, monsterPlayer);
        } else {
            var pp = getDungeonPosition(0, 4);
            showTutorial(TutorialStep.STEP_PVP, pp, null, true);

            var allInDungeon = true;
            for (var i = 0; i < players.length; i++) {
                if (players[i] !== currentPlayer && !players[i].isInDungeon()) {
                    allInDungeon = false;
                    break;
                }
            }
            if (allInDungeon) {
                showTutorial(TutorialStep.STEP_ALLPVP, pp, null, true);
            }
        }

        self.showDialog(Dialog.createEnterDungeonTutorialDialog(),
            function () {
                self.showDialog(Dialog.createEnterDungeon2TutorialDialog(),
                    function () {
                        self.showDialog(Dialog.createEnterDungeon3TutorialDialog(),
                            function () {
                                var pp = getElementPosition(".playerPortait:last-child");
                                if (pp) {
                                    showTutorial(TutorialStep.STEP_MONSTERPLAYER, pp);
                                }
                            }, { isTutorial: true, dialogKey: "EnterDungeon3" });
                    }, { isTutorial: true, dialogKey: "EnterDungeon2" });
            }, { isTutorial: true, dialogKey: "EnterDungeon" });

        surfaceBoard.playerLeaves(currentPlayer);

        if (nr) {
            dungeonBoard.playerEnters(currentPlayer, nr);
        }
    }

    function leaveDungeon(nr) {
        dungeonBoard.playerLeaves(currentPlayer);

        if (nr) {
            surfaceBoard.playerEnters(currentPlayer, nr);
        }

        // maybe monsterplayer can be removed now
        checkMonsterPlayerObsolete();
    }

    function checkMonsterPlayerObsolete() {

        // if there is no player in dungeon - remove monsterplayer
        if (!dungeonBoard.isPlayerInDungeon() || !dungeonBoard.isMonsterInDungeon()) {
            // if monsterplayer is current player - remove all steps - force new player
            if (currentPlayer === monsterPlayer) {
                currentPlayer.setControlledMonster(null);
                currentPlayer.removeAllSteps();
            } else {
                if (monsterPlayer) {
                    players.splice(players.indexOf(monsterPlayer), 1);
                    monsterPlayer = null;
                }
            }
        }
    }


    function render() {

        var hasCardsLeft, areEntrancesFree, i;

        var minWidth = 940, minHeight = 500;

        // width of fillable area
        var maxWidth = Math.max(minWidth - 10 - 10, $(window).width() - 20 - 10 - 10 - 20);
        var maxHeight = Math.max(minHeight - 10 - 220, $(window).height() - 20 - 10 - 220 - 20);

        // set container dimensions fixed
        $("#container").width(maxWidth + 20);
        $("#container").height(maxHeight + 220 + 10);

        // set initial widths
        var initalWidthSurface = 500;
        var initalHeightSurface = 399;
        var initalWidthDungeon = 300;
        var initialHeightDungeon = 447;
        var initalWidthMonsters = 120;

        var factor = maxWidth / (initalWidthSurface + initalWidthDungeon + initalWidthMonsters + 0.0);

        // calculate space between elements
        if (initialHeightDungeon * factor > maxHeight) {
            factor = maxHeight / initialHeightDungeon;
            
            // floor margin - to avoid overflow in firefox (rounding problems)
            var space = Math.floor((maxWidth - (initalWidthSurface + initalWidthDungeon + initalWidthMonsters) * factor) / 3.0);
            $("#surfaceBoard").css("margin-left", space + "px");
            $("#surfaceBoard").css("margin-right", (space + 10) + "px");
            $("#monsterCards").css("margin-right", space + "px");
        } else {
            $("#surfaceBoard").css("margin-left", "0px");
            $("#surfaceBoard").css("margin-right", "10px");
            $("#monsterCards").css("margin-right", "0px");
        }

        // set size of elements
        $("#surfaceBoard").width(Math.floor(initalWidthSurface * factor));
        $("#surfaceBoard").height(initalHeightSurface * factor);
        $("#dungeonBoard").width(Math.floor(initalWidthDungeon * factor));
        $("#dungeonBoard").height(initialHeightDungeon * factor);
        $("#monsterCards").width(Math.floor(initalWidthMonsters * factor));

        // check if current tile has action
        if (currentPlayer) {
            if (currentPlayer.isInDungeon()) {
                areEntrancesFree = surfaceBoard.areEntrancesFree();
            } else {
                areEntrancesFree = dungeonBoard.areEntrancesFree();
            }
        }
        var doesCurrentTileHaveAction = currentPlayer ? (currentPlayer.isMonsterPlayer() ? false : currentPlayer.doesCurrentTileHaveAction(areEntrancesFree)) : false;

        // render maps into the elements
        hasCardsLeft = tileStack.hasCardsLeft();
        surfaceBoard.render($("#surfaceBoard"), currentPlayer, hasCardsLeft, doesCurrentTileHaveAction);
        dungeonBoard.render($("#dungeonBoard"), $("#monsterCards"), currentPlayer, doesCurrentTileHaveAction);

        // render other players
        $("#otherPlayers").empty();
        if (showOtherPlayers) {

            var order = players.length - 2;
            var passedCurrentPlayer = false;
            i = players.length;
            while (i--) {
                if (players[i] === currentPlayer) {
                    passedCurrentPlayer = true;
                } else if (passedCurrentPlayer) {
                    $("#otherPlayers").append(players[i].renderNotActive().addClass("next" + order--));
                }
            }
            i = players.length;
            while (i--) {
                if (players[i] === currentPlayer) {
                    break;
                } else {
                    $("#otherPlayers").append(players[i].renderNotActive().addClass("next" + order--));
                }
            }
        }

        // render current player
        if (currentPlayer) {
            currentPlayer.render($("#currentPlayer"), $("#stepButton"));
        }

        // render fight
        if (defendingCharacter) {
            showFight();
        }
    }

    function showFight() {
        
        $('#fade').show();

        $("#currentPlayer .playerBoard").addClass("showOverFade");
        $("#currentPlayer .monsterBoard").addClass("showOverFade");

        $("#defendingCharacter").empty();
        $("#defendingCharacter").append(defendingCharacter.renderPlayerBoard());
        var buttons = $("<div>").addClass("attackButtons");
        
        var attacker = currentPlayer.isMonsterPlayer() ? currentPlayer.getControlledMonster() : currentPlayer;

        if (currentPlayer.hasStepsLeft() && !defendingCharacter.isDead() && !attacker.isDead()) {
            buttons.append($("<div>").addClass("btn").text(fight_attack_button).click(function (event) { event.stopPropagation(); self.clickOnAttack(); }));
            buttons.append($("<div>").addClass("btn").text(fight_noattack_button).click(function (event) { event.stopPropagation(); hideFight(); }));
        } else {
            if (defendingCharacter.isDead() && !currentPlayer.isMonsterPlayer()) {
                buttons.append($("<div>").addClass("btn").text(fight_takereward_button)).click(function (event) { event.stopPropagation(); hideFight(); });
            } else {
                buttons.append($("<div>").addClass("btn").text(fight_close_button)).click(function (event) { event.stopPropagation(); hideFight(); });
            }
        }
        
        $("#defendingCharacter").append(buttons);

        $("#defendingCharacter").show();
    }

    function hideFight() {
        
        hideTutorial(true);

        $("#fade").hide();

        var alreadyRendered = false;

        // calculate reward
        var attacker = currentPlayer.isMonsterPlayer() ? currentPlayer.getControlledMonster() : currentPlayer;
        var defender = defendingCharacter;

        // remove fight display
        attacker.setLastFightResults(null, null, null);
        defender.setLastFightResults(null, null, null);

        // if one character was killed - handle reward
        if (attacker.isDead() || defender.isDead()) {
            var winner = attacker.isDead() ? defender : attacker;
            var looser = attacker.isDead() ? attacker : defender;

            //PVP
            if (winner.isPlayer() && looser.isPlayer()) {
                var looserPoints = looser.getPoints();
                // if looser has more points - exchange
                if (looserPoints > winner.getPoints()) {
                    looser.setPoints(winner.getPoints());
                    winner.setPoints(looserPoints);
                }
            } else if (winner.isPlayer()) {
                // add reward from killing the monster
                winner.addPoints(looser.getReward());
                // level up immediately
                looser.levelUp();
            } else {
                looser.removeAllItems();
            }
            
            if (!looser.isPlayer()) {
                var pp = getElementPosition(".monsterBoard." + looser.getCssClass());
                showTutorial(TutorialStep.STEP_MONSTERKILLED, pp, null, true);
            }
            
            // if monster was killed - and player has the mission card
            if (!defender.isPlayer() && defender.isDead() || !attacker.isPlayer() && attacker.isDead()) {
                var player = !defender.isPlayer() ? attacker : defender;
                var monster = !defender.isPlayer() ? defender : attacker;

                var missionCardIndex = player.executeMonsterKillMissionsIfAvailable(monster);
                if (missionCardIndex >= 0) {
                    var oldMissionType = player.getMissionType(missionCardIndex);
                                      
                    // only show dialogs if current player is the one doing mission - in that case don't add new mission immediately
                    if (player === currentPlayer) {
                        removeMissionCard(player, missionCardIndex)
                        self.showDialog(Dialog.createMissionFulfilledDialog(oldMissionType));
                    } else {
                        replaceMissionCard(player, missionCardIndex);
                    }
                }
            }
        }
               
        // if current player could have won points
        if (!currentPlayer.isMonsterPlayer()) {
            handleTeethCollectedTutorial();
        }

        // handle dead characters
        var killedPlayer = checkDeadCharacters();
        if (killedPlayer) {
            alreadyRendered = true;
            self.showDialog(Dialog.createDeathDialog(killedPlayer, currentPlayer === killedPlayer, attacker.isPlayer() && defender.isPlayer()), function () {
                render();
            });
        }

        // check if monsterplayer is still needed
        checkMonsterPlayerObsolete();

        defendingCharacter = null;
        $("#defendingCharacter").hide();
        $("#defendingCharacter").empty();

        $("#currentPlayer .playerBoard").removeClass("showOverFade");
        $("#currentPlayer .monsterBoard").removeClass("showOverFade");

        // render again
        if (!alreadyRendered) {
            render();
        }
    }

    function setupPlayers(ids) {

        playerCount = ids.length;
        targetTeeth = playerCount === 5 ? 12 : playerCount === 4 ? 14 : playerCount === 3 ? 16 : 18;

        changeTileStackForPlayerCount();

        var playerTypes = [];
        for (var i = 0, l = ids.length; i < l; i++) {
            switch (ids[i]) {
                case 1: playerTypes.push(PlayerType.JUPANILLIA); break;
                case 2: playerTypes.push(PlayerType.OLOFPAK); break;
                case 3: playerTypes.push(PlayerType.NATHANIEL); break;
                case 4: playerTypes.push(PlayerType.GULANZOR); break;
                case 5: playerTypes.push(PlayerType.LUPHIUS); break;
            }
        }

        players = [];
        $.each(playerTypes, function (i, playerType) {
            var player = new Player(playerType);

            // give three mission cards
            player.pushMissionCard(missionStack.getRandomCard());
            player.pushMissionCard(missionStack.getRandomCard());
            player.pushMissionCard(missionStack.getRandomCard());

            players.push(player);
        });

        currentPlayer = players[0];
        currentPlayer.resetForNewTurn();
    }

    function showPlayerLives() {
        $.each(players, function (i, player) {
            player.setDoesShowLives();
        });
    }

    function addPlayersToBoard() {
        surfaceBoard.addPlayerToStart(players[0]);
    }

    function setupTileStack() {
        var config = [
            { type: TileType.VILLAGE, count: 1 },
            { type: TileType.GRASS, count: 8 },
            { type: TileType.DUNGEON1, count: 1 },
            { type: TileType.DUNGEON2, count: 1 },
            { type: TileType.DUNGEON3, count: 1 },
            { type: TileType.DUNGEON4, count: 1 },
            { type: TileType.DUNGEON5, count: 1 },
            { type: TileType.FOREST, count: 16 },
            { type: TileType.MUSHROOM, count: 3 },
            { type: TileType.FISH, count: 3 },
            { type: TileType.APPLE, count: 3 },
            { type: TileType.CASTLE, count: 1 },
            { type: TileType.TRADER, count: 1 },
            { type: TileType.SMITH, count: 1 }            
        ];
        tileStack = new TileStack(config);
    }

    function changeTileStackForPlayerCount() {
        var i;
        var forestsToRemove = playerCount === 2 ? 9 : playerCount === 3 ? 6 : playerCount === 4 ? 3 : 0;
        var resourcesToRemove = playerCount === 2 ? 3 : playerCount === 3 ? 2 : playerCount === 4 ? 1 : 0;

        for (i = 0; i < forestsToRemove; i++) {
            tileStack.removeOneOfType(TileType.FOREST);
        }

        var resourceTypes = [TileType.MUSHROOM, TileType.FISH, TileType.APPLE];
        for (i = 0; i < resourcesToRemove; i++) {
            var resourceType = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
            tileStack.removeOneOfType(resourceType);
            resourceTypes.splice(resourceTypes.indexOf(resourceType), 1);
        }        

        tileStack.shuffle();
    }

    function setupMissionStack() {

        var config = [
            { type: MissionType.MISSION1, count: 1 },
            { type: MissionType.MISSION2, count: 1 },
            { type: MissionType.MISSION3, count: 1 },
            { type: MissionType.MISSION4, count: 1 },
            { type: MissionType.MISSION5, count: 1 },
            { type: MissionType.MISSION6, count: 1 },
            { type: MissionType.MISSION7, count: 1 },
            { type: MissionType.MISSION8, count: 1 },
            { type: MissionType.MISSION9, count: 1 },
            { type: MissionType.MISSION10, count: 1 },
            { type: MissionType.MISSION11, count: 1 },
            { type: MissionType.MISSION12, count: 1 },
            { type: MissionType.MISSION13, count: 1 },
            { type: MissionType.MISSION14, count: 1 },
            { type: MissionType.MISSION15, count: 1 },
            { type: MissionType.MISSION16, count: 1 },
            { type: MissionType.MISSION17, count: 1 },
            { type: MissionType.MISSION18, count: 1 },
            /*{ type: MissionType.MISSION19, count: 1 },
            { type: MissionType.MISSION20, count: 1 },
            { type: MissionType.MISSION21, count: 1 },*/
            { type: MissionType.MISSION22, count: 2 },
            { type: MissionType.MISSION23, count: 3 }
        ];
        missionStack = new MissionStack(config);
    }

    function setupBoards() {
        var villageTile = tileStack.getVillageTile();
        surfaceBoard = new SurfaceBoard(villageTile, 484, 386, 500); // 8 x 7
        dungeonBoard = new DungeonBoard(295, 440, 300);
    }

    function getSurfacePosition(x, y) {
        var pp = getElementPosition("#surfaceBoard");
        var pp2 = surfaceBoard.getAbsolutePosition(x, y);
        return { x: pp.x + pp2.x, y: pp.y + pp2.y };
    }

    function getDungeonPosition(x, y) {
        var pp = getElementPosition("#dungeonBoard");
        var pp2 = dungeonBoard.getAbsolutePosition(x, y);
        return { x: pp.x + pp2.x, y: pp.y + pp2.y };
    }

    function getElementPosition(selector) {
        var element = $(selector);
        if (element.length > 0) {
            return { x: element.offset().left, y: element.offset().top };
        } else {
            return null;
        }
    }

    function doStartupTutorial() {
        // show welcome screen and then first tutorial        
        self.showDialog(Dialog.createWelcomeDialog(), showContactButtonTutorial);
    }

    function showContactButtonTutorial() {

        if (isSetupTutorialEnabled) {
            trackEvent('start', 'withTutorial');
        } else {
            trackEvent('start', 'withoutTutorial');
        }

        $("#kickstarterButton").show();
        $("#contactButton").show();
        var pp = getElementPosition("#contactButton");
        showTutorial(TutorialStep.SETUP_CONTACT, pp, showStartPieceTutorial);
    }

    function showStartPieceTutorial() {
        surfaceBoard.setShowBoard(true);
        if (isSetupTutorialEnabled) {
            render();
            var pp = isSetupTutorialEnabled ? getSurfacePosition(5, 5) : null;
            showTutorial(TutorialStep.SETUP_STARTPIECE, pp, showDungeonBoardTutorial);
        } else {
            showDungeonBoardTutorial();
        }
    }

    function showDungeonBoardTutorial() {
        dungeonBoard.setShowBoard(true);
        if (isSetupTutorialEnabled) {
            render();
            var pp = getDungeonPosition(0, 4);
            showTutorial(TutorialStep.SETUP_DUNGEON, pp, showDungeonTrapsTutorial, true);
        } else {
            showDungeonTrapsTutorial();
        }
    }

    function showDungeonTrapsTutorial() {
        dungeonBoard.setupTraps();
        if (isSetupTutorialEnabled) {
            render();

            var pp = getDungeonPosition(0, 6);

            showTutorial(TutorialStep.SETUP_TRAPS, pp, showDungeonTreasureTutorial, true);
        } else {
            showDungeonTreasureTutorial();
        }
    }

    function showDungeonTreasureTutorial() {
        dungeonBoard.setupTreasure();;
        if (isSetupTutorialEnabled) {
            render();

            var pp = getDungeonPosition(2, 4);

            showTutorial(TutorialStep.SETUP_TREASURE, pp, showMonsterTokenTutorial, true);
        } else {
            showMonsterTokenTutorial();
        }
    }

    function showMonsterTokenTutorial() {
        dungeonBoard.setupMonsters();
        if (isSetupTutorialEnabled) {
            render();

            var pp = getDungeonPosition(0, 5);

            showTutorial(TutorialStep.SETUP_MONSTERTOKEN, pp, showMonsterCardTutorial, true);
        } else {
            showMonsterCardTutorial();
        }
    }

    function showMonsterCardTutorial() {
        dungeonBoard.setShowMonsterCards(true);
        if (isSetupTutorialEnabled) {
            render();

            var pp = getElementPosition(".monsterBoard:last-child");
            showTutorial(TutorialStep.SETUP_MONSTERCARDS, pp, showMonsterTeethTutorial, true);
        } else {
            showMonsterTeethTutorial();
        }
    }

    function showMonsterTeethTutorial() {
        dungeonBoard.showMonsterTeeth();
        if (isSetupTutorialEnabled) {
            render();

            var pp = getElementPosition(".monsterBoard:last-child img.level");
            showTutorial(TutorialStep.SETUP_MONSTERTEETH, pp, showMonsterHeartsTutorial, true);
        } else {
            showMonsterHeartsTutorial();
        }
    }

    function showMonsterHeartsTutorial() {
        dungeonBoard.showMonsterHearts();
        render();

        var pp = getElementPosition(".monsterBoard:last-child img.heart");
        showTutorial(TutorialStep.SETUP_MONSTERHEARTS, pp, showPlayerSelectionDialog, true);
    }

    function showPlayerSelectionDialog() {
        self.showDialog(Dialog.createPlayerSelectionDialog(playerCount), function (ids) {

            trackEvent('start', 'playerCount_' + ids.length);

            setupPlayers(ids);
            showPlayerTokenTutorial();
        });
    }

    function showPlayerTokenTutorial() {
        addPlayersToBoard();

        if (isSetupTutorialEnabled) {
            render();

            var pp = getSurfacePosition(5, 5);
            showTutorial(TutorialStep.SETUP_PLAYERTOKEN, pp, showPlayerCardsTutorial);
        } else {
            showPlayerCardsTutorial();
        }
    }


    function showPlayerCardsTutorial() {
        var i = players.length;
        while (i--) {
            players[i].setFocus(true);
        }
        if (isSetupTutorialEnabled) {
            render();

            var pp = getElementPosition(".playerBoard");
            showTutorial(TutorialStep.SETUP_PLAYERCARDS, pp, showPlayerHeartsTutorial);
        } else {
            showPlayerHeartsTutorial();
        }
    }

    function showPlayerHeartsTutorial() {
        showPlayerLives();
        if (isSetupTutorialEnabled) {
            render();

            var pp = getElementPosition(".playerBoard img.heart");
            showTutorial(TutorialStep.SETUP_PLAYERHEARTS, pp, showMissionCardsTutorial);
        } else {
            showMissionCardsTutorial();
        }
    }
    function showMissionCardsTutorial() {
        var i = players.length;
        while (i--) {
            players[i].setMissionFocus(true);
        }
        if (isSetupTutorialEnabled) {
            render();

            var pp = getElementPosition(".missionPanel");
            showTutorial(TutorialStep.SETUP_MISSIONCARDS, pp, showPlayerPointsTutorial, true);
        } else {
            // skip directly to next tutorial
            showPlayerPointsTutorial();
        }
    }

    function showPlayerPointsTutorial() {
        var i = players.length;
        while (i--) {
            players[i].setPointsFocus(true);
        }
        if (isSetupTutorialEnabled) {
            render();

            var pp = getElementPosition(".pointLabel");
            showTutorial(TutorialStep.SETUP_PLAYERPOINTS, pp, showStartDialogs, true);
        } else {
            // skip directly to next tutorial
            showActionPointsTutorial();
        }
    }

    function showStartDialogs() {
        self.showDialog(Dialog.createStartDialog(currentPlayer), function () {
            //self.showDialog(Dialog.createMissionDialog(), function () {
                showActionPointsTutorial();
            //});
        });
    }

    function showActionPointsTutorial() {
        var i = players.length;
        while (i--) {
            players[i].setHasStepFocus(true);
        }
        if (isSetupTutorialEnabled) {
            render();
            var pp = getElementPosition(".stepBox");
            showTutorial(TutorialStep.SETUP_ACTIONPOINTS, pp, showFirstGameMovementTutorial, true);
        } else {
            // skip directly to next tutorial
            showFirstGameMovementTutorial();
        }
    }

    //function showMissionButtonTutorial() {
     
    //    $("#missionButton").show();
    //    if (isSetupTutorialEnabled) {          
    //        var pp = getElementPosition("#missionButton");
    //        showTutorial(TutorialStep.SETUP_MISSIONBUTTON, pp, showFirstGameMovementTutorial, true);
    //    } else {
    //        // skip directly to next tutorial
    //        showFirstGameMovementTutorial();
    //    }
    //}
   
    function showFirstGameMovementTutorial() {
        isInSetup = false;

        // if no in tutorial mode - show missing elements - otherwise they will be shown during the game
        if (!isSetupTutorialEnabled) {
            enableAndShowOtherPlayersTutorial();
            enableAndShowGuideTutorial();
            enableAndShowAlchemyTutorial();
        }

        render();

        var pp = getSurfacePosition(5, 5);
        showTutorial(TutorialStep.STEP_MOVEMENT, pp);
    }

    /* special tutorials will be activated during game - in tutorial node */
    function enableAndShowOtherPlayersTutorial() {
        showOtherPlayers = true;
        if (isSetupTutorialEnabled) {
            render();
            var pp = getElementPosition(".playerPortait:last-child");
            showTutorial(TutorialStep.SETUP_OTHERPLAYERS, pp);
        }
    }

    function enableAndShowAlchemyTutorial() {
        $("#alchemyButton").show();

        var pp = getElementPosition("#alchemyButton");
        showTutorial(TutorialStep.SETUP_ALCHEMY, pp);
    }

    function enableAndShowGuideTutorial() {
        $("#helpButton").show();      

        var pp = getElementPosition("#helpButton");
        showTutorial(TutorialStep.SETUP_GUIDE, pp);
    }


    /* other tutorials */
    function handleNoStepsLeftTutorial() {
        if (!currentPlayer.hasStepsLeft()) {
            var pp = getElementPosition(".stepBox");
            showTutorial(TutorialStep.STEP_NOSTEPSLEFT, pp);
        }
    }

    function handleTeethCollectedTutorial() {
        if (currentPlayer.getPoints() > 0) {
            var pp = getElementPosition(".pointLabel");
            showTutorial(TutorialStep.STEP_FIRSTTEETHCOLLECTED, pp);
            if (currentPlayer.getPoints() >= targetTeeth) {
                showTutorial(TutorialStep.STEP_TEETHCOLLECTED, pp);
            }
        }
    }

    function handlePotionRelevantTutorial() {
        if (isSetupTutorialEnabled && !$("#alchemyButton").is(':visible')) {
            enableAndShowAlchemyTutorial();
        }
    }

    function handleGuideRelevantTutorial() {
        if (isSetupTutorialEnabled && !$("#helpButton").is(':visible')) {
            enableAndShowGuideTutorial();
        }
    }

    function handleTutorialsWhenItemWasAdded(type) {
        var pp;

        if (type === ItemType.SWORD) {
            pp = getElementPosition(".swordItem");
            showTutorial(TutorialStep.STEP_SWORDFOUND, pp);
        } else if (type === ItemType.BOOT) {
            pp = getElementPosition(".bootItem");
            showTutorial(TutorialStep.STEP_BOOTFOUND, pp);
        } else if (type === ItemType.RING) {
            pp = getElementPosition(".ringItem");
            showTutorial(TutorialStep.STEP_RINGFOUND, pp);
            handlePotionRelevantTutorial();
        }

        if (!hasShownTutorialStep(TutorialStep.STEP_POTIONAVAILABLE) && currentPlayer.getCreatablePotions().length > 0) {
            pp = getElementPosition(".potionPlaceholder");
            showTutorial(TutorialStep.STEP_POTIONAVAILABLE, pp);
        }

        handleTutorialsWhenMissionPossible();

        if (!hasShownTutorialStep(TutorialStep.STEP_INVENTORYFULL) && !currentPlayer.hasBackpackSpace()) {
            pp = getElementPosition(".backpack1Item");
            showTutorial(TutorialStep.STEP_INVENTORYFULL, pp);
        }
    }

    function handleTutorialsWhenMissionPossible() {
        if (!hasShownTutorialStep(TutorialStep.STEP_MISSIONAVAILABLE) && currentPlayer.getFinishableMission() !== null) {
            var pp = getElementPosition(".missionPanel");
            showTutorial(TutorialStep.STEP_MISSIONAVAILABLE, pp);
        }
    }

    function handleLastTileTutorial(x, y) {
        if (!hasShownTutorialStep(TutorialStep.STEP_LASTTILE) && !tileStack.hasCardsLeft()) {
            var pp = getSurfacePosition(x, y);            
            showTutorial(TutorialStep.STEP_LASTTILE, pp);
        }    
    }

    function trackEvent(category, action, count) {
        if (count === undefined) {
            ga('send', 'event', { 'eventCategory': category, 'eventAction': action }, { 'nonInteraction': 1 });
        } else {
            ga('send', 'event', { 'eventCategory': category, 'eventAction': action, 'eventValue': count }, { 'nonInteraction': 1 });
        }
    }
}