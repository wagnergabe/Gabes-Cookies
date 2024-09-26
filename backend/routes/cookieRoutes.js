import express from "express";
const router = express.Router();
import {
  getCookies,
  getCookieById,
  createCookie,
  updateCookie,
  deleteCookie,
  createCookieReview,
  getTopCookies,
} from "../controllers/cookieController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(getCookies).post(protect, admin, createCookie);
router.get("/top", getTopCookies);
router
  .route("/:id")
  .get(checkObjectId, getCookieById)
  .put(protect, admin, checkObjectId, updateCookie)
  .delete(protect, admin, checkObjectId, deleteCookie);
router.route("/:id/reviews").post(protect, checkObjectId, createCookieReview);

export default router;
