import { Request, Response } from "express";
import { deleteFaqById, findAllFaqs, findFaqById, saveFaq, updateFaqById } from "../database/repo/faq.repository";
import { formatFaqs } from "../shared/helpers/utils";
import { FALSE, HTTP_STATUS, TRUE } from "../shared/constants";
import {
  HttpError,
  generateErrorResponse,
  generateSuccessResponse,
} from "../shared/response";
import { RESPONSE_MESSAGES } from "../shared/response-messages";

export async function addFaq(req: Request, res: Response) {
  try {    
    const { title, description } = req.body;

    // adding the faq to the database
    const response = await saveFaq(title, description);

    return generateSuccessResponse(
      RESPONSE_MESSAGES.FAQ_SAVED,
      TRUE,
      { faq: response },
      res
    );
  } catch (error) {
    return generateErrorResponse(
      error,
      FALSE,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      res
    );
  }
}

export async function getFaq(req: Request, res: Response) {
  try {
    const { faqId } = req.params;
    
    // find faq by id
    const faqData = await findFaqById(faqId);  
    return generateSuccessResponse(
      RESPONSE_MESSAGES.FAQ_RETRIEVED,
      TRUE,
      { faq: formatFaqs([faqData], true) },
      res
    );
  } catch (error) {
    return generateErrorResponse(
      error,
      FALSE,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      res
    );
  }
}

export async function getFaqs(req: Request, res: Response) {
  try {
    const faqs = await findAllFaqs();
    return generateSuccessResponse(
      RESPONSE_MESSAGES.FAQ_RETRIEVED,
      TRUE,
      { faq: formatFaqs(faqs) },
      res
    );
  } catch (error) {
    return generateErrorResponse(
      error,
      FALSE,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      res
    );
  }
}

export async function updateFaqs(req: Request, res: Response) {
  try {
    const { faqId } = req.params;
    const { title, description } = req.body;

    // find faq by id
    const faqData = await findFaqById(faqId); 
    if (!faqData) throw new HttpError(HTTP_STATUS.NOT_FOUND, RESPONSE_MESSAGES.FAQ_NOT_FOUND);

    // updating FAQ
    const payload = { title, description };
    await updateFaqById(faqId, payload);

    return generateSuccessResponse(
      RESPONSE_MESSAGES.FAQ_UPDATED,
      TRUE,
      { faq: payload },
      res
    );
  } catch (error) {
    return generateErrorResponse(
      error,
      FALSE,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      res
    );
  }
}

export async function deleteFaqs(req: Request, res: Response) {
  try {
    const { faqId } = req.params;
    
    // find faq by id
    const faqData = await findFaqById(faqId); 
    if (!faqData) throw new HttpError(HTTP_STATUS.NOT_FOUND, RESPONSE_MESSAGES.FAQ_NOT_FOUND);

    // Deleting FAQ
    await deleteFaqById(faqId);

    return generateSuccessResponse(
      RESPONSE_MESSAGES.FAQ_DELETED,
      TRUE,
      {},
      res
    );
  } catch (error) {
    return generateErrorResponse(
      error,
      FALSE,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      res
    );
  }
}
