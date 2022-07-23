import { Request, Response, NextFunction } from "express";
import { MathService } from "../../../services/MathService";

interface MathRequest {
  x: number;
  y: number;
}

export class MathController {
  #service: MathService;

  constructor() {
    this.#service = new MathService();
  }

  getSum = (req: Request<MathRequest>, res: Response, next: NextFunction) => {
    const { x, y } = req.query;

    return res.status(200).json({
      result: this.#service.getSum(Number(x), Number(y)),
    });
  };
}
