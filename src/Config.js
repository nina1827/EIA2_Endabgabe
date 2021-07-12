"use strict";
var EIA2;
(function (EIA2) {
    class Config {
        constructor() {
            this.margin = 25;
            this.lineWidth = 5;
            this.team0 = "Bayern";
            this.team1 = "BVB";
            this.team0Color = "red";
            this.team1Color = "blue";
            this.playerCount = 11;
            this.minDistance = 40;
            this.actionRadius = 110;
            this.ballFriction = 0.985;
            this.ballKickSpeed = 280;
            this.ballStartSpeed = 240;
        }
        static getInstance() {
            if (!Config.instance) {
                Config.instance = new Config();
            }
            return Config.instance;
        }
    }
    EIA2.Config = Config;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Config.js.map