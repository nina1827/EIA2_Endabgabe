"use strict";
var EIA2;
(function (EIA2) {
    class Vector2D {
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        copy() {
            return new Vector2D(this.x, this.y);
        }
        /**
         * Vektor Addition
         */
        add(_v) {
            return new Vector2D(this.x + _v.x, this.y + _v.y);
        }
        /**
         * Richtungsvektor aus 2 Vektoren erzeugen. Die 2 Vektoren stellen eigentlich Punkte dar. v = v2 - v1
         */
        static direction(_v1, _v2) {
            return new Vector2D(_v2.x - _v1.x, _v2.y - _v1.y);
        }
        /**
         * Betrag des Vektors
         */
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        /**
         * Distanz zwischen 2 Punkten
         */
        static distance(_v1, _v2) {
            return Vector2D.direction(_v1, _v2).length();
        }
        /**
         * Erzeugt einen Vektor aus den X und Y Coordinaten des MouseEvents
         */
        static fromMouseEvent(_e) {
            return new Vector2D(_e.offsetX, _e.offsetY);
        }
        /**
         * Vektor normieren. Normierter Vektor = Betrag = 1
         */
        normalize() {
            let length = this.length();
            return new Vector2D(this.x / length, this.y / length);
        }
        /**
         * Null Vektor
         */
        static zero() {
            return new Vector2D(0, 0);
        }
        /**
         * Zufalls-Vektor zwischen -1 und 1
         */
        static random() {
            return new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
        }
        /**
         * (1, 0) Vektor
         */
        static right() {
            return new Vector2D(1, 0);
        }
        /**
         * (-1, 0) Vektor
         */
        static left() {
            return new Vector2D(-1, 0);
        }
    }
    EIA2.Vector2D = Vector2D;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Vector2D.js.map