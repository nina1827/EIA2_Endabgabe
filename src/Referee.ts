namespace EIA2 {
    export class Referee extends BaseObject {
        public draw(_crc2: CanvasRenderingContext2D): void {
            _crc2.beginPath();
            _crc2.fillStyle = "black";
            _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _crc2.fill();
        }

        public override move(_dt: number): void {
            if (Vector2D.distance(Helper.ball.position, this.position) > 50 ){
                this.velocity = Vector2D.direction(this.position, Helper.ball.position).normalize();
            }else {
                this.velocity = Vector2D.zero();
            }
            super.move(_dt);
        }
    }
}