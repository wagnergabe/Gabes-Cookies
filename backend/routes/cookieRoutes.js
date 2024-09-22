import express from 'express';
const router = express.Router();
import { getCookies, getCookieById, createCookie, updateCookie, deleteCookie } from '../controllers/cookieController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getCookies).post(protect, admin, createCookie);
router.route('/:id').get(getCookieById).put(protect, admin, updateCookie).delete(protect, admin, deleteCookie);


export default router;
  