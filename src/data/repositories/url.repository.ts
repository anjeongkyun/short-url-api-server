import { urlDataModel } from "@/data/models/url.model";
import { Url } from "@/entities/url";
import { UrlDataMapper } from "../mappers/url.data.mapper";

export interface UrlRepository {
  getUrls(): Promise<Url[]>;
  getUrl(shortenedUrl: string): Promise<Url>;
  createUrl(url: Url): Promise<Url>;
}

export class UrlRepositoryImpl implements UrlRepository {
  private mapper: UrlDataMapper = new UrlDataMapper();

  getUrls(): Promise<Url[]> {
    return urlDataModel
      .find()
      .exec()
      .then((documents) => documents.map(this.mapper.toEntity));
  }

  getUrl(shortenedUrl: string): Promise<Url> {
    return urlDataModel
      .findOne({ shortenedUrl })
      .exec()
      .then(this.mapper.toEntity);
  }

  createUrl(url: Url): Promise<Url> {
    return urlDataModel.create(url).then(this.mapper.toEntity);
  }
}
