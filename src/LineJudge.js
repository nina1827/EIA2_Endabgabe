"use strict";
var EIA2;
(function (EIA2) {
    class LineJudge extends EIA2.BaseObject {
        draw(_crc2) {
            _crc2.beginPath();
            _crc2.fillStyle = "yellow";
            _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _crc2.fill();
        }
        move(_dt) {
            if (EIA2.Helper.ball != null) {
                if (Math.abs(EIA2.Helper.ball.position.x - this.position.x) < 2) {
                    this.velocity = EIA2.Vector2D.zero();
                }
                else if (EIA2.Helper.ball.position.x > this.position.x) {
                    this.velocity = EIA2.Vector2D.right();
                }
                else if (EIA2.Helper.ball.position.x < this.position.x) {
                    this.velocity = EIA2.Vector2D.left();
                }
                else {
                    this.velocity = EIA2.Vector2D.zero();
                }
            }
            else {
                this.velocity = EIA2.Vector2D.zero();
            }
            super.move(_dt);
        }
    }
    EIA2.LineJudge = LineJudge;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=LineJudge.js.map