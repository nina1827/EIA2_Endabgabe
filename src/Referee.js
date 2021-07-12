"use strict";
var EIA2;
(function (EIA2) {
    class Referee extends EIA2.BaseObject {
        draw(_crc2) {
            _crc2.beginPath();
            _crc2.fillStyle = "black";
            _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _crc2.fill();
        }
        move(_dt) {
            if (EIA2.Vector2D.distance(EIA2.Helper.ball.position, this.position) > 50) {
                this.velocity = EIA2.Vector2D.direction(this.position, EIA2.Helper.ball.position).normalize();
            }
            else {
                this.velocity = EIA2.Vector2D.zero();
            }
            super.move(_dt);
        }
    }
    EIA2.Referee = Referee;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Referee.js.map