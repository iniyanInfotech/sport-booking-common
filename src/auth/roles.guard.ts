import { NextFunction, Request, Response } from "express";
import { HttpError, generateErrorResponse } from "../shared/response";
import { FALSE, HTTP_STATUS } from "../shared/constants";
import { RESPONSE_MESSAGES } from "../shared/response-messages";

export function permitRoles(permittedRoles: string[]) {
    return (req: Request | any, res: Response, next: NextFunction) => {
      try {
        if (!permittedRoles.includes(req.user.role)) {
          throw new HttpError(
            HTTP_STATUS.FORBIDDEN,
            RESPONSE_MESSAGES.ACCESS_DENIED
          );
        }
        next();
      } catch (error) {
        return generateErrorResponse(
          error,
          FALSE,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          res
        );
      }
    };
  }
