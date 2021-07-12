"use strict";
var EIA2;
(function (EIA2) {
    class Player extends EIA2.BaseObject {
        isBallInActionRadius() {
            return EIA2.Helper.ball != null && EIA2.Vector2D.distance(EIA2.Helper.ball.position, this.startPosition) < this.actionRadius;
        }
        getColor() {
            var config = EIA2.Config.getInstance();
            if (this.team == 1) {
                return config.team0Color;
            }
            return config.team1Color;
        }
        draw(_crc2) {
            if (this.isBallInActionRadius()) {
                _crc2.setLineDash([5, 10]);
                _crc2.beginPath();
                _crc2.strokeStyle = "lightgray";
                _crc2.lineWidth = 2;
                _crc2.arc(this.startPosition.x, this.startPosition.y, this.actionRadius, 0, 2 * Math.PI, false);
                _crc2.stroke();
                _crc2.beginPath();
                _crc2.setLineDash([2, 2]);
                _crc2.strokeStyle = "white";
                _crc2.lineWidth = 2;
                _crc2.moveTo(this.position.x, this.position.y);
                _crc2.lineTo(EIA2.Helper.ball.position.x, EIA2.Helper.ball.position.y);
                _crc2.stroke();
            }
            _crc2.setLineDash([]);
            _crc2.beginPath();
            _crc2.fillStyle = this.getColor();
            _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _crc2.fill();
            if (this.isSelected) {
                _crc2.beginPath();
                _crc2.strokeStyle = "white";
                _crc2.lineWidth = 2;
                _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
                _crc2.stroke();
            }
            _crc2.strokeStyle = "white";
            _crc2.lineWidth = 1;
            _crc2.strokeText("" + this.number, this.position.x - 3, this.position.y + 2);
        }
        move(_dt) {
            if (this.isBallInActionRadius() && !this.hasBallContact) {
                if (EIA2.Vector2D.distance(EIA2.Helper.ball.position, this.position) > 5) {
                    this.velocity = EIA2.Vector2D.direction(this.position, EIA2.Helper.ball.position).normalize();
                }
                else {
                    this.velocity = EIA2.Vector2D.zero();
                    if (!this.hasBallContact) {
                        var customEvent = new CustomEvent("newBallContact", { detail: this });
                        window.dispatchEvent(customEvent);
                        this.hasBallContact = true;
                        console.log("player " + this.number + " has new ball contact");
                    }
                }
            }
            else if (EIA2.Vector2D.distance(this.startPosition, this.position) > 5) {
                this.velocity = EIA2.Vector2D.direction(this.position, this.startPosition).normalize();
            }
            else {
                this.velocity = EIA2.Vector2D.zero();
            }
            super.move(_dt);
        }
        isClickInRange(_mouseEvent) {
            return EIA2.Vector2D.distance(this.position, EIA2.Vector2D.fromMouseEvent(_mouseEvent)) <= 20;
        }
    }
    EIA2.Player = Player;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Player.js.map