import { Request, Response, NextFunction } from "express";
import { SortService, TipoOrdenacao } from "../../../services/SortService";

interface SortRequest {
  palavras: string[] | number[],
  removerDuplicados: boolean,
  ordenacao?: TipoOrdenacao
}

export class SortController {
  #service: SortService;

  constructor() {
    this.#service = new SortService();
  }

  getSort = (req: Request<SortRequest>, res: Response, next: NextFunction) => {
    const { palavras, removerDuplicados, ordenacao } = req.query;

    return res.status(200).json({
      result: this.#service.getSort(
        palavras as (string[] | number[]), 
        Boolean(removerDuplicados), 
        ordenacao as any
      ),
    });
  };
}
