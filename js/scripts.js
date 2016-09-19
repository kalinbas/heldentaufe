var ChipType = {    
    TREASURE: { image: "chip_treasure.png" },
    TRAPOPEN: { image: "chip_trap.png" },
    NOTRAPOPEN: { image: "chip_notrap.png" },
    TRAPCLOSED: { image: "chip_back.png" },
    NOTRAPCLOSED: { image: "chip_back.png" },
};

var Dialog = {
    createWelcomeDialog: function () {

        var languageSelector = $("<select>").addClass("dialogSelect").change(function () {
            // remove check
            $(window).unbind('beforeunload');
            window.location = 'http://demo.heldentaufe.ch?lang=' + $(this).children(":selected").val();
        });
        $.each(loader.getLanguages(), function (index, value) {
            languageSelector.append($("<option>").val(value).text($.i18n.prop("language_name_" + value)).prop("selected", value === loader.getLanguage()));
        });


        var panel = $("<div>");
        panel.append($("<img>").addClass("dialogTile").attr("src", "img/character.jpg"));
        panel.append(languageSelector);
        panel.append($("<h4>").html(dialog_welcome_title));
        panel.append($("<p>").text(dialog_welcome_text_1));
        panel.append($("<p>").text(dialog_welcome_text_2));
        panel.append($("<p>").text(dialog_welcome_text_3));
        panel.append($("<p>").append($("<input>").attr("type", "checkbox").attr("id", "withTutorial").prop("checked", true).click(function () { game.clickOnTutorialCheckbox($(this).prop('checked')); })).append($("<label>").attr("for", "withTutorial").text(dialog_welcome_withtutorial)));
        panel.append($("<p>").html(dialog_welcome_warning));
        panel.append($("<div>").addClass("btn").text(dialog_welcome_start_button).click(function () { game.closeDialog(); }));
        return panel;
    },
    createStartDialog: function (firstPlayer) {
        var panel = $("<div>");
        panel.append($("<img>").addClass("dialogTile").attr("src", "img/character2.jpg"));
        panel.append($("<h4>").text(dialog_start_title));
        panel.append($("<p>").text(dialog_start_text(firstPlayer.getName())));
        panel.append($("<div>").addClass("btn").text(dialog_start_start_button).click(function () { game.closeDialog(); }));
        return panel;
    },
    //createMissionDialog: function () {
    //    var panel = $("<div>");
    //    panel.append($("<img>").addClass("dialogTile").attr("src", "img/guide_mission.jpg"));
    //    panel.append($("<h4>").html(dialog_mission_title));
    //    panel.append($("<p>").text(dialog_mission_text_1));
    //    panel.append($("<p>").text(dialog_mission_text_2));
    //    panel.append($("<p>").text(dialog_mission_text_3));
    //    panel.append($("<div>").addClass("btn").text(dialog_mission_start_button).click(function () { game.closeDialog(); }));
    //    return panel;
    //},
    createForestDialog: function (result) {
        var panel = $("<div>");
        panel.append($("<img>").addClass("dialogTile").attr("src", "img/forest.png"));
        panel.append($("<h4>").text(dialog_forest_title));
        panel.append($("<p>").text(dialog_forest_text));

        panel.append($("<div>").addClass("btn").attr("id", "throwDiceButton").text(dialog_forest_throwdice).click(function () { $("#throwDiceButton").hide(); $(".rewards").show(); $("#dialogCloseButton").show(); }));

        var rewards = $("<div>").addClass("rewards").hide();
        var dice = $("<div>").addClass("diceTreasure").addClass("dice" + result);
        rewards.append(dice);
        panel.append(rewards);
        panel.append($("<div>").addClass("btn").attr("id", "dialogCloseButton").text(dialog_forest_takereward).click(function () { game.closeDialog(); }).hide());
        return panel;
    },
    createTreasureDialog: function (r1, r2, r3) {
        var panel = $("<div>");
        panel.append($("<img>").addClass("dialogTile").attr("src", "img/chip_treasure.png"));
        panel.append($("<h4>").text(dialog_treasure_title));
        panel.append($("<p>").text(dialog_treasure_text));

        /*
        var runningCount = 3;
        var closeFunction = function() {
            runningCount--;
            if (runningCount <= 0) {
                $("#dialogCloseButton").show();
            }
        };
        */

        panel.append($("<div>").addClass("btn").attr("id", "throwDiceButton").text(dialog_treasure_throwdice).click(function () { $("#throwDiceButton").hide(); $(".rewards").show(); $("#dialogCloseButton").show(); }));

        var rewards = $("<div>").addClass("rewards").hide();

        var dice1 = $("<div>").addClass("diceTreasure").addClass("dice" + r1);
        //Utils.runDice(dice1, r1, closeFunction);
        rewards.append(dice1);

        var dice2 = $("<div>").addClass("diceTreasure").addClass("dice" + r2);
        //Utils.runDice(dice2, r2, closeFunction);
        rewards.append(dice2);

        var dice3 = $("<div>").addClass("diceTreasure").addClass("dice" + r3);
        //Utils.runDice(dice3, r3, closeFunction);
        rewards.append(dice3);

        panel.append(rewards);

        panel.append($("<div>").addClass("btn").attr("id", "dialogCloseButton").text(dialog_treasure_takereward).click(function () { game.closeDialog(); }).hide());
        return panel;
    },
    createEnterDungeonTutorialDialog: function () {
        var panel = $("<div>");
        panel.append($("<img>").addClass("dialogTile").attr("src", "img/monster.jpg"));
        panel.append($("<h4>").text(dialog_enterdungeon_title));
        panel.append($("<p>").text(dialog_enterdungeon_text));
        panel.append($("<p>").text(dialog_enterdungeon_text2));
        panel.append($("<div>").addClass("btn").attr("id", "dialogCloseButton").text(dialog_next).click(function () { game.closeDialog(); }));
        return panel;
    },
    createEnterDungeon2TutorialDialog: function () {
        var panel = $("<div>");
        panel.append($("<h4>").text(dialog_enterdungeon2_title));
        panel.append($("<p>").text(dialog_enterdungeon2_text));
        panel.append($("<img>").attr("src", "img/guide_fight.png"));
        panel.append($("<p>").text(dialog_enterdungeon2_text2));
        panel.append($("<div>").addClass("btn").attr("id", "dialogCloseButton").text(dialog_next).click(function () { game.closeDialog(); }));
        return panel;
    },
    createEnterDungeon3TutorialDialog: function () {
        var panel = $("<div>");

        panel.append($("<h4>").text(dialog_enterdungeon3_title));

        var subPanel = $("<div>").addClass("clearfix");
        subPanel.append($("<img>").addClass("dialogTile alignToP").attr("src", "img/chip_back.png"));
        subPanel.append($("<p>").text(dialog_enterdungeon3_text));
        panel.append(subPanel);

        var subPanel2 = $("<div>").addClass("clearfix");
        subPanel2.append($("<img>").addClass("dialogTile alignToP").attr("src", "img/chip_treasure.png"));
        subPanel2.append($("<p>").text(dialog_enterdungeon3_text2));
        panel.append(subPanel2);

        panel.append($("<div>").addClass("btn").attr("id", "dialogCloseButton").text(dialog_enterdungeon3_button).click(function () { game.closeDialog(); }));
        return panel;
    },
    createSmithDialog: function (allItems, playerFunction) {
        var panel, res;

        panel = $("<div>").addClass("smith");
        panel.append($("<img>").addClass("dialogTile").attr("src", "img/smith.png"));
        panel.append($("<h4>").text(dialog_smith_title));
        panel.append($("<p>").text(dialog_smith_text));

        var actions = $("<div>").addClass("actionPanel");
        appendActionLine(actions, ItemType.SWORD, 1, 1);
        appendActionLine(actions, ItemType.SWORD, 1, 2);

        // handle special cases
        res = getTwo(ItemType.SWORD, 2, 2);
        if (res[0] !== null && res[1] != null) {
            appendActionLine(actions, ItemType.SWORD, 2, 2);
        }

        appendActionLine(actions, ItemType.BOOT, 1, 1);
        appendActionLine(actions, ItemType.BOOT, 1, 2);

        // handle special cases
        res = getTwo(ItemType.BOOT, 2, 2);
        if (res[0] !== null && res[1] != null) {
            appendActionLine(actions, ItemType.BOOT, 2, 2);
        }

        appendActionLine(actions, ItemType.RING, 1, 1);
        appendActionLine(actions, ItemType.RING, 1, 2);

        // handle special cases
        res = getTwo(ItemType.RING, 2, 2);
        if (res[0] !== null && res[1] != null) {
            appendActionLine(actions, ItemType.RING, 2, 2);
        }

        panel.append(actions);

        panel.append($("<br>"));
        panel.append($("<div>").addClass("btn").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;

        function appendActionLine(actionPanel, type, level1, level2) {

            var typeName = $.i18n.prop(type.nameKey);

            var same = getTwo(type, level1, level2);

            var img1a = $("<img>").addClass("item").attr("src", "img/" + type["image" + level1]);
            if (same[0] !== null) {
                img1a.addClass("available");
            }
            var img1b = $("<img>").addClass("item").attr("src", "img/" + type["image" + level2]);
            var img2 = $("<img>").addClass("item").attr("src", "img/" + type["image" + (level2 + 1)]);
            if (same[1] !== null) {
                img1b.addClass("available");
                if (same[0] !== null && same[1] !== null) {
                    img2.addClass("available").addClass("clickable").attr("title", dialog_smith_improve_title(typeName)).click(function () { playerFunction(same[0], same[1]); game.closeDialog(null, true); });
                }
            }

            actionPanel.append($("<div>").addClass("actionLine").append(img1a).append(" + ").append(img1b).append($("<div>").addClass("arrow-right")).append(img2));
        }

        function getTwo(type, level1, level2) {
            var i, j, l;

            var result = [null, null];
            for (i = 0, l = allItems.length; i < l; i++) {
                if (allItems[i].hasType(type) && allItems[i].hasLevel(level1)) {
                    result[0] = i;
                }
            }
            for (i = 0, l = allItems.length; i < l; i++) {
                if (allItems[i].hasType(type) && allItems[i].hasLevel(level2) && (result[0] === null || result[0] !== i)) {
                    result[1] = i;
                }
            }
            return result;
        }
    },
    createTraderDialog: function (notUsedThisTurn, allItems, playerFunction) {
        var panel;

        panel = $("<div>").addClass("trader");
        panel.append($("<img>").addClass("dialogTile").attr("src", "img/trader.png"));
        panel.append($("<h4>").text(dialog_trader_title));
        panel.append($("<p>").text(dialog_trader_text));

        if (!notUsedThisTurn) {
            panel.append($("<p>").text(dialog_trader_text_notpossible));
        }

        var actions = $("<div>").addClass("actionPanel");
        appendActionLine(actions, ItemType.SWORD, 1);
        appendActionLine(actions, ItemType.BOOT, 1);
        appendActionLine(actions, ItemType.RING, 1);
        appendActionLine(actions, ItemType.SWORD, 2);
        appendActionLine(actions, ItemType.BOOT, 2);
        appendActionLine(actions, ItemType.RING, 2);
        appendActionLine(actions, ItemType.SWORD, 3);
        appendActionLine(actions, ItemType.BOOT, 3);
        appendActionLine(actions, ItemType.RING, 3);
        panel.append(actions);

        if (actions.children().length === 0) {
            panel.append($("<p>").text(dialog_trader_noitems));
        }

        panel.append($("<br>"));
        panel.append($("<div>").addClass("btn").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;

        function appendActionLine(actionPanel, type, level) {
            var i = hasItemOfLevel(type, level);

            // if player has this object
            if (i !== null) {
                var img = $("<img>").addClass("item").attr("src", "img/" + type["image" + level]).addClass("available");

                var imgs = [];
                if (type !== ItemType.SWORD) {
                    imgs.push(createActionImage(ItemType.SWORD, level, i));
                }
                if (type !== ItemType.BOOT) {
                    imgs.push(createActionImage(ItemType.BOOT, level, i));
                }
                if (type !== ItemType.RING) {
                    imgs.push(createActionImage(ItemType.RING, level, i));
                }
                actionPanel.append($("<div>").addClass("actionLine").append(imgs[0]).append($("<div>").addClass("arrow-left")).append(img).append($("<div>").addClass("arrow-right")).append(imgs[1]));
            }
        }

        function hasItemOfLevel(type, level) {
            var i, l;
            for (i = 0, l = allItems.length; i < l; i++) {
                if (allItems[i].hasType(type) && allItems[i].hasLevel(level)) {
                    return i;
                }
            }
            return null;
        }

        function createActionImage(type, level, i) {

            var typeName = $.i18n.prop(type.nameKey);

            var img = $("<img>").addClass("item").attr("src", "img/" + type["image" + level]);
            if (notUsedThisTurn) {
                img.attr("title", dialog_trader_switch_title(typeName)).addClass("clickable").click(function () {
                    playerFunction(i, type);
                    game.closeDialog(null);
                });
            }
            return img;
        }
    },
    createCastleDialog: function (notUsedThisTurn, allItems, playerFunction) {

        var panel;

        panel = $("<div>").addClass("castle");
        panel.append($("<img>").addClass("dialogTile").attr("src", "img/castle.png"));
        panel.append($("<h4>").text(dialog_castle_title));
        panel.append($("<p>").text(dialog_castle_text));

        if (!notUsedThisTurn) {
            panel.append($("<p>").text(dialog_castle_text_notpossible));
        }
      
        var actions = $("<div>").addClass("actionPanel");
        appendActionLine(actions, ItemType.SWORD);
        appendActionLine(actions, ItemType.BOOT);
        appendActionLine(actions, ItemType.RING);
        panel.append(actions);

        panel.append($("<br>"));
        panel.append($("<div>").addClass("btn").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;

        function appendActionLine(actionPanel, type) {

            var typeName = $.i18n.prop(type.nameKey);

            var level1Index = hasItemOfLevel(type, 1);
            var img1 = $("<img>").addClass("item").attr("src", "img/" + type.image1);
            if (level1Index !== null) {
                img1.addClass("available");
            }

            var level2Index = hasItemOfLevel(type, 2);
            var img2 = $("<img>").addClass("item").attr("src", "img/" + type.image2);
            if (level1Index !== null && notUsedThisTurn) {
                img2.addClass("clickable").attr("title", dialog_castle_improve_title(typeName)).click(function () { playerFunction(level1Index); game.closeDialog(null, true); });
            }
            if (level2Index !== null) {
                img2.addClass("available");
            }

            var level3Index = hasItemOfLevel(type, 3);
            var img3 = $("<img>").addClass("item").attr("src", "img/" + type.image3);
            if (level2Index !== null && notUsedThisTurn) {
                img3.addClass("clickable").attr("title", dialog_castle_improve_title(typeName)).click(function () { playerFunction(level2Index); game.closeDialog(null, true); });
            }
            if (level3Index !== null) {
                img3.addClass("available");
            }
            actionPanel.append($("<div>").addClass("actionLine").append(img1).append($("<div>").addClass("arrow-right")).append(img2).append($("<div>").addClass("arrow-right")).append(img3));
        }

        function hasItemOfLevel(type, level) {
            var i, l;
            for (i = 0, l = allItems.length; i < l; i++) {
                if (allItems[i].hasType(type) && allItems[i].hasLevel(level)) {
                    return i;
                }
            }
            return null;
        }
    },
    createPotionDialog: function (allItems, magic, playerFunction) {
        var panel;

        panel = $("<div>").addClass("trader");
        //panel.append($("<img>").addClass("dialogTile").attr("src", "img/trader.png"));
        panel.append($("<h4>").text(dialog_potion_create_title));
        panel.append($("<p>").text(dialog_potion_create_text));

        var actions = $("<div>").addClass("actionPanel");

        appendActionLine(actions, ItemType.APPLE, ItemType.FISH, 1, dialog_potion_description_1_text);
        appendActionLine(actions, ItemType.APPLE, ItemType.MUSHROOM, 2, dialog_potion_description_2_text);
        appendActionLine(actions, ItemType.MUSHROOM, ItemType.FISH, 3, dialog_potion_description_3_text);

        panel.append(actions);

        panel.append($("<br>"));
        panel.append($("<div>").addClass("btn").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;

        function appendActionLine(actionPanel, type1, type2, level, description) {

            var typeName = $.i18n.prop(ItemType.POTION.nameKey + "_" + level);

            var index1 = hasItem(type1);
            var img1a = $("<img>").addClass("item").attr("src", "img/" + type1["image"]);
            if (index1 !== null) {
                img1a.addClass("available");
            }
            var index2 = hasItem(type2);
            var img1b = $("<img>").addClass("item").attr("src", "img/" + type2["image"]);
            if (index2 !== null) {
                img1b.addClass("available");
            }

            var img2 = $("<img>").addClass("item").attr("src", "img/" + ItemType.POTION["image" + level]);
            if (index1 !== null && index2 !== null && magic >= level) {
                img2.addClass("available").addClass("clickable").attr("title", dialog_potion_create_item_title(typeName)).click(function () { playerFunction(index1, index2, level); game.closeDialog(null, true); });
            }

            actionPanel.append($("<p>").text(description));
            actionPanel.append($("<div>").addClass("actionLine").append(img1a).append(" + ").append(img1b).append($("<div>").addClass("arrow-right")).append(img2));
        }

        function hasItem(type) {
            var i, l;
            for (i = 0, l = allItems.length; i < l; i++) {
                if (allItems[i].hasType(type)) {
                    return i;
                }
            }
            return null;
        }
    },
    createTrapDialog: function () {
        var panel = $("<div>");
        panel.append($("<img>").addClass("dialogTile").attr("src", "img/chip_trap.png"));
        panel.append($("<h4>").text(dialog_trap_title));
        panel.append($("<p>").text(dialog_trap_text));
        panel.append($("<div>").addClass("btn").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;
    },
    createMissionFulfilledDialog: function (missionType) {
        var panel = $("<div>");

        var mission = $("<div>").addClass("missionCard")
            .append($("<p>").text($.i18n.prop('missiontext_' + missionType.descKey)))
            .append($("<img>").addClass("dialogTile").attr("src", "img/" + missionType.image));

        panel.append(mission);
        panel.append($("<h4>").text(dialog_missionfulfilled_title));
        panel.append($("<p>").text(dialog_missionfulfilled_text));
        panel.append($("<div>").addClass("btn").text(dialog_next).click(function () { game.closeDialog(); }));
        return panel;
    },
    createMissionFulfilledChooseDialog: function (missionType) {
        var panel = $("<div>");        
        
        var mission = $("<div>").addClass("missionCard")
           .append($("<p>").text($.i18n.prop('missiontext_' + missionType.descKey)))
           .append($("<img>").addClass("dialogTile").attr("src", "img/" + missionType.image));

        panel.append(mission);
        panel.append($("<h4>").text(dialog_missionfulfilled_title));
        panel.append($("<p>").text(dialog_missionfulfilledchoose_text));
        panel.append($("<div>").addClass("btn").text(dialog_missionfulfilledchoose_option1).click(function () { game.closeDialog(false); }));
        panel.append($("<div>").addClass("btn").text(dialog_missionfulfilledchoose_option2).click(function () { game.closeDialog(true); }));  // take teeth boolean parameter
        return panel;
    },
    createNewMissionCardDialog: function (missionType) {
        var panel = $("<div>");
       
        var mission = $("<div>").addClass("missionCard")
          .append($("<p>").text($.i18n.prop('missiontext_' + missionType.descKey)))
          .append($("<img>").addClass("dialogTile").attr("src", "img/" + missionType.image));

        panel.append(mission);
        panel.append($("<h4>").text(dialog_newmissioncard_title));
        panel.append($("<p>").text(dialog_newmissioncard_text));
        panel.append($("<div>").addClass("btn").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;
    },
    createDeathDialog: function (player, isCurrent, killedByPlayer) {
        var panel = $("<div>");
        if (isCurrent) {
            panel.append($("<h4>").text(dialog_death_title_current));
        } else {
            panel.append($("<h4>").text(dialog_death_title_other(player.getName())));
        }

        panel.append($("<p>").text(dialog_death_text));

        if (killedByPlayer) {
            panel.append($("<p>").text(dialog_death_text_byplayer));
        } else {
            panel.append($("<p>").text(dialog_death_text_bymonster));
        }

        panel.append($("<div>").addClass("btn").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;
    },
    createVoluntaryDiscardDialog: function (discardFunction, item) {
        var panel = $("<div>");
        panel.append($("<h4>").text(dialog_voluntarydiscard_title));
        // explanation why it will be discarded
        if (item.hasType(ItemType.APPLE) || item.hasType(ItemType.FISH) || item.hasType(ItemType.MUSHROOM)) {
            panel.append($("<p>").text(dialog_voluntarydiscard_text_resource));
        } else if (item.hasType(ItemType.POTION)) {
            if (item.hasLevel(1)) {
                panel.append($("<p>").text(dialog_voluntarydiscard_text_potion1));
            } else if (item.hasLevel(2)) {
                panel.append($("<p>").text(dialog_voluntarydiscard_text_potion2));
            } else {
                panel.append($("<p>").text(dialog_voluntarydiscard_text_potion3));
            }
        }
        panel.append($("<img>").addClass("item discardable").attr("src", "img/" + item.getImageName()));
        panel.append($("<p>").text(dialog_voluntarydiscard_text));
        panel.append($("<div>").addClass("btnPanel clearfix").append($("<div>").addClass("btn leftAligned").text(dialog_yes).click(function () {
            game.closeDialog();
            discardFunction();
        })).append($("<div>").addClass("btn").text(dialog_no).click(function () { game.closeDialog(); })));
        return panel;
    },
    createActionDiscardDialog: function (discardFunction) {
        var panel = $("<div>");
        panel.append($("<h4>").text(dialog_actiondiscard_title));
        panel.append($("<p>").text(dialog_actiondiscard_text));
        panel.append($("<br>"));
        panel.append($("<div>").addClass("btnPanel clearfix").append($("<div>").addClass("btn leftAligned").text(dialog_yes).click(function () {
            game.closeDialog();
            discardFunction();
        })).append($("<div>").addClass("btn").text(dialog_no).click(function () { game.closeDialog(); })));
        return panel;
    },
    createForcedDiscardDialog: function (allItems, bestSword, bestBoot, bestRing, discardAndCheckFunction) {
        var panel, i, l;

        function setupDiscardPanel(panel) {
            panel.empty();
            panel.append($("<h4>").text(dialog_forceddiscard_title));
            panel.append($("<p>").text(dialog_forceddiscard_text));

            for (i = 0, l = allItems.length; i < l; i++) {
                // only allow discarding of items in "inventory"
                if (allItems[i] !== bestSword && allItems[i] !== bestBoot && allItems[i] !== bestRing && !allItems[i].hasType(ItemType.POTION)) {
                    appendDiscardAction(panel, allItems[i], i);
                }
            }
        }

        function appendDiscardAction(panel, item, i) {
            panel.append($("<img>").attr("src", "img/" + item.getImageName()).addClass("item discardable clickable shadowed").click(function () {
                if (discardAndCheckFunction(i)) {
                    setupDiscardPanel(panel);
                } else {
                    game.closeDialog(null, true);
                }
            }));
        }

        panel = $("<div>");
        setupDiscardPanel(panel);
        return panel;
    },
    createOtherPlayerDialog: function (player) {
        var panel = $("<div>");
        panel.append(player.renderOther());
        panel.append($("<div>").addClass("btn topSpace").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;
    },
    createMissionCardDialog: function (player) {
        var panel = $("<div>");
        panel.append(player.renderMissionCards());
        panel.append($("<div>").addClass("btn topSpace").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;
    },
    createGuideDialog: function () {
        var panel = $("<div>");
        panel.append($("<img>").attr("src", "img/guide.jpg").addClass("shadowed"));
        panel.append($("<div>").addClass("btn topSpace").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;
    },
    //createMissionGuideDialog: function () {
    //    var panel = $("<div>");
    //    panel.append($("<img>").attr("src", "img/guide_mission.jpg").addClass("shadowed"));
    //    return panel;
    //},
    createAlchemyGuideDialog: function () {
        var panel = $("<div>");
        panel.append($("<img>").attr("src", "img/guide_alchemy.jpg").addClass("shadowed"));
        panel.append($("<div>").addClass("btn topSpace").text(dialog_close).click(function () { game.closeDialog(); }));
        return panel;
    },
    appendContactSubDialog: function (parentPanel, onSended, hasCloseButton) {

        var panel = $("<div>").addClass("contact");

        panel.append($("<label>").text(dialog_contact_email).attr("for", "emailField"));
        panel.append($("<input>").attr("name", "emailField").attr("id", "emailField"));

        panel.append($("<label>").text(dialog_contact_message).attr("for", "messageField"));
        panel.append($("<textarea>").attr("name", "messageField").attr("id", "messageField"));

        panel.append(
            $("<div>").addClass("btnPanel clearfix").append(
                $("<div>").addClass("btn leftAligned").text(dialog_cancel).click(function () {
                    game.closeDialog();
                }).toggle(hasCloseButton)).append(
                $("<div>").addClass("btn").text(dialog_contact_send).click(function () {

                    var valid = /\S+@\S+\.\S+/.test($('#emailField').val());
                    $('#emailField').toggleClass("error", !valid);

                    valid = valid && $('#messageField').val();
                    $('#messageField').toggleClass("error", !$('#messageField').val());

                    if (valid) {
                        $.ajax({
                            type: 'POST',
                            url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                            data: {
                                key: "2p9ukdHF9Df6LW7p0KHAIA",
                                message: {
                                    subject: "Heldentaufe Feedback",
                                    text: $('#messageField').val(),
                                    from_email: $('#emailField').val(),
                                    to: [{ email: "kalinbas@gmail.com" }, { email: "simonjunker@gmx.ch" }]
                                }
                            }
                        });
                        onSended();
                    }
                })));

        parentPanel.append(panel);
    },
    createContactDialog: function () {
        var panel = $("<div>");

        panel.append($("<h4>").text(dialog_contact_title));
        panel.append($("<p>").html(dialog_contact_text));

        Dialog.appendContactSubDialog(panel, function () { game.closeDialog(); }, true);

        return panel;
    },
    createPlayerSelectionDialog: function () {

        var clickOnPlayer = function () {
            if ($(".player.selected").length < 5 || $(this).hasClass("selected")) {
                $(this).toggleClass("selected");
            }
            $("#startButton").toggleClass("disabled", $(".player.selected").length < 2);
            $("#startButton").attr("title", $(".player.selected").length < 2 ? dialog_selectplayer_button_noready_title : "");
        };

        var clickOnStart = function () {
            if ($(".player.selected").length >= 2) {
                var ids = [];
                $(".player.selected").each(function (i, player) {
                    ids.push(parseInt($(player).data("id"), 10));
                });
                game.closeDialog(ids);
            }
        };

        var panel = $("<div>");
        panel.append($("<h4>").text(dialog_selectplayer_title));
        panel.append($("<p>").html(dialog_selectplayer_text));
        panel.append($("<p>").html(dialog_selectplayer_text2));
        panel.append($("<div>").addClass("clearfix")
            .append($("<div>").addClass("player").data("id", "1").append($("<img>").attr("title", $.i18n.prop(PlayerType.JUPANILLIA.descriptionKey)).attr("src", "img/" + PlayerType.JUPANILLIA.portraitImage).attr("height", "140")).click(clickOnPlayer))
            .append($("<div>").addClass("player").data("id", "2").append($("<img>").attr("title", $.i18n.prop(PlayerType.OLOFPAK.descriptionKey)).attr("src", "img/" + PlayerType.OLOFPAK.portraitImage).attr("height", "140")).click(clickOnPlayer))
            .append($("<div>").addClass("player").data("id", "3").append($("<img>").attr("title", $.i18n.prop(PlayerType.NATHANIEL.descriptionKey)).attr("src", "img/" + PlayerType.NATHANIEL.portraitImage).attr("height", "140")).click(clickOnPlayer))
            .append($("<div>").addClass("player").data("id", "4").append($("<img>").attr("title", $.i18n.prop(PlayerType.GULANZOR.descriptionKey)).attr("src", "img/" + PlayerType.GULANZOR.portraitImage).attr("height", "140")).click(clickOnPlayer))
            .append($("<div>").addClass("player").data("id", "5").append($("<img>").attr("title", $.i18n.prop(PlayerType.LUPHIUS.descriptionKey)).attr("src", "img/" + PlayerType.LUPHIUS.portraitImage).attr("height", "140")).click(clickOnPlayer))
            );
        panel.append($("<br>"));
        panel.append($("<div>").attr("title", dialog_selectplayer_button_noready_title).addClass("btn disabled").attr("id", "startButton").text(dialog_selectplayer_button).click(function () { clickOnStart(); }));
        return panel;
    },
    createWinDialog: function (winners) {
        var i;
        var panel = $("<div>").addClass("winDialog");
        panel.append($("<h4>").text(dialog_win_title));
        i = winners.length;
        while (i--) {
            panel.append($("<img>").addClass("dialogTileSmall").attr("src", "img/" + winners[i].getPortraitImage()));
        }
        var winnerP = $("<p>");

        i = winners.length;
        while (i--) {
            winnerP.append($("<b>").text(dialog_win_text_winner(winners[i].getName(), winners[i].getPoints()))).append($("<br>"));
        }
        panel.append(winnerP);

        panel.append($("<p>").html(dialog_win_text));

        panel.append($("<div>").addClass("btn").attr("id", "dialogCloseButton").text(dialog_next).click(function () { game.closeDialog(); }));

        return panel;
    },
    createWinDialog2: function () {
        var panel = $("<div>");
        panel.append($("<img>").addClass("dialogTileSmall").attr("src", "img/character3.jpg"));
        panel.append($("<h4>").text(dialog_win2_title));

        panel.append($("<p>").html(dialog_win2_text));

        Dialog.appendContactSubDialog(panel, function () { location.href = "http://www.heldentaufe.ch"; }, false);

        return panel;
    }
};
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
            { type: MissionType.MISSION10, count: 2 },
            { type: MissionType.MISSION11, count: 2 },
            { type: MissionType.MISSION12, count: 2 },
            { type: MissionType.MISSION13, count: 1 },
            { type: MissionType.MISSION14, count: 1 },
            { type: MissionType.MISSION15, count: 1 },
            { type: MissionType.MISSION16, count: 1 },
            { type: MissionType.MISSION17, count: 1 },
            { type: MissionType.MISSION18, count: 1 },
            { type: MissionType.MISSION22, count: 2 },
            { type: MissionType.MISSION23, count: 4 },
            { type: MissionType.MISSION24, count: 2 },
            { type: MissionType.MISSION25, count: 2 },
            { type: MissionType.MISSION26, count: 2 }
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

        $("#githubButton").show();
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

    this.getResurrectPosition = function () {
        var pos = this.findPositionOfType(TileType.DUNGEON1);
        if (!pos) pos = this.findPositionOfType(TileType.DUNGEON2);
        if (!pos) pos = this.findPositionOfType(TileType.DUNGEON3);
        if (!pos) pos = this.findPositionOfType(TileType.DUNGEON4);
        if (!pos) pos = this.findPositionOfType(TileType.DUNGEON5);
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
function Item(type, level) {

    this.isMaxLevel = function() {
        return level === 3;
    };

    this.equals = function(otherItem) {
        return otherItem.hasType(type) && otherItem.hasLevel(level);
    };

    this.hasType = function (typeToCheck) {
        return type === typeToCheck;
    };

    this.hasLevel = function (levelToCheck) {
        return level === levelToCheck;
    };
    
    this.getLevel = function () {
        return level;
    };

    this.changeType = function(typeToChange) {
        type = typeToChange;
    };

    this.increaseLevel = function() {
        if (type !== ItemType.SWORD && type !== ItemType.BOOT && type !== ItemType.RING) {
            throw Error("Item type can't be leveled up");
        }
        if (level >= 3) {
            throw Error("Item shouldn't be on level " + level);
        }
        level++;
    };

    this.getImageName = function() {
        if (type === ItemType.BOOT || type === ItemType.POTION || type === ItemType.SWORD || type === ItemType.RING) {
            return level === 1 ? type.image1 : level === 2 ? type.image2 : type.image3;
        }
        return type.image;
    };
}
var ItemType = {
    SWORD: { image1: "sword1.png", image2: "sword2.png", image3: "sword3.png", nameKey: "item_sword_name" },
    BOOT: { image1: "boot1.png", image2: "boot2.png", image3: "boot3.png", nameKey: "item_boot_name" },
    RING: { image1: "ring1.png", image2: "ring2.png", image3: "ring3.png", nameKey: "item_ring_name" },
    POTION: { image1: "potion1.png", image2: "potion2.png", image3: "potion3.png", nameKey: "item_potion_name" },
    MUSHROOM: { image: "mushroom.png", nameKey: "item_mushroom_name" },
    FISH: { image: "fish.png", nameKey: "item_fish_name" },
    APPLE: { image: "apple.png", nameKey: "item_apple_name" }
};

function Loader() {
    var data = {};
    var imagesToLoad =
        ['grass.png', 'forest.png', 'resource1.png', 'resource2.png', 'resource3.png', 'castle.png', 'village.png',
         'trader.png', 'smith.png', 'dungeon1.png', 'dungeon2.png', 'dungeon3.png', 'dungeon4.png', 'dungeon5.png',
         '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', 
         'gulanzor_board.jpg', 'jupanillia_board.jpg', 'nathaniel_board.jpg', 'olofpak_board.jpg', 'luphius_board.jpg', 'gulanzor.png', 'jupanillia.png', 'nathaniel.png', 'olofpak.png', 'luphius.png',
         'gulanzorPortrait.jpg', 'jupanilliaPortrait.jpg', 'nathanielPortrait.jpg', 'olofpakPortrait.jpg', 'luphiusPortrait.jpg', 'monsterPortrait.jpg', 'ulumutuPortrait.jpg', 'wallrogPortrait.jpg', 'zipflerPortrait.jpg',
         'ulumutu_board.jpg', 'zipfler_board.jpg', 'wallrog_board.jpg', 'ulumutu.png', 'zipfler.png', 'wallrog.png', 'monsterplayer.jpg', 'dungeonboard.jpg',
         'tooth1.png', 'tooth2.png', 'tooth3.png', 'tooth4.png', 'tooth5.png',
         'sword1.png', 'sword2.png', 'sword3.png', 'boot1.png', 'boot2.png', 'boot3.png', 'ring1.png', 'ring2.png', 'ring3.png', 'potion1.png', 'potion2.png', 'potion2_back.png', 'potion3.png', 'potion3_back.png',
         'apple.png', 'fish.png', 'mushroom.png', 
         'chip_trap.png', 'chip_notrap.png', 'chip_treasure.png', 'chip_back.png',
         'bubblebl.png', 'bubblebr.png', 'bubbletl.png', 'bubbletr.png', 'character.jpg', 'character2.jpg', 'character3.jpg', 'monster.jpg', 'nextbuttongreen.png', 'nextbuttonred.png', 'dicewhite.png', 'diceblack.png', 'dicetreasure.png',
         'MissionCards.png', 'missionicon.png', 'symbol_mail.png', 'symbol_tile.png', 'symbol_kickstarter.png', 'potion_placeholder.png', 'heart.png',
         'guide_alchemy.jpg', 'guide.jpg', 'guide_fight.png'
        ];

    var language;
    var areResourcesLoaded = false;

    var onLoadedCallback, onProgressCallback;

    this.init = function (lang, onlyRessource, onLoaded, onProgress) {

        language = lang;

        onLoadedCallback = onLoaded;
        onProgressCallback = onProgress;

        if (onlyRessource) {
            imagesToLoad = [];
        }

        //load localization
        $.i18n.properties({
            name: 'text', path: 'js/lang/', language: language, mode: 'both', callback: function () {
                areResourcesLoaded = true;

                // localize first elements - during loading
                $("#loading .line1").html(loading_line1);
                $("#loading .line2").html(loading_line2);
                checkFinished();
            }
        });


        //load images
        var i = imagesToLoad.length;
        while (i--) {
            var imageSrc = "img/" + imagesToLoad[i].replace("{lang}", language + "/");
            loadImage(imageSrc);
        }
    };

    function loadImage(imageSrc) {
        var imageObj = new Image();
        imageObj.onload = function () {
            var fileName = imageObj.src.substring(imageObj.src.lastIndexOf('/') + 1);
            if (imageObj.src.indexOf("/" + language + "/") >= 0) {
                fileName = "{lang}" + fileName;
            }
            data[fileName] = imageObj;
            imagesToLoad.splice(imagesToLoad.indexOf(fileName), 1);

            onProgressCallback(1 - (imagesToLoad.length / (Object.keys(data).length + imagesToLoad.length + 0.0)));

            checkFinished();
        };
        imageObj.src = imageSrc;
    }

    function checkFinished() {
        if (imagesToLoad.length === 0 && areResourcesLoaded) {
            onLoadedCallback();
        }
    }

    this.getLanguage = function () {
        return language;
    };

    this.getLanguages = function () {
        return ['de', 'fr', 'en', 'es', 'it', 'pt', 'pl', 'cz', 'ch', 'ru', 'sr'];
    };

    this.getImage = function (name) {
        return data[name];
    };
}


function Mission(type) {

    this.hasType = function (typeToCheck) {
        return type === typeToCheck;
    };

    this.getType = function () {
        return type;
    };

    this.getImageName = function () {
        return type.image;
    };
}
function MissionStack(config) {

    var missions = [];
    var discardedMissions = [];

    $.each(config, function (index, obj) {
        for (var i = 0; i < obj.count; i++) {
            missions.push(new Mission(obj.type));
        }
    });
    missions = Utils.randomizeArray(missions);    


    this.returnCard = function(card) {
        discardedMissions.push(card);
    };

    this.hasCardsLeft = function() {
        return missions.length > 0 || discardedMissions.length > 0;
    };

    this.getRandomCard = function () {
        // reshuffle when all cards were used
        if (missions.length === 0 && discardedMissions.length > 0) {
            missions = missions.concat(discardedMissions);
            missions = Utils.randomizeArray(missions);
            discardedMissions = [];
        }
        return missions.pop();
    };
}
var MissionType = {
    MISSION1: { image: '1.jpg', descKey: 'transport' },
    MISSION2: { image: '2.jpg', descKey: 'transport' },
    MISSION3: { image: '3.jpg', descKey: 'transport' },
    MISSION4: { image: '4.jpg', descKey: 'transport' },
    MISSION5: { image: '5.jpg', descKey: 'transport' },
    MISSION6: { image: '6.jpg', descKey: 'transport' },
    MISSION7: { image: '7.jpg', descKey: 'observe' },
    MISSION8: { image: '8.jpg', descKey: 'observe' },
    MISSION9: { image: '9.jpg', descKey: 'observe' },
    MISSION10: { image: '10.jpg', descKey: 'hunt' },
    MISSION11: { image: '11.jpg', descKey: 'hunt' },
    MISSION12: { image: '12.jpg', descKey: 'hunt' },
    MISSION13: { image: '13.jpg', descKey: 'transport' },
    MISSION14: { image: '14.jpg', descKey: 'transport' },
    MISSION15: { image: '15.jpg', descKey: 'transport' },
    MISSION16: { image: '16.jpg', descKey: 'transport' },
    MISSION17: { image: '17.jpg', descKey: 'transport' },
    MISSION18: { image: '18.jpg', descKey: 'transport' },
    MISSION22: { image: '22.jpg', descKey: 'disarm' },
    MISSION23: { image: '23.jpg', descKey: 'steal' },
    MISSION24: { image: '24.jpg', descKey: 'helper' },
    MISSION25: { image: '25.jpg', descKey: 'helper' },
    MISSION26: { image: '26.jpg', descKey: 'helper' },
};

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
var MonsterType = {
    ZIPFLER: { nameKey: "monster_name_zipfler", x: 3, y: 2, stats: [{ lives: 2, power: 1 }, { lives: 2, power: 2 }, { lives: 3, power: 2 }, { lives: 3, power: 3 }, { lives: 3, power: 4 }], boardImage: 'zipfler_board.jpg', cssClass: 'zipfler', tokenImage: 'zipfler.png', portraitImage: 'zipflerPortrait.jpg', color: '#FBD266' },
    ULUMUTU: { nameKey: "monster_name_ulumutu", x: 0, y: 5, stats: [{ lives: 3, power: 0 }, { lives: 3, power: 1 }, { lives: 4, power: 1 }, { lives: 4, power: 2 }, { lives: 4, power: 3 }], boardImage: 'ulumutu_board.jpg', cssClass: 'ulumutu', tokenImage: 'ulumutu.png', portraitImage: 'ulumutuPortrait.jpg', color: '#64665A' },
    WALLROG: { nameKey: "monster_name_wallrog", x: 3, y: 5, stats: [{ lives: 1, power: 2 }, { lives: 1, power: 3 }, { lives: 2, power: 3 }, { lives: 2, power: 4 }, { lives: 2, power: 5 }], boardImage: 'wallrog_board.jpg', cssClass: 'wallrog', tokenImage: 'wallrog.png', portraitImage: 'wallrogPortrait.jpg', color: '#EC7166' },
};
function Player(type) {

    var allItems, missionCards, stepsInTurn, points, lives, currentTile, neighbourTiles, berserkerBonus, powerBonus, magicBonus, teleportMode, usedTeleportThisTurn, usedCastleThisTurn, usedTraderThisTurn, isInDungeon, controlledMonster, self;
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
    magicBonus = 0;
    powerBonus = 0;
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

        // reset lives to 1!
        lives = 1;

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

        powerBonus = 0;
        magicBonus = 0;
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
        magicBonus = 0;
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
        return type.power + getBestItemLevel(ItemType.SWORD) + berserkerBonus + powerBonus;
    }

    function calculateMagic() {
        return type.magic + getBestItemLevel(ItemType.RING) + magicBonus;
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
                actionReady = currentTile.hasType(TileType.VILLAGE) && getItemCount(ItemType.APPLE) >= 2;
            } else if (card.hasType(MissionType.MISSION14)) {
                actionReady = currentTile.hasType(TileType.VILLAGE) && getItemCount(ItemType.MUSHROOM) >= 2;
            } else if (card.hasType(MissionType.MISSION15)) {
                actionReady = currentTile.hasType(TileType.VILLAGE) && getItemCount(ItemType.FISH) >= 2;
            } else if (card.hasType(MissionType.MISSION16)) {
                actionReady = getItemCount(ItemType.POTION, 1) && currentTile.hasType(TileType.GRASS);
            } else if (card.hasType(MissionType.MISSION17)) {
                actionReady = getItemCount(ItemType.POTION, 1) && currentTile.hasType(TileType.GRASS);
            } else if (card.hasType(MissionType.MISSION18)) {
                actionReady = getItemCount(ItemType.POTION, 1) && currentTile.hasType(TileType.GRASS);
            } else if (card.hasType(MissionType.MISSION23)) {
                actionReady = currentTile.hasOtherPlayerWithPoints(self);
            } else if (card.hasType(MissionType.MISSION24)) {
                actionReady = getItemCount(ItemType.APPLE) >= 1;
            } else if (card.hasType(MissionType.MISSION25)) {
                actionReady = getItemCount(ItemType.FISH) >= 1;
            } else if (card.hasType(MissionType.MISSION26)) {
                actionReady = getItemCount(ItemType.MUSHROOM) >= 1;
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

        powerBonus = 0;

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
            removeItem(ItemType.APPLE); removeItem(ItemType.APPLE);
            addItemToBackpack(new Item(ItemType.BOOT, 1));
        } else if (mission.hasType(MissionType.MISSION14)) {
            removeItem(ItemType.MUSHROOM); removeItem(ItemType.MUSHROOM);
            addItemToBackpack(new Item(ItemType.SWORD, 1));
        } else if (mission.hasType(MissionType.MISSION15)) {
            removeItem(ItemType.FISH); removeItem(ItemType.FISH);           
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
        } else if (mission.hasType(MissionType.MISSION22)) {
            addPoints(2);
        } else if (mission.hasType(MissionType.MISSION23)) {
            addPoints(1);
            currentTile.removeOtherPlayerPoint(self);
        } else if (mission.hasType(MissionType.MISSION24)) {
            removeItem(ItemType.APPLE);
            stepsInTurn += 1;
        } else if (mission.hasType(MissionType.MISSION25)) {
            removeItem(ItemType.FISH);
            magicBonus += 1;
        } else if (mission.hasType(MissionType.MISSION26)) {
            removeItem(ItemType.MUSHROOM);
            powerBonus += 2;
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
var PlayerType = {
    OLOFPAK: { nameKey: "player_name_olofpak", descriptionKey: "player_description_olofpak", lives: 5, steps: 4, power: 1, magic: 0, backpackCapacity: 3, potionCapacity: 1, color: 'red', boardImage: 'olofpak_board.jpg', cssClass: 'olofpak', tokenImage: 'olofpak.png', portraitImage: 'olofpakPortrait.jpg', color: '#E56459' },
    JUPANILLIA: { nameKey: "player_name_jupanillia", descriptionKey: "player_description_jupanillia", lives: 5, steps: 5, power: 0, magic: 0, backpackCapacity: 3, potionCapacity: 1, color: 'green', boardImage: 'jupanillia_board.jpg', cssClass: 'jupanillia', tokenImage: 'jupanillia.png', portraitImage: 'jupanilliaPortrait.jpg', color: '#9B709B' },
    GULANZOR: { nameKey: "player_name_gulanzor", descriptionKey: "player_description_gulanzor", lives: 5, steps: 4, power: 0, magic: 1, backpackCapacity: 3, potionCapacity: 1, color: 'blue', boardImage: 'gulanzor_board.jpg', cssClass: 'gulanzor', tokenImage: 'gulanzor.png', portraitImage: 'gulanzorPortrait.jpg', color: '#D19642' },
    LUPHIUS: { nameKey: "player_name_luphius", descriptionKey: "player_description_luphius", lives: 4, steps: 4, power: 0, magic: 0, backpackCapacity: 5, potionCapacity: 1, color: 'yellow', boardImage: 'luphius_board.jpg', cssClass: 'luphius', tokenImage: 'luphius.png', portraitImage: 'luphiusPortrait.jpg', color: '#837832' },
    NATHANIEL: { nameKey: "player_name_nathaniel", descriptionKey: "player_description_nathaniel", lives: 7, steps: 4, power: 0, magic: 0, backpackCapacity: 3, potionCapacity: 1, color: 'white', boardImage: 'nathaniel_board.jpg', cssClass: 'nathaniel', tokenImage: 'nathaniel.png', portraitImage: 'nathanielPortrait.jpg', color: '#AAC1DE' },
    MONSTERPLAYER: { nameKey: "player_name_monsterplayer", lives: 1, steps: 4, power: 0, magic: 0, backpackCapacity: 0, boardImage: 'monsterplayer.jpg', portraitImage: 'monsterPortrait.jpg' }
};

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
        var pos = map.getResurrectPosition();
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
function Tile(type) {
    
    this.hasType = function(typeToCheck) {
        return type === typeToCheck;
    };

    this.getType = function () {
        return type;
    };

    this.changeType = function (typeToChange) {
        type = typeToChange;
    };

    this.getImageName = function() {
        return type.image;
    };
}
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
var TileType = {
    VILLAGE: { name: "VILLAGE", image: "village.png" },
    GRASS: { name: "GRASS", image: "grass.png" },
    FOREST: { name: "FOREST", image: "forest.png" },
    CASTLE: { name: "CASTLE", image: "castle.png" },
    TRADER: { name: "TRADER", image: "trader.png" },
    SMITH: { name: "SMITH", image: "smith.png" },
    MUSHROOM: { name: "MUSHROOM", image: "resource1.png" },
    FISH: { name: "FISH", image: "resource2.png" },
    APPLE: { name: "APPLE", image: "resource3.png" },
    DUNGEON1: { name: "DUNGEON", image: "dungeon1.png" },
    DUNGEON2: { name: "DUNGEON", image: "dungeon2.png" },
    DUNGEON3: { name: "DUNGEON", image: "dungeon3.png" },
    DUNGEON4: { name: "DUNGEON", image: "dungeon4.png" },
    DUNGEON5: { name: "DUNGEON", image: "dungeon5.png" },
    DUNGEONFLOOR: { name: "DUNGEONFLOOR", image: "dungeonfloor.png" },
    DUNGEONEXIT1: { name: "DUNGEONEXIT", image: "dungeonexit1.png" },
    DUNGEONEXIT2: { name: "DUNGEONEXIT", image: "dungeonexit2.png" },
    DUNGEONEXIT3: { name: "DUNGEONEXIT", image: "dungeonexit3.png" },
    DUNGEONEXIT4: { name: "DUNGEONEXIT", image: "dungeonexit4.png" },
    DUNGEONEXIT5: { name: "DUNGEONEXIT", image: "dungeonexit5.png" },
    DUNGEONTREASURE: { name: "DUNGEONTREASURE", image: "dungeonfloor.png" },
    DUNGEONTRAP: { name: "DUNGEONTRAP", image: "dungeonfloor.png" },
};

var TutorialStep = {

    SETUP_CONTACT: { ressourceKey: 'setup_contact', isSetup: true },

    SETUP_STARTPIECE: { ressourceKey: 'setup_startpiece', isSetup: true },
    SETUP_DUNGEON: { ressourceKey: 'setup_dungeon', isSetup: true },
    SETUP_TRAPS: { ressourceKey: 'setup_traps', isSetup: true },
    SETUP_TREASURE: { ressourceKey: 'setup_treasure', isSetup: true },
    SETUP_MONSTERTOKEN: { ressourceKey: 'setup_monstertoken', isSetup: true },
    SETUP_MONSTERCARDS: { ressourceKey: 'setup_monstercards', isSetup: true },
    SETUP_MONSTERTEETH: { ressourceKey: 'setup_monsterteeth', isSetup: true },
    SETUP_MONSTERHEARTS: { ressourceKey: 'setup_monsterhearts', isSetup: true },
    SETUP_PLAYERCARDS: { ressourceKey: 'setup_playercards', isSetup: true },
    SETUP_PLAYERHEARTS: { ressourceKey: 'setup_playerhearts', isSetup: true },
    SETUP_PLAYERTOKEN: { ressourceKey: 'setup_playertoken', isSetup: true },
    SETUP_MISSIONCARDS: { ressourceKey: 'setup_missioncards', isSetup: true },
    SETUP_PLAYERPOINTS: { ressourceKey: 'setup_playerpoints', isSetup: true },
    SETUP_ACTIONPOINTS: { ressourceKey: 'setup_actionpoints', isSetup: true },

    SETUP_MISSIONBUTTON: { ressourceKey: 'setup_missionbutton', isSetup: true },
    SETUP_ALCHEMY: { ressourceKey: 'setup_alchemy', isSetup: true },
    SETUP_OTHERPLAYERS: { ressourceKey: 'setup_otherplayers' },
    SETUP_GUIDE: { ressourceKey: 'setup_guide' },

    STEP_MOVEMENT: { ressourceKey: 'step_movement', noCloseButton: true },
    STEP_NOSTEPSLEFT: { ressourceKey: 'step_nostepsleft', hasTitle: true },
    STEP_MONSTERPLAYER: { ressourceKey: 'step_monsterplayer' },
    STEP_MONSTERPLAYERTURN: { ressourceKey: 'step_monsterplayerturn' },
    STEP_MONSTERPLAYERTURN2: { ressourceKey: 'step_monsterplayerturn2' },

    STEP_NEXTPLAYER: { ressourceKey: 'step_nextplayer' },
    
    STEP_LASTTILE: { ressourceKey: 'step_lasttile', hasTitle: true },

    STEP_BOOTFOUND: { ressourceKey: 'step_bootfound', hasTitle: true },
    STEP_SWORDFOUND: { ressourceKey: 'step_swordfound', hasTitle: true },
    STEP_RINGFOUND: { ressourceKey: 'step_ringfound', hasTitle: true },

    STEP_FOODAVAILABLE: { ressourceKey: 'step_foodavailable', hasTitle: true },
    STEP_POTIONAVAILABLE: { ressourceKey: 'step_potionavailable', hasTitle: true },
    STEP_MISSIONAVAILABLE: { ressourceKey: 'step_missionavailable', hasTitle: true },
    STEP_INVENTORYFULL: { ressourceKey: 'step_inventoryfull', hasTitle: true },
    
    STEP_POTIONCREATED: { ressourceKey: 'step_potioncreated', hasTitle: true },

    STEP_NOTRAP: { ressourceKey: 'step_notrap', hasTitle: true },
    
    STEP_LOSTLIFESDEF: { ressourceKey: 'step_lostlifesdef', inFront: true },
    STEP_LOSTLIFESATT: { ressourceKey: 'step_lostlifesatt', inFront: true },
    STEP_FEWLIFES: { ressourceKey: 'step_fewlifes', inFront: true },
    
    STEP_PVP: { ressourceKey: 'step_pvp' },
    STEP_ALLPVP: { ressourceKey: 'step_allpvp' },
   
    STEP_MONSTERKILLED: { ressourceKey: 'step_monsterkilled' },
    
    STEP_BERSERKER: { ressourceKey: 'step_berserker' },
    STEP_TELEPORT: { ressourceKey: 'step_teleport' },
    
    STEP_FIRSTTEETHCOLLECTED: { ressourceKey: 'step_firstteethcollected', hasTitle: true },
    STEP_TEETHCOLLECTED: { ressourceKey: 'step_teethcollected', hasTitle: true },

    STEP_LASTHEROLEAVESDUNGEON: { ressourceKey: 'step_lastheroleavesdungeon' },

    FIELD_DUNGEON: { ressourceKey: 'fields_dungeon', hasTitle: true },
    FIELD_DUNGEONEXIT: { ressourceKey: 'fields_dungeonexit', hasTitle: true },

    FIELDS: {}
};

TutorialStep.FIELDS[TileType.GRASS.name] = { ressourceKey: 'fields_grass', hasTitle: true };
TutorialStep.FIELDS[TileType.CASTLE.name] = { ressourceKey: 'fields_castle', hasTitle: true };
TutorialStep.FIELDS[TileType.TRADER.name] = { ressourceKey: 'fields_trader', hasTitle: true };
TutorialStep.FIELDS[TileType.SMITH.name] = { ressourceKey: 'fields_smith', hasTitle: true };
TutorialStep.FIELDS[TileType.APPLE.name] = { ressourceKey: 'fields_apple', hasTitle: true };
TutorialStep.FIELDS[TileType.MUSHROOM.name] = { ressourceKey: 'fields_mushroom', hasTitle: true };
TutorialStep.FIELDS[TileType.FISH.name] = { ressourceKey: 'fields_fish', hasTitle: true };

TutorialStep.FIELDS[TileType.DUNGEON1.name] = TutorialStep.FIELD_DUNGEON;
TutorialStep.FIELDS[TileType.DUNGEONEXIT1.name] = TutorialStep.FIELD_DUNGEONEXIT;
TutorialStep.FIELDS[TileType.DUNGEON2.name] = TutorialStep.FIELD_DUNGEON;
TutorialStep.FIELDS[TileType.DUNGEONEXIT2.name] = TutorialStep.FIELD_DUNGEONEXIT;
TutorialStep.FIELDS[TileType.DUNGEON3.name] = TutorialStep.FIELD_DUNGEON;
TutorialStep.FIELDS[TileType.DUNGEONEXIT3.name] = TutorialStep.FIELD_DUNGEONEXIT;
TutorialStep.FIELDS[TileType.DUNGEON4.name] = TutorialStep.FIELD_DUNGEON;
TutorialStep.FIELDS[TileType.DUNGEONEXIT4.name] = TutorialStep.FIELD_DUNGEONEXIT;
TutorialStep.FIELDS[TileType.DUNGEON5.name] = TutorialStep.FIELD_DUNGEON;
TutorialStep.FIELDS[TileType.DUNGEONEXIT5.name] = TutorialStep.FIELD_DUNGEONEXIT;


var Utils = {
    randomizeArray: function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },
    setDefaultCursor: function() {
        document.body.style.cursor = 'default';
    },
    setWalkCursor: function() {
        document.body.style.cursor = 'pointer';
    },
    setActionCursor: function () {
        document.body.style.cursor = 'pointer';
    },
    setTeleportCursor: function () {
        document.body.style.cursor = 'crosshair';
    },
    setAttackCursor: function () {
        document.body.style.cursor = 'pointer'; //"url('../img/sword.cur'), auto";
    },
    setMonsterSelectCursor: function () {
        document.body.style.cursor = 'pointer';
    },
    getRandomNumber: function(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    },
    getDateDiffInMinutes: function(later, earlier) {
        var diff = Math.abs(later - earlier);
        return Math.floor((diff / 1000) / 60);
    },
    runDice: function (selector, targetValue, onFinished) {
        var interval = setInterval( function(){ var d = new Date(); setValue(d.getTime() % 6 + 1, true); }, 50);	
			
        $(selector).on("click", function() {				
            $(selector).off('click');				
            clearInterval(interval);
            setValue(targetValue, false);
            onFinished();
        });		
				
        function setValue(value, running) {
            $(selector).removeClass("dice1 dice2 dice3 dice4 dice5 dice6");
            $(selector).addClass("dice" + value);
            if (running) {
                $(selector).addClass("running");
            } else {
                $(selector).removeClass("running");
            }
        }
    },
    getParameterByName: function (name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
};
var game, loader;

(function () {

    loader = new Loader();
    var screenToSmall = $(window).width() < 980 || $(window).height() < 540;
    var featuresNotSupported = !Modernizr.canvas || !Modernizr.opacity || $("html").hasClass("lt-ie10");
    var notPlayable = screenToSmall || featuresNotSupported;

    var language = Utils.getParameterByName("lang") || "de";

    loader.init(language, notPlayable, function () {

        if (notPlayable) {
            if (featuresNotSupported) {
                $("#errorScreen .line1").html(loading_error_wrongbrowser_line1);
                $("#errorScreen .line2").html(loading_error_wrongbrowser_line2);
            } else if (screenToSmall) {
                $("#errorScreen .line1").html(loading_error_tosmallscreen_line1);
                $("#errorScreen .line2").html(loading_error_tosmallscreen_line2);
            }
            $("#loading").hide();
            $("#errorScreen").show();       
        } else {
            $("#loading").hide();
            $("#container").show();
            game = new Game();
            game.init();
        }
    }, function (progress) {
        var loadingStatus = $("#loadingStatus");        
        loadingStatus.width(900 * (1 - progress));
    });
})();