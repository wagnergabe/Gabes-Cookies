import express from 'express';
const router = express.Router();
import { getCookies, getCookiesById } from '../controllers/cookieController.js'

router.route('/').get(getCookies);
router.route('/:id').get(getCookiesById);


export default router;