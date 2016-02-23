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