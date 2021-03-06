require(['connector'], function(socket) {

    $(function() {

        socket.emit("ask gamesInfos");

        socket.on('inject css', function(data) {
            $("head").append("<link rel='stylesheet' type='text/css' href='" + data + "'>");
        });

        socket.on('inject template', function(data) {
            $("#modelParams").empty();
            $("#modelParams").append(data);
        });

        socket.on("send gamesInfos", function(infos) {

            for (var i = 0; i < infos.games.names.length; i++) {
                var $game = $(document.createElement('option'));
                $game.attr("id", infos.games.names[i]);
                $game.html(infos.games.names[i]);
                $game.data("description", infos.games.descriptions[i]);
                $game.data("fileName", infos.games.fileNames[i]);
                $("#gameList").append($game);
            }

            for (var j = 0; j < infos.models.names.length; j++) {
                var $model = $(document.createElement('option'));
                $model.attr("id", infos.models.names[j]);
                $model.html(infos.models.names[j]);
                $model.data("description", infos.models.descriptions[j]);
                $model.data("fileName", infos.models.fileNames[j]);
                $("#modelList").append($model);
            }

            $("#gameDescription").html(infos.games.descriptions[0]);
            $("#modelDescription").html(infos.models.descriptions[0]);
            socket.emit("ask template", infos.models.fileNames[0]);

            $("#gameList").change(function(e) {
                var description = $("#gameList option:selected").data("description");
                $("#gameDescription").html(description);
            });

            $("#modelList").change(function(e) {
                var description = $("#modelList option:selected").data("description");
                $("#modelDescription").html(description);

                socket.emit("ask template", $("#modelList option:selected").data("fileName"));
            });

            /* User name verification */
            $("#user button").click(function(e) {
                var myRegex = /\W/; // Match every non character
                var userName = $("#userName").val();

                if (userName.match(myRegex) === null) {
                    $(this).parent().css('display', 'none');
                    $("#mainMenu").fadeIn('normal');

                    var socket = io.connect();
                    socket.emit('nouveau_client', userName); // Create the server side tabs with users data 
                } else {
                    $("#userAlert").html("Ce champ n'accepte des chiffres et des lettres sans espace!");
                }
            });

            $("#gameSelect button").click(function(e) {
                $("#mainMenu").hide();

                var gameSelectedName = $("#gameList option:selected").data("fileName");
                var gameSelectedPath = "games/" + gameSelectedName;

                socket.emit('ask css', gameSelectedName);


                require(['game', gameSelectedPath], function(game) {
                    game.init();
                });
            });

            $("#gameCreation").submit(function(e) {
                e.preventDefault();

                $("#mainMenu").hide();

                var modelSelectedName = $("#modelList option:selected").data("fileName");
                var modelSelectedPath = "game_types/" + modelSelectedName;

                socket.emit('ask css', modelSelectedName);
                socket.on('inject css', function(data) {
                    $("head").append("<link rel='stylesheet' type='text/css' href='" + data + "'>");
                });

                var question = $("#question")[0].value;
                var params = {
                    bonusUrl: $("#bonusImg option:selected")[0].value,
                    malusUrl: $("#malusImg option:selected")[0].value
                };

                require(['game', modelSelectedPath], function(game, setGame) {
                    setGame(params);
                    game.init(question);
                });
            });

        });

    });

});
