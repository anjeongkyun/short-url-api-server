import { GetUrlQuery } from "@/contracts/queries/get-url.query";
import { UrlRepositoryImpl } from "@/data/repositories/url.repository";
import { Url } from "@/entities/url";
import { clear, close, connect } from "@/tests/settings/database";
import { GetUrlUsecase } from "@/usecases/get-url.usecase";
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

describe("get-url-usecase-test", () => {
  it.each([
    [faker.internet.url(), faker.internet.url(), new Date().toISOString()],
  ])(
    "sut correctly returns url",
    async (originUrl, shortenedUrl, createdAt) => {
      //Arrange
      const createdUrl: Url = await new UrlRepositoryImpl().createUrl(
        new Url(originUrl, shortenedUrl, createdAt)
      );

      const query: GetUrlQuery = {
        shortenedUrl: createdUrl.shortenedUrl,
      };

      //Act
      const actual: Url = await getSut().process(query);

      //Assert
      expect(actual.id).not.toBeNull();
      expect(actual.originUrl).not.toBeNull();
      expect(actual.shortenedUrl).toStrictEqual(shortenedUrl);
      expect(actual.createdAt).toStrictEqual(createdAt);
    }
  );
});

const getSut = (): GetUrlUsecase => {
  return new GetUrlUsecase(new UrlRepositoryImpl());
};
