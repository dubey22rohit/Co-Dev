"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function DBInit() {
    mongoose_1.default.connect(process.env.DB_URL);
    const db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "Connection error : "));
    db.once("open", () => {
        console.log("DB Connected");
    });
}
exports.default = DBInit;
//# sourceMappingURL=database.js.map