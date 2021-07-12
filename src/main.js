"use strict";
var EIA2;
(function (EIA2) {
    window.addEventListener("load", init);
    let crc2;
    let objects = [];
    let scoreDisplay;
    let statsDisplay;
    let teamWithBall;
    let playerWithBall;
    let selectedPlayer;
    let team0Score = 0;
    let team1Score = 0;
    let pauseLoop = false;
    let ballIsOut = false;
    let ballIsGoal = false;
    let precisionInput;
    let speedFactorInput;
    let team0Input;
    let team1Input;
    let team0ColorInput;
    let team1ColorInput;
    /**
     * Spielfeld und Eingabefelder initialisieren
     */
    function init(_event) {
        var _a, _b, _c, _d, _f, _g, _h;
        let canvas = EIA2.Helper.canvas();
        crc2 = canvas.getContext("2d");
        precisionInput = document.getElementById("precision");
        speedFactorInput = document.getElementById("speedFactor");
        team0Input = document.getElementById("team0");
        team1Input = document.getElementById("team1");
        team0ColorInput = document.getElementById("team0Color");
        team1ColorInput = document.getElementById("team1Color");
        var bg = new EIA2.Background();
        objects.push(bg);
        let config = EIA2.Config.getInstance();
        for (var i = 0; i < config.playerCount; i++) {
            createPlayer(1, i + 1);
            createPlayer(2, i + 1);
        }
        let width = EIA2.Helper.canvasWidth();
        let height = EIA2.Helper.canvasHeight();
        let referee = new EIA2.Referee();
        referee.speed = 75;
        objects.push(referee);
        let upperLineJudge = new EIA2.LineJudge();
        upperLineJudge.speed = 89;
        upperLineJudge.position.x = width / 2;
        upperLineJudge.position.y = 10;
        objects.push(upperLineJudge);
        let lowerLineJudge = new EIA2.LineJudge();
        lowerLineJudge.speed = 95;
        lowerLineJudge.position.x = width / 2;
        upperLineJudge.position.y = height;
        objects.push(lowerLineJudge);
        var ball = new EIA2.Ball();
        ball.position = new EIA2.Vector2D(width / 2, height / 2);
        ball.speed = config.ballStartSpeed;
        ball.friction = config.ballFriction;
        ball.velocity = EIA2.Vector2D.random();
        EIA2.Helper.ball = ball;
        objects.push(ball);
        scoreDisplay = new EIA2.TextDisplay();
        scoreDisplay.position = new EIA2.Vector2D(config.margin, 15);
        objects.push(scoreDisplay);
        statsDisplay = new EIA2.TextDisplay();
        statsDisplay.position = new EIA2.Vector2D(config.margin, height - 5);
        statsDisplay.text = "Kein Spieler ausgewaehlt";
        objects.push(statsDisplay);
        // Event das abgearbeitet wird, wenn ein Spieler Ballkontakt hat
        window.addEventListener('newBallContact', (_e) => {
            if (_e instanceof CustomEvent) {
                playerWithBall = _e.detail;
                teamWithBall = playerWithBall.team;
                updateScoreDisplay();
                pauseLoop = true;
            }
        });
        // Event, wenn ein Ball ins Tor geht
        window.addEventListener('ballGoal', (_e) => {
            if (EIA2.Helper.ball.position.x > EIA2.Helper.canvasWidth() / 2) {
                team0Score += 1;
            }
            else {
                team1Score += 1;
            }
            updateScoreDisplay();
            ballIsGoal = true;
            pauseLoop = true;
        });
        window.addEventListener('ballOut', (_e) => {
            if (_e instanceof CustomEvent) {
                ballIsOut = true;
                pauseLoop = true;
            }
        });
        (_a = document.getElementById("saveSettingsButton")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (_e) => {
            config.team0 = team0Input.value;
            config.team1 = team1Input.value;
            config.team0Color = team0ColorInput.value;
            config.team1Color = team1ColorInput.value;
            updateScoreDisplay();
            console.log("settings saved");
        });
        (_b = document.getElementById("savePlayerButton")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (_e) => {
            if (selectedPlayer != null) {
                selectedPlayer.precision = precisionInput.valueAsNumber;
                selectedPlayer.speedFactor = speedFactorInput.valueAsNumber;
                console.log("player " + selectedPlayer.number + " saved");
            }
        });
        (_c = document.getElementById("restartButton")) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (_e) => {
            EIA2.Helper.ball.position = new EIA2.Vector2D(width / 2, height / 2);
            ball.velocity = EIA2.Vector2D.random();
            playerWithBall = new EIA2.Player();
            ballIsOut = false;
            pauseLoop = false;
            selectedPlayer = new EIA2.Player();
            teamWithBall = 0;
        });
        (_d = document.getElementById("newGameButton")) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (_e) => {
            EIA2.Helper.ball.position = new EIA2.Vector2D(width / 2, height / 2);
            ball.velocity = EIA2.Vector2D.random();
            playerWithBall = new EIA2.Player();
            ballIsOut = false;
            pauseLoop = false;
            selectedPlayer = new EIA2.Player();
            teamWithBall = 0;
            team0Score = 0;
            team1Score = 0;
            updateScoreDisplay();
        });
        (_f = document.getElementById("removePlayerButton")) === null || _f === void 0 ? void 0 : _f.addEventListener('click', (_e) => {
            if (selectedPlayer != null) {
                let index = objects.indexOf(selectedPlayer);
                if (index > -1) {
                    objects.splice(index, 1);
                }
                selectedPlayer = new EIA2.Player(); // warum kann man hier kein Null setzen?
            }
        });
        (_g = document.getElementById("addPlayerTeam0Button")) === null || _g === void 0 ? void 0 : _g.addEventListener('click', (_e) => {
            createPlayer(1, Math.ceil(12 + Math.random() * 10));
        });
        (_h = document.getElementById("addPlayerTeam1Button")) === null || _h === void 0 ? void 0 : _h.addEventListener('click', (_e) => {
            createPlayer(2, 12 + Math.random() * 10);
        });
        EIA2.Helper.canvas().addEventListener('click', (_e) => {
            let stop = false;
            objects.forEach(element => {
                if (element instanceof EIA2.Player) {
                    let player = element;
                    if (player.isClickInRange(_e)) {
                        console.log("Player " + player.number + " clicked");
                        if (!player.isSelected) {
                            stop = true;
                        }
                        player.isSelected = true;
                        selectedPlayer = player;
                        updateStatsDisplay(player);
                        return;
                    }
                    player.isSelected = false;
                }
            });
            if (stop) {
                return;
            }
            if (ballIsOut || ballIsGoal) {
                EIA2.Helper.ball.position = new EIA2.Vector2D(width / 2, height / 2);
                ball.velocity = EIA2.Vector2D.random();
                playerWithBall = new EIA2.Player();
                ballIsOut = false;
                ballIsGoal = false;
                pauseLoop = false;
                objects.forEach(element => {
                    if (element instanceof EIA2.Player) {
                        let player = element;
                        player.hasBallContact = false;
                    }
                });
                return;
            }
            if (pauseLoop && playerWithBall != null) {
                let mouseEvent = _e;
                let direction = EIA2.Vector2D.direction(playerWithBall.position, EIA2.Vector2D.fromMouseEvent(mouseEvent)).normalize();
                let variance = 1 - playerWithBall.precision;
                direction = new EIA2.Vector2D(direction.x + (variance * (Math.random() - 0.5)), direction.y + (variance * (Math.random() - 0.5)));
                console.log("kick ball in direction " + direction);
                EIA2.Helper.ball.velocity = direction;
                EIA2.Helper.ball.speed = config.ballKickSpeed;
                pauseLoop = false;
                objects.forEach(element => {
                    if (element instanceof EIA2.Player) {
                        let player = element;
                        if (player != playerWithBall) {
                            player.hasBallContact = false;
                        }
                    }
                });
            }
        });
        updateScoreDisplay();
        loop();
    }
    function updateScoreDisplay() {
        let config = EIA2.Config.getInstance();
        let teamName = "";
        if (teamWithBall == 1) {
            teamName = config.team0;
        }
        else if (teamWithBall == 2) {
            teamName = config.team1;
        }
        scoreDisplay.text = "Ballbesitz: " + teamName + "   Tore " + config.team0 + ": " + team0Score + " " + config.team1 + ": " + team1Score;
    }
    function updateStatsDisplay(_player) {
        if (_player != null) {
            var config = EIA2.Config.getInstance();
            let team = "";
            if (_player.team == 1) {
                team = config.team0;
            }
            else if (_player.team == 2) {
                team = config.team1;
            }
            statsDisplay.text = "Spieler " + _player.number + " (" + team + ") Praezision: " + _player.precision.toFixed(2) + " Geschwindigkeit: " + _player.speedFactor.toFixed(2);
            precisionInput.value = _player.precision.toFixed(2);
            speedFactorInput.value = _player.speedFactor.toFixed(2);
        }
        else {
            statsDisplay.text = "";
            precisionInput.value = "";
            speedFactorInput.value = "";
        }
    }
    function createPlayer(_team, _number) {
        let config = EIA2.Config.getInstance();
        let width = EIA2.Helper.canvasWidth();
        let height = EIA2.Helper.canvasHeight();
        let player = new EIA2.Player();
        player.speed = 100;
        player.number = _number;
        player.team = _team;
        player.actionRadius = config.actionRadius;
        player.precision = Math.random();
        player.speedFactor = Math.random() + 0.5;
        let minDistanceFulfilled = false;
        while (!minDistanceFulfilled) {
            minDistanceFulfilled = true;
            player.position.x = Math.random() * (width - config.margin * 4) + config.margin * 2;
            player.position.y = Math.random() * (height - config.margin * 4) + config.margin * 2;
            objects.forEach(element => {
                if (element instanceof EIA2.Player) {
                    if (EIA2.Vector2D.distance(player.position, element.position) < config.minDistance) {
                        minDistanceFulfilled = false;
                    }
                }
            });
        }
        player.startPosition = player.position.copy();
        objects.push(player);
    }
    function loop() {
        setTimeout(() => {
            crc2.clearRect(0, 0, EIA2.Helper.canvasWidth(), EIA2.Helper.canvasHeight());
            if (!pauseLoop) {
                objects.forEach((object) => {
                    object.move(EIA2.Helper.msBetweenFrames);
                });
            }
            objects.forEach((object) => {
                object.draw(crc2);
            });
            loop();
        }, EIA2.Helper.msBetweenFrames);
    }
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=main.js.map