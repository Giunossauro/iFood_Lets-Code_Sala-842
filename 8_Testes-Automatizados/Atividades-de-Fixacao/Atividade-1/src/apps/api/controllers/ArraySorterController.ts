import { Request, Response, NextFunction } from "express";
import { ArraySorterService } from "../../../services/ArraySorterService";

interface ArraySorterRequest {
  x: number;
  y: number;
}

export class ArraySorterController {
  #service: ArraySorterService;

  constructor() {
    this.#service = new ArraySorterService();
  }

  arraySorter = (req: Request<ArraySorterRequest>, res: Response, next: NextFunction) => {
    const { arrayDePalavras } = req.query;

    return res.status(200).json({
      result: this.#service.arraySorter(arrayDePalavras),
    });
  };
}
