import express from "express";
import { SortController } from "../controllers/SortController";

const router = express.Router();
const _controller = new SortController();

router.post("/sort", _controller.getSort);

export = router;
