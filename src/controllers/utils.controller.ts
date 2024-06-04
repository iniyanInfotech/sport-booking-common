import express from "express";
import {
  addOrUpdateUtils,
  deleteUtilsContents,
  findAllUtilContents,
  findModuleContents,
} from "../services/utils.service";
import { verifyJwtToken } from "../auth/jwt.guards";
import { permitRoles } from "../auth/roles.guard";
import { validationMiddleware } from "../middlewares/request-validation.middleware";
import { UtilsDto } from "../shared/dto/utils.dto";
import { ROLES } from "../shared/enum/user.enum";

const router = express.Router();

router.get("/:moduleName", (req, res) => {
  return findModuleContents(req, res);
});

router.get("", (req, res) => {
  return findAllUtilContents(req, res);
});

router.delete("/:moduleName", (req, res) => {
  return deleteUtilsContents(req, res);
});

router.patch(
  "",
  [verifyJwtToken, permitRoles([ROLES.ADMIN])],
  validationMiddleware(UtilsDto),
  (req: any, res: any) => {
    return addOrUpdateUtils(req, res);
  }
);

export default router;
