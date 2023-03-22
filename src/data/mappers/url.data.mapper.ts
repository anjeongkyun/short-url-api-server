import { UrlDocument } from "@/data/models/url.model";
import { Url } from "@/entities/url";
import { objectId, optional } from "@/utils/util";

export class UrlDataMapper {
  toEntity(document: UrlDocument): Url {
    return new Url(
      document.originUrl,
      document.shortenedUrl,
      document.clickCount,
      document.createAt.toISOString()
    );
  }

  toDocument(entity: Url): UrlDocument {
    return {
      _id: optional(entity.id, (it) => objectId(it)),
      originUrl: entity.originUrl,
      shortenedUrl: entity.shortenedUrl,
      clickCount: entity.clickCount,
      createAt: new Date(entity.createAt),
    };
  }
}
