namespace EIA2 {
    window.addEventListener("load", init);

    let crc2: CanvasRenderingContext2D;
    let objects: BaseObject[] = [];
    let scoreDisplay: TextDisplay;
    let statsDisplay: TextDisplay;
    let teamWithBall: number;
    let playerWithBall: Player;
    let selectedPlayer: Player;
    let team0Score: number = 0;
    let team1Score: number = 0;
    let pauseLoop: boolean = false;
    let ballIsOut: boolean = false;
    let ballIsGoal: boolean = false;
    let precisionInput: HTMLInputElement;
    let speedFactorInput: HTMLInputElement
    let team0Input: HTMLInputElement
    let team1Input: HTMLInputElement
    let team0ColorInput: HTMLInputElement
    let team1ColorInput: HTMLInputElement

    /**
     * Spielfeld und Eingabefelder initialisieren
     */
    function init(_event: Event): void {
        let canvas: HTMLCanvasElement = Helper.canvas();
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        precisionInput = <HTMLInputElement>document.getElementById("precision");
        speedFactorInput = <HTMLInputElement>document.getElementById("speedFactor");
        team0Input = <HTMLInputElement>document.getElementById("team0");
        team1Input = <HTMLInputElement>document.getElementById("team1");
        team0ColorInput = <HTMLInputElement>document.getElementById("team0Color");
        team1ColorInput = <HTMLInputElement>document.getElementById("team1Color");

        var bg = new Background();
        objects.push(bg);

        let config: Config = Config.getInstance();
        for (var i: number = 0; i < config.playerCount; i++){
            createPlayer(1,  i + 1);
            createPlayer(2, i + 1);
        }

        let width: number = Helper.canvasWidth();
        let height: number = Helper.canvasHeight();
        let referee: Referee = new Referee();
        referee.speed = 75;
        objects.push(referee);

        let upperLineJudge: LineJudge = new LineJudge();
        upperLineJudge.speed = 89;
        upperLineJudge.position.x = width / 2;
        upperLineJudge.position.y = 10;
        objects.push(upperLineJudge);

        let lowerLineJudge: LineJudge = new LineJudge();
        lowerLineJudge.speed = 95;
        lowerLineJudge.position.x = width / 2;
        upperLineJudge.position.y = height;
        objects.push(lowerLineJudge);

        var ball: Ball = new Ball();
        ball.position = new Vector2D(width / 2, height / 2);
        ball.speed = config.ballStartSpeed;
        ball.friction = config.ballFriction;
        ball.velocity = Vector2D.random();
        Helper.ball = ball;
        objects.push(ball);

        scoreDisplay = new TextDisplay();
        scoreDisplay.position = new Vector2D(config.margin, 15);
        objects.push(scoreDisplay);

        statsDisplay = new TextDisplay();
        statsDisplay.position = new Vector2D(config.margin, height - 5);
        statsDisplay.text = "Kein Spieler ausgewaehlt";
        objects.push(statsDisplay);

        // Event das abgearbeitet wird, wenn ein Spieler Ballkontakt hat
        window.addEventListener('newBallContact', (_e: Event) => {
            if (_e instanceof CustomEvent){
                playerWithBall = _e.detail;
                teamWithBall = playerWithBall.team;
                updateScoreDisplay();
                pauseLoop = true;
            }
        });

        // Event, wenn ein Ball ins Tor geht
        window.addEventListener('ballGoal', (_e: Event) => {
            if (Helper.ball.position.x > Helper.canvasWidth() / 2){
                team0Score += 1;
            }else {
                team1Score += 1;
            }

            updateScoreDisplay();
            ballIsGoal = true;
            pauseLoop = true;
        });

        window.addEventListener('ballOut', (_e: Event) => {
            if (_e instanceof CustomEvent){
                ballIsOut = true;
                pauseLoop = true;
            }
        });

        document.getElementById("saveSettingsButton")?.addEventListener('click', (_e: Event) => {
            config.team0 = team0Input.value;
            config.team1 = team1Input.value;
            config.team0Color = team0ColorInput.value;
            config.team1Color = team1ColorInput.value;
            updateScoreDisplay();
            console.log("settings saved");
        });

        document.getElementById("savePlayerButton")?.addEventListener('click', (_e: Event) => {
            if (selectedPlayer != null){
                selectedPlayer.precision = precisionInput.valueAsNumber;
                selectedPlayer.speedFactor = speedFactorInput.valueAsNumber;
                console.log("player " + selectedPlayer.number + " saved");
            }
        });

        document.getElementById("restartButton")?.addEventListener('click', (_e: Event) => {
            Helper.ball.position = new Vector2D(width / 2, height / 2);
            ball.velocity = Vector2D.random();
            playerWithBall = new Player();
            ballIsOut = false;
            pauseLoop = false; 
            selectedPlayer = new Player();
            teamWithBall = 0;
        });

        document.getElementById("newGameButton")?.addEventListener('click', (_e: Event) => {
            Helper.ball.position = new Vector2D(width / 2, height / 2);
            ball.velocity = Vector2D.random();
            playerWithBall = new Player();
            ballIsOut = false;
            pauseLoop = false; 
            selectedPlayer = new Player();
            teamWithBall = 0;
            team0Score = 0;
            team1Score = 0;
            updateScoreDisplay();
        });

        document.getElementById("removePlayerButton")?.addEventListener('click', (_e: Event) => {
            if (selectedPlayer != null) {
                let index: number = objects.indexOf(selectedPlayer);
                if (index > -1) {
                    objects.splice(index, 1);
                }
                selectedPlayer = new Player(); // warum kann man hier kein Null setzen?
            }
        });

        document.getElementById("addPlayerTeam0Button")?.addEventListener('click', (_e: Event) => {
            createPlayer(1, Math.ceil(12 + Math.random() * 10));
        });

        document.getElementById("addPlayerTeam1Button")?.addEventListener('click', (_e: Event) => {
            createPlayer(2, 12 + Math.random() * 10);
        });

        Helper.canvas().addEventListener('click', (_e: Event) => {
            let stop: boolean = false;
            objects.forEach(element => {
                if (element instanceof Player){
                    let player: Player = <Player>element;
                    if (player.isClickInRange(<MouseEvent>_e)) {
                        console.log("Player " + player.number + " clicked");
                        if (!player.isSelected){
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

            if (stop){
                return;
            }

            if (ballIsOut || ballIsGoal){
                Helper.ball.position = new Vector2D(width / 2, height / 2);
                ball.velocity = Vector2D.random();
                playerWithBall = new Player();
                ballIsOut = false;
                ballIsGoal = false;
                pauseLoop = false; 

                objects.forEach(element => {
                    if (element instanceof Player){
                        let player: Player = <Player>element;
                        player.hasBallContact = false;
                    }
                });
                return;
            }

            if (pauseLoop && playerWithBall != null) {
                let mouseEvent: MouseEvent = <MouseEvent>_e;
                let direction:Vector2D = Vector2D.direction(playerWithBall.position, Vector2D.fromMouseEvent(mouseEvent) ).normalize();
                
                let variance: number = 1 - playerWithBall.precision;
                direction = new Vector2D(direction.x + (variance * (Math.random() - 0.5)), direction.y + (variance * (Math.random() - 0.5)) );

                console.log("kick ball in direction " + direction);
                Helper.ball.velocity = direction;
                Helper.ball.speed = config.ballKickSpeed;
                pauseLoop = false;

                objects.forEach(element => {
                    if (element instanceof Player){
                        let player: Player = <Player>element;
                        if (player != playerWithBall){
                            player.hasBallContact = false;
                        }
                    }
                });
            }
        });

        updateScoreDisplay();
        loop();
    }

    function updateScoreDisplay(): void {
        let config: Config = Config.getInstance();
        let teamName: string = "";
        if (teamWithBall == 1){
            teamName = config.team0;
        }else if (teamWithBall == 2) {
            teamName = config.team1;
        }
        scoreDisplay.text = "Ballbesitz: " + teamName + "   Tore " + config.team0 + ": " + team0Score + " " + config.team1 + ": " + team1Score;
    }

    function updateStatsDisplay(_player: Player): void {
        if (_player != null) {
            var config: Config = Config.getInstance();
            let team: string = "";
            if (_player.team == 1){
                team = config.team0;
            }else if (_player.team == 2){
                team = config.team1;
            }
            statsDisplay.text = "Spieler " + _player.number + " (" + team + ") Praezision: " + _player.precision.toFixed(2) + " Geschwindigkeit: " + _player.speedFactor.toFixed(2);
            precisionInput.value = _player.precision.toFixed(2);
            speedFactorInput.value = _player.speedFactor.toFixed(2);
        } else {
            statsDisplay.text = "";
            precisionInput.value = "";
            speedFactorInput.value = "";
        }
    }

    function createPlayer(_team: number, _number: number){
        let config: Config = Config.getInstance();
        let width: number = Helper.canvasWidth();
        let height: number = Helper.canvasHeight();

        let player: Player = new Player();
        player.speed = 100;
        player.number = _number;
        player.team = _team;
        player.actionRadius = config.actionRadius;
        player.precision = Math.random();
        player.speedFactor = Math.random() + 0.5;

        let minDistanceFulfilled: boolean = false;
        while(!minDistanceFulfilled) {
            minDistanceFulfilled = true;
            player.position.x = Math.random() * (width - config.margin * 4) + config.margin * 2;
            player.position.y = Math.random() * (height - config.margin * 4) + config.margin * 2;

            objects.forEach(element => {
                if (element instanceof Player) {
                    if (Vector2D.distance(player.position, element.position) < config.minDistance) {
                        minDistanceFulfilled = false;
                    }
                }
            });
        }

        player.startPosition = player.position.copy();

        objects.push(player);
    }

    function loop(): void {
        setTimeout(() => {
            crc2.clearRect(0, 0, Helper.canvasWidth(), Helper.canvasHeight());
            if (!pauseLoop) {
                objects.forEach((object: BaseObject) => {
                    object.move(Helper.msBetweenFrames);
                });
            }

            objects.forEach((object: BaseObject) => {
                object.draw(crc2);
            });

            loop();
        }, Helper.msBetweenFrames);
    }
} 