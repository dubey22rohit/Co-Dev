"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activate_controller_1 = __importDefault(require("./controllers/activate-controller"));
const auth_controller_1 = __importDefault(require("./controllers/auth-controller"));
const rooms_controller_1 = __importDefault(require("./controllers/rooms-controller"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth-middleware"));
const router = (0, express_1.Router)();
router.post("/api/send-otp", auth_controller_1.default.sendOtp);
router.post("/api/verify-otp", auth_controller_1.default.verifyOtp);
router.post("/api/activate", auth_middleware_1.default, activate_controller_1.default.activate);
router.get("/api/refresh", auth_controller_1.default.refresh);
router.post("/api/logout", auth_middleware_1.default, auth_controller_1.default.logout);
router.post("/api/rooms", auth_middleware_1.default, rooms_controller_1.default.create);
router.get("/api/rooms", auth_middleware_1.default, rooms_controller_1.default.index);
exports.default = router;
//# sourceMappingURL=routes.js.map