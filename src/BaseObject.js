"use strict";
var EIA2;
(function (EIA2) {
    class BaseObject {
        constructor() {
            this.friction = 1;
            this.velocity = EIA2.Vector2D.zero();
            this.position = EIA2.Vector2D.zero();
        }
        attach() {
            var customEvent = new CustomEvent("attachObject", { detail: this });
            window.dispatchEvent(customEvent);
        }
        destory() {
            var customEvent = new CustomEvent("destroyObject", { detail: this });
            window.dispatchEvent(customEvent);
        }
        move(_dt) {
            if (this.velocity.x != 0) {
                this.position.x = this.position.x + (this.velocity.x * this.speed * _dt / 1000);
            }
            if (this.velocity.y != 0) {
                this.position.y = this.position.y + (this.velocity.y * this.speed * _dt / 1000);
            }
            this.speed *= this.friction;
            if (this.speed <= 0.05) {
                this.speed = 0;
            }
        }
    }
    EIA2.BaseObject = BaseObject;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=BaseObject.js.map