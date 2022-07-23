import { Request, Response, NextFunction } from "express";
import { CpfService } from "../../../services/CpfService";

interface CpfRequest {
  cpf: string;
}

export class CpfController {
  #service: CpfService;

  constructor() {
    this.#service = new CpfService();
  }

  getCpf = (req: Request<CpfRequest>, res: Response, next: NextFunction) => {
    const { cpf } = req.query;

    if (cpf) {
      return res.status(200).json({
        result: this.#service.validate(cpf.toString()),
      });
    }

    return res.status(200).json({
      result: this.#service.generate(),
    });
  };
}
