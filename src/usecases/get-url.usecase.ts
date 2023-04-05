import { GetUrlQuery } from "@/contract/queries/get-url.query";
import { UrlRepository } from "@/data/repositories/url.repository";
import { Url } from "@/entities/url";

export class GetUrlUsecase {
  private urlRepository: UrlRepository;

  constructor(urlRepository: UrlRepository) {
    this.urlRepository = urlRepository;
  }

  process(query: GetUrlQuery): Promise<Url> {
    this.validateUrl(query.shortenedUrl);
    return this.urlRepository.getUrl(query.shortenedUrl);
  }

  private validateUrl = (shortenedUrl: string): void => {
    const urlRegex =
      /^(http(s)?\:\/\/)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(:[0-9]+)?(\/\S*)?$/;

    if (!urlRegex.test(shortenedUrl)) {
      throw new Error("invalid url");
    }
  };
}
