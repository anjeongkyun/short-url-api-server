import {
  UrlRepository,
  UrlRepositoryImpl,
} from "@/data/repositories/url.repository";
import { CreateUrlUsecase } from "@/usecases/create-url.usecase";
import { GetUrlUsecase } from "@/usecases/get-url.usecase";
class RepositoryContext {
  urlRepository: UrlRepository;
  constructor() {
    this.urlRepository = new UrlRepositoryImpl();
  }
}

export class UsecaseContext {
  createUrlUsecase: CreateUrlUsecase;
  getUrlUsecase: GetUrlUsecase;
  constructor(repositoryContext: RepositoryContext) {
    this.createUrlUsecase = new CreateUrlUsecase(
      repositoryContext.urlRepository
    );
    this.getUrlUsecase = new GetUrlUsecase(repositoryContext.urlRepository);
  }
}

export const usecaseContext: UsecaseContext = new UsecaseContext(
  new RepositoryContext()
);
