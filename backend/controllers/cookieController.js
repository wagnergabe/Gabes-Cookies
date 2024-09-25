import asyncHandler from "../middleware/asyncHandler.js";
import Cookie from "../models/cookieModel.js";

const getCookies = asyncHandler(async (req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Cookie.countDocuments();
  const cookies = await Cookie.find({}).limit(pageSize).skip(pageSize * (page - 1));
  res.json({ cookies, page, pages: Math.ceil(count / pageSize)});
});

const getCookieById = asyncHandler(async (req, res) => {
  const cookie = await Cookie.findById(req.params.id);

  if (cookie) {
    return res.json(cookie);
  } else {
    res.status(404);
    throw new Error("Cookie not found");
  }
});

const createCookie = asyncHandler(async (req, res) => {
  const cookie = new Cookie({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
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
    throw new Error("Cookie not found");
  }
});

const deleteCookie = asyncHandler(async (req, res) => {
  const cookie = await Cookie.findById(req.params.id);

  if (cookie) {
    await Cookie.deleteOne({ _id: cookie._id });
    res.status(200).json({ message: "Cookie removed" });
  } else {
    res.status(404);
    throw new Error("Cookie not found");
  }
});

const createCookieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const cookie = await Cookie.findById(req.params.id);

  if (cookie) {
    const alreadyReviewed = cookie.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Cookie already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    cookie.reviews.push(review);

    cookie.numReviews = cookie.reviews.length;

    cookie.rating =
      cookie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      cookie.reviews.length;

    await cookie.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Cookie not found");
  }
});

export { getCookies, getCookieById, createCookie, updateCookie, deleteCookie, createCookieReview };
