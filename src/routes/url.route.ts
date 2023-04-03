import { UsecaseContext } from "@/contexts";
import { Route } from "@/routes/route";
import { Router } from "express";
import { UrlController } from "../controllers/url.controller";

export class UrlRoute implements Route {
  router: Router = Router();
  private controller: UrlController;
  constructor(usecaseContext: UsecaseContext) {
    this.controller = new UrlController(usecaseContext);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/urls/commands/create-url", this.controller.createUrl);
  }
}
