import FaqRepoModel, { IFaqDocument } from "../../schemas/faq.schema";

export async function saveFaq(title: string, description: string) {
  return FaqRepoModel.create({
    title,
    description,
  });
}

export async function findFaqById(id: string): Promise<IFaqDocument | any> {
  return FaqRepoModel.findOne({
    _id: id,
  });
}

export async function findAllFaqs(): Promise<IFaqDocument[]> {
  return FaqRepoModel.find().sort({ updatedAt: -1 });
}

export async function updateFaqById(id: string, updateData: object): Promise<any> {
    return FaqRepoModel.updateOne({ _id: id }, updateData);
}

export async function deleteFaqById(id: string): Promise<any> {
    return FaqRepoModel.deleteOne({
      _id: id,
    });
  }
