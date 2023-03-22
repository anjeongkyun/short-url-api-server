import mongoose, { model, Schema } from "mongoose";

export interface UrlDocument {
  _id?: mongoose.Types.ObjectId;
  originUrl: string;
  shortenedUrl: string;
  clickCount: number;
  createdAt: Date;
}

export const urlSchema: Schema = new Schema({
  originUrl: { type: String, required: true },
  shortenedUrl: { type: String, required: true },
  clickCount: { type: Number, required: true },
  createdAt: { type: Date, required: true },
});

export const urlDataModel = model<UrlDocument>("urls", urlSchema, "urls");
