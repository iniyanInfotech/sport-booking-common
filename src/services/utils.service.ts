import { Request, Response } from "express";
import {
  deleteModuleContent,
  getAllContents,
  getContentsByModuleName,
  saveContents,
  updateContents,
} from "../database/repo/utils.repository";
import { formatUtils } from "../shared/helpers/utils";
import {
  HttpError,
  generateErrorResponse,
  generateSuccessResponse,
} from "../shared/response";
import { FALSE, HTTP_STATUS, TRUE } from "../shared/constants";
import { RESPONSE_MESSAGES } from "../shared/response-messages";

export async function addOrUpdateUtils(req: Request, res: Response) {
  try {
    const { module: moduleName, content } = req.body;

    // check module already exist or not
    const isExist = await getContentsByModuleName(moduleName);

    if (isExist) {
      await updateContents(moduleName, content);
    } else {
      await saveContents(moduleName, content);
    }

    return generateSuccessResponse(
      RESPONSE_MESSAGES.UTILS_SAVED,
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

export async function findModuleContents(req: Request, res: Response) {
  try {
    const { moduleName } = req.params;
    const mContents = await getContentsByModuleName(moduleName);
    if (!mContents)
      throw new HttpError(
        HTTP_STATUS.NOT_FOUND,
        RESPONSE_MESSAGES.UTILS_NOT_FOUND
      );

    return generateSuccessResponse(
      RESPONSE_MESSAGES.UTILS_FETCHED_SUCCESS,
      TRUE,
      { utils: formatUtils([mContents], true) },
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

export async function findAllUtilContents(req: Request, res: Response) {
  try {
    const mContents = await getAllContents();
    return generateSuccessResponse(
      RESPONSE_MESSAGES.UTILS_FETCHED_SUCCESS,
      TRUE,
      { utils: formatUtils(mContents) },
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

export async function deleteUtilsContents(req: Request, res: Response) {
  try {
    const { moduleName } = req.params;
    const mContents = await getContentsByModuleName(moduleName);
    if (!mContents)
      throw new HttpError(
        HTTP_STATUS.NOT_FOUND,
        RESPONSE_MESSAGES.UTILS_NOT_FOUND
      );

    // deleting the contents
    await deleteModuleContent(moduleName);
    return generateSuccessResponse(
      RESPONSE_MESSAGES.UTILS_DELETED,
      TRUE,
      { },
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
