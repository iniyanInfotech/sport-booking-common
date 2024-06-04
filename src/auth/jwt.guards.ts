import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./jwt.service";
import { findUserById } from "../database/repo/user.repository";
import { findAdminById } from "../database/repo/admin.repository";
import { USER_STATUS } from "../schemas/user.schema";
import { HttpError, generateErrorResponse } from "../shared/response";
import { FALSE, HTTP_STATUS } from "../shared/constants";
import { RESPONSE_MESSAGES } from "../shared/response-messages";
import { ROLES } from "../shared/enum/user.enum";


export function verifyOpenApiAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken: any = req.headers.authorization;
    if (!bearerToken)
      throw new HttpError(
        HTTP_STATUS.UNAUTHORIZED,
        RESPONSE_MESSAGES.ACCESS_DENIED
      );
    const splitArrToken = bearerToken.split("Bearer ");

    // verifying the token
    const decoded: any = verifyToken(splitArrToken[1]);
    if (!decoded?.data?.foropenme)
      throw new HttpError(
        HTTP_STATUS.UNAUTHORIZED,
        RESPONSE_MESSAGES.ACCESS_DENIED
      );

    next();
  } catch (error) {
    return generateErrorResponse(
      error,
      FALSE,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      res
    );
  }
}

export async function verifyJwtToken(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken: any = req.headers.authorization;
    if (!bearerToken)
      throw new HttpError(
        HTTP_STATUS.UNAUTHORIZED,
        RESPONSE_MESSAGES.ACCESS_DENIED
      );
    const splitArrToken = bearerToken.split("Bearer ");

    // verifying the token
    const decoded: any = verifyToken(splitArrToken[1]);
    const { id, role } = decoded.data;
    let userData;
    if (role === ROLES.USER) {
      // retrieve the user information by id
      userData = await findUserById(id);
      if (!userData) throw new HttpError(HTTP_STATUS.UNAUTHORIZED, RESPONSE_MESSAGES.ACCESS_DENIED);
      
      const { status } = userData;
      if (status === USER_STATUS.BLOCKED) throw new HttpError(HTTP_STATUS.UNAUTHORIZED, RESPONSE_MESSAGES.ACCOUNT_BLOCKED);
    } else if (role === ROLES.ADMIN) {
      // retrieve the admin information by id
      userData = await findAdminById(id);
      if (!userData) throw new HttpError(HTTP_STATUS.UNAUTHORIZED, RESPONSE_MESSAGES.ACCESS_DENIED);
    }
    req.user = userData;
    next();
  } catch (error) {
    return generateErrorResponse(
      error,
      FALSE,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      res
    );
  }
}
