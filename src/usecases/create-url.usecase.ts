import { CreateUrlCommand } from "@/contracts/commands/create-url.command";
import { UrlRepository } from "@/data/repositories/url.repository";
import { Url } from "@/entities/url";
import { generateShortUrl } from "@/utils/generate-url";

export class CreateUrlUsecase {
  private urlRepository: UrlRepository;

  constructor(urlRepository: UrlRepository) {
    this.urlRepository = urlRepository;
  }

  execute(command: CreateUrlCommand): Promise<Url> {
    this.validateUrl(command.originUrl);
    return this.urlRepository.createUrl(
      new Url(
        command.originUrl,
        generateShortUrl(command.originUrl),
        new Date().toISOString()
      )
    );
  }

  private validateUrl = (originUrl: string): void => {
    const urlRegex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );

    if (!urlRegex.test(originUrl)) {
      throw new Error("invalid url");
    }
  };
}
