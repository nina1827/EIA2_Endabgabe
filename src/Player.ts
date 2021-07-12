namespace EIA2 {
    export class Player extends BaseObject {
        public number: number;
        public precision: number;
        public speedFactor: number;
        public team: number;
        public startPosition: Vector2D;
        public actionRadius: number;
        public hasBallContact: boolean;
        public isSelected: boolean;

        public isBallInActionRadius(): boolean {
            return Helper.ball != null && Vector2D.distance(Helper.ball.position, this.startPosition) < this.actionRadius;
        }

        public getColor(): string {
            var config = Config.getInstance();
            if (this.team == 1){
                return config.team0Color;
            }
            return config.team1Color;
        }

        public draw(_crc2: CanvasRenderingContext2D): void {
            if (this.isBallInActionRadius()){
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
                _crc2.lineTo(Helper.ball.position.x, Helper.ball.position.y);
                _crc2.stroke();
            }

            _crc2.setLineDash([]);
            _crc2.beginPath();
            _crc2.fillStyle = this.getColor();
            _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _crc2.fill();

            if (this.isSelected){
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

        public override move(_dt: number): void {
            if (this.isBallInActionRadius() && !this.hasBallContact) {
                if (Vector2D.distance(Helper.ball.position, this.position) > 5 ){
                    this.velocity = Vector2D.direction(this.position, Helper.ball.position).normalize();
                }else {
                    this.velocity = Vector2D.zero();

                    if (!this.hasBallContact){
                        var customEvent: CustomEvent = new CustomEvent("newBallContact", { detail: this })
                        window.dispatchEvent(customEvent);
    
                        this.hasBallContact = true;
                        console.log("player " + this.number + " has new ball contact");
                    }
                }
            } else if (Vector2D.distance(this.startPosition, this.position) > 5) {
                this.velocity = Vector2D.direction(this.position, this.startPosition).normalize();
            } else {
                this.velocity = Vector2D.zero();
            }
            super.move(_dt);
        }

        public isClickInRange(_mouseEvent: MouseEvent): boolean {
            return Vector2D.distance(this.position, Vector2D.fromMouseEvent(_mouseEvent)) <= 20;
        }
    }
}