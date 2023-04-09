import { CreateUrlCommand } from "@/contracts/commands/create-url.command";
import { UrlRepositoryImpl } from "@/data/repositories/url.repository";
import { Url } from "@/entities/url";
import { clear, close, connect } from "@/tests/settings/database";
import { CreateUrlUsecase } from "@/usecases/create-url.usecase";
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

describe("create-url-usecase-test", () => {
  it.each([[faker.internet.url()]])(
    "sut correctly creates url",
    async (originUrl) => {
      //Arrange
      const command: CreateUrlCommand = {
        originUrl,
      };

      //Act
      const createdUrl: Url = await getSut().execute(command);

      //Assert
      expect(createdUrl).not.toBeNull();
      expect(createdUrl.id).not.toBeNull();
      expect(createdUrl.shortenedUrl).not.toBeNull();
      expect(createdUrl.originUrl).toStrictEqual(originUrl);
    }
  );

  it.each([
    [faker.random.alpha(10)],
    ["~!@#$%"],
    ["jeongkyun.com"],
    ["w2w.jeongkyun.com"],
    ["http://www.jeongkyun,com"],
  ])("sut throws Error when originUrl is invalid", async (originUrl) => {
    //Arrange
    const command: CreateUrlCommand = {
      originUrl,
    };

    //Act
    let actual = null;
    try {
      await getSut().execute(command);
    } catch (err) {
      actual = err;
    }

    //Assert
    expect(actual).not.toBeNull();
    expect(actual).toBeInstanceOf(Error);
  });
});

const getSut = (): CreateUrlUsecase => {
  return new CreateUrlUsecase(new UrlRepositoryImpl());
};
