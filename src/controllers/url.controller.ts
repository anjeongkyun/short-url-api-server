import { UsecaseContext } from "@/contexts";
import { CreateUrlCommand } from "@/contract/commands/create-url.command";
import { Url } from "@/entities/url";
import { CreateUrlUsecase } from "@/usecases/create-url.usecase";
import { NextFunction, Request, Response } from "express";
import { GetUrlQuery } from "@/contract/queries/get-url.query";
import { GetUrlUsecase } from "@/usecases/get-url.usecase";

export class UrlController {
  private createUrlUsecsae: CreateUrlUsecase;
  private getUrlUsecase: GetUrlUsecase;

  constructor(usecaseContext: UsecaseContext) {
    this.createUrlUsecsae = usecaseContext.createUrlUsecase;
    this.getUrlUsecase = usecaseContext.getUrlUsecase;
  }

  createUrl = async (req: Request, res: Response, next: NextFunction) => {
    const command: CreateUrlCommand = req.body;
    this.createUrlUsecsae
      .execute(command)
      .then((result: Url) => res.status(200).json({ data: result }))
      .catch((err) => {
        console.error(err);
        if (err instanceof Error) {
          next(new Error("invalid url"));
          return;
        }
        next(err);
      });
  };

  getUrl = async (req: Request, res: Response, next: NextFunction) => {
    const query: GetUrlQuery = req.body;
    this.getUrlUsecase
      .process(query)
      .then((result: Url) => res.status(200).json({ data: result }))
      .catch((err) => {
        console.error(err);
        if (err instanceof Error) {
          next(new Error("invalid url"));
          return;
        }
        next(err);
      });
  };
}
