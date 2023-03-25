export class Url {
  id?: string;
  originUrl: string;
  shortenedUrl: string;
  createdAt: string;

  constructor(
    originUrl: string,
    shortenedUrl: string,
    createdAt: string,
    id?: string
  ) {
    this.originUrl = originUrl;
    this.shortenedUrl = shortenedUrl;
    this.createdAt = createdAt;
    this.id = id;
  }
}
