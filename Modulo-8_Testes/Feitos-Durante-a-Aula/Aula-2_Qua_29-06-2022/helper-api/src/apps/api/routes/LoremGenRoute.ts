import express from "express";
import { LoremGenController } from "../controllers/LoremGenController";

const router = express.Router();
const _controller = new LoremGenController();

router.get("/lorem", _controller.getLorem);

export = router;
