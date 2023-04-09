import crypto from "crypto";

const MIN_URL_LENGTH: number = 43;
const SHORTENED_URL_LENGTH: number = 5;
const domain: string = "shortener-url";

export const generateShortUrl = (originalUrl: string): string => {
  const hash: Buffer = crypto.createHash("sha256").update(originalUrl).digest();
  const shortUrl: string = encodeBase64Url(hash).substring(0, MIN_URL_LENGTH);
  return (
    extractProtocol(originalUrl) +
    domain +
    "/" +
    sortRandomUrl(shortUrl, SHORTENED_URL_LENGTH)
  );
};

const encodeBase64Url = (buffer: Buffer): string => {
  let base64 = buffer.toString("base64");
  base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return base64;
};

const sortRandomUrl = (shortUrl: string, length: number): string => {
  let result = "";
  Array.from({ length }, () => {
    result += shortUrl.charAt(Math.floor(Math.random() * shortUrl.length));
  });
  return result;
};

const extractProtocol = (url: string): string => {
  const regex = /^(https?:\/\/)/;
  const match = regex.exec(url);
  return match[1];
};
