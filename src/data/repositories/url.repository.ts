import { urlDataModel } from "@/data/models/url.model";
import { Url } from "@/entities/url";
import { UrlDataMapper } from "../mappers/url.data.mapper";

export interface UrlRepository {
  getUrls(): Promise<Url[]>;
  createUrl(url: Url): Promise<Url>;
}

export class UrlRepositoryImpl implements UrlRepository {
  constructor() {}
  private mapper: UrlDataMapper = new UrlDataMapper();

  getUrls(): Promise<Url[]> {
    throw new Error("Method not implemented.");
  }

  createUrl(url: Url): Promise<Url> {
    return urlDataModel
      .create(url)
      .then((document) => this.mapper.toEntity(document));
  }
}
