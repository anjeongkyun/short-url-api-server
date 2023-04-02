import { CreateUrlCommand } from "@/contract/create-url.command";
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
    const urlRegex =
      /^(http(s)?\:\/\/)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(:[0-9]+)?(\/\S*)?$/;

    if (!urlRegex.test(originUrl)) {
      throw new Error("invalid url");
    }
  };
}
