import {
  UrlRepository,
  UrlRepositoryImpl,
} from "@/data/repositories/url.repository";
import { Url } from "@/entities/url";
import { clear, close, connect } from "@/tests/settings/database";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

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
      const createdUrl: Url = await getSut().createUrl(creatingUrl);

      //Assert
      expect(createdUrl).not.toBeNull();
      expect(createdUrl.originUrl).toStrictEqual(originUrl);
      expect(createdUrl.shortenedUrl).toStrictEqual(shortenedUrl);
      expect(createdUrl.clickCount).toStrictEqual(clickCount);
      expect(createdUrl.createdAt).toStrictEqual(createdAt);
    }
  );

  it.each([
    [
      [
        new Url(
          faker.internet.url(),
          faker.internet.url(),
          0,
          new Date().toISOString(),
          new mongoose.Types.ObjectId().toString()
        ),
        new Url(
          faker.internet.url(),
          faker.internet.url(),
          0,
          new Date().toISOString(),
          new mongoose.Types.ObjectId().toString()
        ),
        new Url(
          faker.internet.url(),
          faker.internet.url(),
          0,
          new Date().toISOString(),
          new mongoose.Types.ObjectId().toString()
        ),
      ],
    ],
  ])("sut correctly returns urls", async (urls) => {
    //Arrange
    const createdUrls: Url[] = await createUrls(urls);

    //Act
    const actual: Url[] = await getSut().getUrls();

    //Assert
    expect(actual.length).toStrictEqual(urls.length);
    expect(
      createdUrls
        .map((createdUrl) => createdUrl.id)
        .every((_) => actual.map((_) => _.id).includes(_))
    ).toBeTruthy();
    expect(
      createdUrls
        .map((createdUrl) => createdUrl.originUrl)
        .every((_) => actual.map((_) => _.originUrl).includes(_))
    ).toBeTruthy();
    expect(
      createdUrls
        .map((createdUrl) => createdUrl.shortenedUrl)
        .every((_) => actual.map((_) => _.shortenedUrl).includes(_))
    ).toBeTruthy();
    expect(
      createdUrls
        .map((createdUrl) => createdUrl.createdAt)
        .every((_) => actual.map((_) => _.createdAt).includes(_))
    ).toBeTruthy();
  });

  const getSut = (): UrlRepository => {
    return new UrlRepositoryImpl();
  };

  const createUrls = async (urls: Url[]): Promise<Url[]> => {
    return await Promise.all(urls.map((url: Url) => getSut().createUrl(url)));
  };
});
