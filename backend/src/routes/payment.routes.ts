import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";

const router = Router();

// POST /api/payment/order - create Razorpay order
router.post("/order", PaymentController.createOrder);

// POST /api/payment/verify - verify signature & record donation
router.post("/verify", PaymentController.verifyPayment);

export default router;
