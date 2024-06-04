import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Response, Request } from "express";
import { generateErrorResponse } from "../shared/response";
import { FALSE, HTTP_STATUS } from "../shared/constants";

export function validationMiddleware<T>(dtoClass: any) {
  return async function validationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { body } = req;
    const dto = plainToClass(dtoClass, body);
    const errors: any = await validate(dto);
    let errMessages: string[] = [];
    if (errors.length > 0) {
      errors.map((error: any) => {
        errMessages = errMessages.concat(...Object.values(error.constraints) as string[]);
      });
      return generateErrorResponse(errMessages, FALSE, HTTP_STATUS.PRECONDITION_FAILED, res);
    }
    next();
  };
}
