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