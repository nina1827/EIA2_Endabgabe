namespace EIA2 {
    export class Helper {

        public static FPS: number = 30;
        public static msBetweenFrames: number = 1000 / Helper.FPS;
        public static ball: BaseObject;

        public static screenWidth(): number {
            return document.body.clientWidth;
        }

        public static screenHeight(): number {
            return document.body.clientHeight;
        }

        public static canvas(): HTMLCanvasElement {
            let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
            canvas.width = Helper.screenWidth();
            canvas.height = Helper.screenHeight();
            return canvas;
        }

        public static canvasWidth(): number {
            if (Helper.canvas() != null) {
                return Helper.canvas().width;
            }
            return 0;
        }

        public static canvasHeight(): number {
            if (Helper.canvas() != null) {
                return Helper.canvas().height;
            }
            return 0;
        }
    }
}