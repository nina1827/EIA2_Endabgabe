namespace EIA2 {
    export class Ball extends BaseObject {
        public draw(_crc2: CanvasRenderingContext2D): void {
            _crc2.beginPath();
            _crc2.fillStyle = "white";
            _crc2.strokeStyle = "black";
            _crc2.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
            _crc2.fill();
            _crc2.stroke();
        }

        public isOut(): boolean {
            let config: Config = Config.getInstance();
            return this.position.x > Helper.canvasWidth() - config.margin 
            || this.position.x < config.margin
            || this.position.y < config.margin
            || this.position.y > Helper.canvasHeight() - config.margin;
        }

        public isGoal(): boolean {
            return this.isOut() && this.position.y >= Helper.canvasHeight() / 3 && this.position.y <= 2 * Helper.canvasHeight() / 3;
        }

        public override move(_dt: number): void {
            if(this.isGoal()){
                var customEvent: CustomEvent = new CustomEvent("ballGoal")
                window.dispatchEvent(customEvent);
            }else if(this.isOut()){
                var customEvent: CustomEvent = new CustomEvent("ballOut")
                window.dispatchEvent(customEvent);
            }
            
            super.move(_dt);
        }
    }
}