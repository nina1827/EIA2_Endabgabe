"use strict";
var EIA2;
(function (EIA2) {
    class Helper {
        static screenWidth() {
            return document.body.clientWidth;
        }
        static screenHeight() {
            return document.body.clientHeight;
        }
        static canvas() {
            let canvas = document.getElementsByTagName("canvas")[0];
            canvas.width = Helper.screenWidth();
            canvas.height = Helper.screenHeight();
            return canvas;
        }
        static canvasWidth() {
            if (Helper.canvas() != null) {
                return Helper.canvas().width;
            }
            return 0;
        }
        static canvasHeight() {
            if (Helper.canvas() != null) {
                return Helper.canvas().height;
            }
            return 0;
        }
    }
    Helper.FPS = 30;
    Helper.msBetweenFrames = 1000 / Helper.FPS;
    EIA2.Helper = Helper;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Helper.js.map