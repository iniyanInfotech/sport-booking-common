import { IFaqDocument } from "../../schemas/faq.schema";
import { IUtilsDocument } from "../../schemas/utils.schema";

export function formatFaqs(faqs: IFaqDocument[], readSingle: boolean = false) {
  const res = faqs?.map((obj) => {
    const { _id: id, title, description } = obj;
    return { id, title, description };
  });
  return readSingle ? res[0] : res;
}

export function formatUtils(
  utils: IUtilsDocument[],
  readSingle: boolean = false
) {
  const res = utils?.map((obj) => {
    const { _id: id, module, content } = obj;
    return { id, module, content };
  });
  return readSingle ? res[0] : res;
}
