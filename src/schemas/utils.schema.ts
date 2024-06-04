import { Document, Model, Schema } from "mongoose";
import db from "../database/database";
import { UTILS_MODULES } from "../shared/enum/utils.enum";

export const UTILS_COLLECTION = "util";

export interface IUtilsDocument extends Document {
  module: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const utilsSchema: Schema<IUtilsDocument> = new Schema({
  module: {
    type: String,
    required: true,
    enum: Object.values(UTILS_MODULES),
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Middleware to update the `updatedAt` field before saving the document
utilsSchema.pre<IUtilsDocument>("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

const UtilsRepoModel: Model<IUtilsDocument> = db.model(
  UTILS_COLLECTION,
  utilsSchema
);
export default UtilsRepoModel;
