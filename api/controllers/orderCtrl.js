import Order from "../models/Order.js";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user_id: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const createOrders = async (req, res, next) => {
  const newOrder = new Order({
    user_id: req.body.user_id,
    products: req.body.new_order,
    total_order: req.body.quantity,
    total_price: req.body.amount,
    status: "open",
  });
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({
      message: "Order Created.",
      savedOrder,
    });
  } catch (err) {
    console.log("Error Creating order:", err);
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const id = await Order.findByIdAndDelete(req.params.id);
    if (id) {
      res.status(200).json("Order has been deleted");
    }
  } catch (err) {
    console.log("Error Deleting order:", err);
    next(err);
  }
};

export const closeOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status: "closed" },
      { new: true }
    );
    if (!order) {
      return res.status(404).json("order not found");
    }
    res.status(200).json("Order Successfully Closed");
  } catch (err) {
    console.log("Error Closing order:", err);
    next(err);
  }
};
