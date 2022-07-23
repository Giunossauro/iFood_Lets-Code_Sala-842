import express from "express";
import { ArraySorterController } from "../controllers/ArraySorterController";

const router = express.Router();
const _controller = new ArraySorterController();

router.get("/sort", _controller.arraySorter);

export = router;
