namespace EIA2 {
    export class Background extends BaseObject {

        private imageData: ImageData;

        public draw(_crc2: CanvasRenderingContext2D): void {

            if (this.imageData == null) {
                let config: Config = Config.getInstance();
                let sizeWidth: number = _crc2.canvas.clientWidth;
                let sizeHeight: number = _crc2.canvas.clientHeight;

                _crc2.fillStyle = "green";
                _crc2.fillRect(0, 0, sizeWidth, sizeHeight);

                _crc2.fillStyle = "white";
                _crc2.strokeStyle = "white";
                // top outer line
                _crc2.fillRect(config.margin, config.margin, sizeWidth - 2 * config.margin, config.lineWidth);
                // bottom outer line
                _crc2.fillRect(config.margin, sizeHeight - config.margin, sizeWidth - 2 * config.margin, config.lineWidth);
                // left outer line
                _crc2.fillRect( config.margin, config.margin, config.lineWidth, sizeHeight - 2 * config.margin );
                // right outer line
                _crc2.fillRect( sizeWidth - config.margin, config.margin, config.lineWidth, sizeHeight - 2 * config.margin + config.lineWidth );

                // middle line
                _crc2.fillRect(sizeWidth / 2 - config.lineWidth / 2, config.margin, config.lineWidth, sizeHeight - 2 * config.margin);
                // middle circle
                _crc2.beginPath();
                _crc2.lineWidth = 5;
                _crc2.arc(sizeWidth / 2, sizeHeight / 2, sizeHeight / 10, 0, 2 * Math.PI, false);
                _crc2.stroke();

                // left rect
                _crc2.fillRect(config.margin, sizeHeight / 3 - config.margin, sizeWidth / 10, config.lineWidth);
                _crc2.fillRect(config.margin, sizeHeight / 3 + sizeHeight / 3, sizeWidth / 10, config.lineWidth);
                _crc2.fillRect(config.margin + sizeWidth / 10 - config.lineWidth, sizeHeight / 3 - config.margin, config.lineWidth, sizeHeight / 3 + config.margin);

                // right rect
                _crc2.fillRect(sizeWidth - config.margin - sizeWidth / 10, sizeHeight / 3 - config.margin, sizeWidth / 10, config.lineWidth);
                _crc2.fillRect(sizeWidth - config.margin - sizeWidth / 10, sizeHeight / 3 + sizeHeight / 3, sizeWidth / 10, config.lineWidth);
                _crc2.fillRect(sizeWidth - sizeWidth / 10 - config.margin, sizeHeight / 3 - config.margin, config.lineWidth, sizeHeight / 3 + config.margin);

                this.imageData = _crc2.getImageData(0, 0, sizeWidth, sizeHeight);
            } else {
                _crc2.putImageData(this.imageData, 0, 0);
            }
        }
    }
}