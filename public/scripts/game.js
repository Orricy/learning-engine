define(['event_bus', 'modules/events_list'], function(eventBus) {

    var game = {};

    game.init = function(question) {
        $('body').append($('<h1>' + question + '</h1>'));
        var container = $('<div id="game_container"></div>');
        $('body').append(container);
        eventBus.emit('init', container);
    };

    return game;

});
