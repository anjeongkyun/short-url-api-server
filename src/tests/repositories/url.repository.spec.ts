import {
  UrlRepository,
  UrlRepositoryImpl,
} from "@/data/repositories/url.repository";
import { Url } from "@/entities/url";
import { clear, close, connect } from "@/tests/settings/database";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  await connect();
});
beforeEach(async () => {
  await clear();
});
afterAll(async () => {
  await close();
});

describe("url-repository-test", () => {
  it.each([
    [faker.internet.url(), faker.internet.url(), 0, new Date().toISOString()],
  ])(
    "sut correctly creates url",
    async (originUrl, shortenedUrl, clickCount, createdAt) => {
      //Arrange
      const creatingUrl: Url = new Url(
        originUrl,
        shortenedUrl,
        clickCount,
        createdAt
      );

      //Act
      const createdUrl: Url = await createdSut().createUrl(creatingUrl);

      //Assert
      expect(createdUrl).not.toBeNull();
      expect(createdUrl.originUrl).toStrictEqual(originUrl);
      expect(createdUrl.shortenedUrl).toStrictEqual(shortenedUrl);
      expect(createdUrl.clickCount).toStrictEqual(clickCount);
      expect(createdUrl.createdAt).toStrictEqual(createdAt);
    }
  );

  const createdSut = (): UrlRepository => {
    return new UrlRepositoryImpl();
  };
});
