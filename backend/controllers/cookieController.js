import asyncHandler from '../middleware/asyncHandler.js';
import Cookie from '../models/cookieModel.js';

const getCookies = asyncHandler(async (req, res) => {
 const cookies = await Cookie.find({});
    res.json(cookies);
});

const getCookieById = asyncHandler(async (req, res) => {
    const cookie = await Cookie.findById(req.params.id);

    if (cookie) {
     return res.json(cookie);
    } else {
        res.status(404);
        throw new Error('Cookie not found');
    }
});

export { getCookies, getCookieById };