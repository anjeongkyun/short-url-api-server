export class Url {
  id?: string;
  originUrl: string;
  shortenedUrl: string;
  clickCount: number;
  createdAt: string;

  constructor(
    originUrl: string,
    shortenedUrl: string,
    clickCount: number,
    createdAt: string
  ) {
    this.originUrl = originUrl;
    this.shortenedUrl = shortenedUrl;
    this.clickCount = clickCount;
    this.createdAt = createdAt;
  }
}
