export class Url {
  id?: string;
  originUrl: string;
  shortenedUrl: string;
  clickCount: number;
  createAt: string;

  constructor(
    originUrl: string,
    shortenedUrl: string,
    clickCount: number,
    createAt: string
  ) {
    this.originUrl = originUrl;
    this.shortenedUrl = shortenedUrl;
    this.clickCount = clickCount;
    this.createAt = createAt;
  }
}
