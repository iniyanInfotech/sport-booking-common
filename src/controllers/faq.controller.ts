import express from "express";
import { validationMiddleware } from "../middlewares/request-validation.middleware";
import { verifyJwtToken } from "../auth/jwt.guards";
import { permitRoles } from "../auth/roles.guard";
import { FaqDto } from "../shared/dto/faq.dto";
import { ROLES } from "../shared/enum/user.enum";
import {
  addFaq,
  deleteFaqs,
  getFaq,
  getFaqs,
  updateFaqs,
} from "../services/faq.service";

const router = express.Router();

// To retrieve the faqs information
router.get("", async (req: any, res: any) => {
  return getFaqs(req, res);
});

// To retrieve the single faq information
router.get("/:faqId", async (req: any, res: any) => {
  return getFaq(req, res);
});

// Create a faq
router.post(
  "",
  [verifyJwtToken, permitRoles([ROLES.ADMIN])],
  validationMiddleware(FaqDto),
  async (req: any, res: any) => {
    return addFaq(req, res);
  }
);

// Update a faq
router.patch(
  "/:faqId",
  [verifyJwtToken, permitRoles([ROLES.ADMIN])],
  validationMiddleware(FaqDto),
  async (req: any, res: any) => {
    return updateFaqs(req, res);
  }
);

// Delete a faq
router.delete(
  "/:faqId",
  [verifyJwtToken, permitRoles([ROLES.ADMIN])],
  validationMiddleware(FaqDto),
  async (req: any, res: any) => {
    return deleteFaqs(req, res);
  }
);

export default router;
