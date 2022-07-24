import { Request, Response, NextFunction } from "express";
import { LoremGenService } from "../../../services/LoremGenService";

interface LoremRequest {
  qtdDePalavras: number
}

export class LoremGenController {
  #service: LoremGenService;

  constructor() {
    this.#service = new LoremGenService();
  }

  getLorem = (req: Request<LoremRequest>, res: Response, next: NextFunction) => {
    const { qtdDePalavras } = req.query;

    return res.status(200).json({
      result: this.#service.getLorem(Number(qtdDePalavras)),
    });
  };
}
