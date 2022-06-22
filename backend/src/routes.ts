import { Request, Response } from "express";
import { Router } from "express";
import activateController from "./controllers/activate-controller";
import authController from "./controllers/auth-controller";
import roomsController from "./controllers/rooms-controller";
import authMiddleware from "./middlewares/auth-middleware";
const router = Router();

router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", authMiddleware, activateController.activate);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", authMiddleware, authController.logout);
router.post("/api/rooms", authMiddleware, roomsController.create);
router.get("/api/rooms", authMiddleware, roomsController.index);
export default router;
