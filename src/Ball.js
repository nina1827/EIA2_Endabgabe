"use strict";
var EIA2;
(function (EIA2) {
    class Ball extends EIA2.BaseObject {
        draw(_crc2) {
            _crc2.beginPath();
            _crc2.fillStyle = "white";
            _crc2.strokeStyle = "black";
            _crc2.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
            _crc2.fill();
            _crc2.stroke();
        }
        isOut() {
            let config = EIA2.Config.getInstance();
            return this.position.x > EIA2.Helper.canvasWidth() - config.margin
                || this.position.x < config.margin
                || this.position.y < config.margin
                || this.position.y > EIA2.Helper.canvasHeight() - config.margin;
        }
        isGoal() {
            return this.isOut() && this.position.y >= EIA2.Helper.canvasHeight() / 3 && this.position.y <= 2 * EIA2.Helper.canvasHeight() / 3;
        }
        move(_dt) {
            if (this.isGoal()) {
                var customEvent = new CustomEvent("ballGoal");
                window.dispatchEvent(customEvent);
            }
            else if (this.isOut()) {
                var customEvent = new CustomEvent("ballOut");
                window.dispatchEvent(customEvent);
            }
            super.move(_dt);
        }
    }
    EIA2.Ball = Ball;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Ball.js.map