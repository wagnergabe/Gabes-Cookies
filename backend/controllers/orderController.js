import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

const addOrderItems = asyncHandler(async (req, res) => {
    res.send('add cookie items')
});

const getMyOrders = asyncHandler(async (req, res) => {
    res.send('get my orders')
});

const getOrderById = asyncHandler(async (req, res) => {
    res.send('get order by ID')
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid')
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('order to delivered')
});

const getOrders = asyncHandler(async (req, res) => {
    res.send('get all orders')
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}



