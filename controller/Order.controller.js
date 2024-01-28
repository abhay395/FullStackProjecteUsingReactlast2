const { Order } = require("../model/Order.models");

exports.createOrder = async (req, res) => {
  const  {id} = req.user
  const order = new Order({...req.body,user:id});
  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.featchOrderByUserId = async (req, res) => {
  const { id } = req.user;
  try {
    const doc = await Order.find({ user: id }).exec();
    // const result = await doc.populate('productId')
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.featchAllOrder = async (req, res) => {
  let query = Order.find({});
  let totalOrderQuery = Order.find({});
  // // if(req.user.role===false){
  // //   query = query.find({deleted:true})
  // // }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalOrderQuery = totalOrderQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  const totalDocs = await totalOrderQuery.count().exec();
  try {
    const docs = await query.exec();
    res.setHeader("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      new: true,
    });
    res.status(203).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};
