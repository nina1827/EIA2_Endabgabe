"use strict";
var EIA2;
(function (EIA2) {
    class TextDisplay extends EIA2.BaseObject {
        draw(_crc2) {
            _crc2.strokeStyle = "white";
            _crc2.lineWidth = 1;
            _crc2.strokeText(this.text, this.position.x, this.position.y);
        }
    }
    EIA2.TextDisplay = TextDisplay;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=TextDisplay.js.map