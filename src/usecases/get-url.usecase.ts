import { GetUrlQuery } from "@/contracts/queries/get-url.query";
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
    const urlRegex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );

    if (!urlRegex.test(shortenedUrl)) {
      throw new Error("invalid url");
    }
  };
}
