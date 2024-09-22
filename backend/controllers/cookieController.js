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

const createCookie = asyncHandler(async (req, res) => {
    const cookie = new Cookie({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createdCookie = await cookie.save();
    res.status(201).json(createdCookie);
});

const updateCookie = asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;

    const cookie = await Cookie.findById(req.params.id);

    if (cookie) {
        cookie.name = name;
        cookie.price = price;
        cookie.description = description;
        cookie.image = image;
        cookie.countInStock = countInStock;

        const updatedCookie = await cookie.save();
        res.json(updatedCookie);
    } else {
        res.status(404);
        throw new Error('Cookie not found');
    }
});

const deleteCookie = asyncHandler(async (req, res) => {

    const cookie = await Cookie.findById(req.params.id);

    if (cookie) {
        await Cookie.deleteOne({_id: cookie._id});
        res.status(200).json({ message: 'Cookie removed' });
    } else {
        res.status(404);
        throw new Error('Cookie not found');
    }
});


export { getCookies, getCookieById, createCookie, updateCookie, deleteCookie };