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

