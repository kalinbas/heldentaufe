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