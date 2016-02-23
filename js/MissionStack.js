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