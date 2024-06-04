import { Document, Model, Schema } from "mongoose";
import db from "../database/database";

export const FAQ_COLLECTION = "faq";

export interface IFaqDocument extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema: Schema<IFaqDocument> = new Schema({
  title: {
    type: String,
    required: false,
    unique: true,
  },
  description: {
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
faqSchema.pre<IFaqDocument>("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

const FaqRepoModel: Model<IFaqDocument> = db.model(FAQ_COLLECTION, faqSchema);
export default FaqRepoModel;
