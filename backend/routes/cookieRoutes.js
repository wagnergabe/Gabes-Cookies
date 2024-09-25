import express from 'express';
const router = express.Router();
import { getCookies, getCookieById, createCookie, updateCookie, deleteCookie, createCookieReview} from '../controllers/cookieController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getCookies).post(protect, admin, createCookie);
router.route('/:id').get(getCookieById).put(protect, admin, updateCookie).delete(protect, admin, deleteCookie);
router.route('/:id/reviews').post(protect, createCookieReview);

export default router;
  