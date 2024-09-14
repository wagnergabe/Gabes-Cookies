import express from 'express';
const router = express.Router();
import { getCookies, getCookieById } from '../controllers/cookieController.js';

router.route('/').get(getCookies);
router.route('/:id').get(getCookieById);

export default router;
  