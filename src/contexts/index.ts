import {
  UrlRepository,
  UrlRepositoryImpl,
} from "@/data/repositories/url.repository";
import { CreateUrlUsecase } from "@/usecases/create-url.usecase";
class RepositoryContext {
  urlRepository: UrlRepository;
  constructor() {
    this.urlRepository = new UrlRepositoryImpl();
  }
}

export class UsecaseContext {
  createUrlUsecase: CreateUrlUsecase;
  constructor(repositoryContext: RepositoryContext) {
    this.createUrlUsecase = new CreateUrlUsecase(
      repositoryContext.urlRepository
    );
  }
}

export const usecaseContext: UsecaseContext = new UsecaseContext(
  new RepositoryContext()
);
