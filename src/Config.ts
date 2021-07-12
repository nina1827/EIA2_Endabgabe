namespace EIA2 {
    export class Config {
        private static instance: Config;

        public margin: number = 25;
        public lineWidth: number = 5;
        public team0: string = "Bayern";
        public team1: string = "BVB";
        public team0Color: string = "red";
        public team1Color: string = "blue";
        public playerCount: number = 11;
        public minDistance: number = 40;
        public actionRadius: number = 110;
        public ballFriction: number = 0.985;
        public ballKickSpeed: number = 280;
        public ballStartSpeed: number = 240;

        private constructor() { }

        public static getInstance(): Config {
            if (!Config.instance) {
                Config.instance = new Config();
            }
            return Config.instance;
        }
    }
}