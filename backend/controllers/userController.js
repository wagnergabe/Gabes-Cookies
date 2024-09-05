import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    res.send('register user');
});

const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user');
});

const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile');
});

const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile');
});

//Admin 
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by ID');
});

const getUsers = asyncHandler(async (req, res) => {
    res.send('get all users');
});

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
}