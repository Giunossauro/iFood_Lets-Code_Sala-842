import express from "express";
import { MathController } from "../controllers/MathController";

const router = express.Router();
const _controller = new MathController();

router.get("/sum", _controller.getSum);

export = router;
