import Order from "../models/Order.js";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user_id: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const createOrders = (req, res, next) => {
  const newOrder = new Order({
    user_id: req.body.user_id,
    products: req.body.new_order,
    total_order: req.body.quantity,
    total_price: req.body.amount,
  });
  try {
    const savedOrder = newOrder.save();
    res.status(200).json({
      message: "Order Created.",
      savedOrder,
    });
  } catch (err) {
    console.err("Error Creating order:", err);
    next(err);
  }
};
