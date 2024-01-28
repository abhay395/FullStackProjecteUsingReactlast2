const { Cart } = require("../model/Cart.models");

exports.addToCart =exports.createProduct = async (req, res) => {
  // this product we have to get from api body
  const {id} = req.user
  const cart = new Cart({...req.body,userId:id});
  try {
    const doc = await cart.save();
    const result = await doc.populate('productId')
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};


exports.featchCartProductByUserId = async (req, res) => {
  const { id } = req.user;
  try {
    const cart = await Cart.find({ userId: id })
      .populate("productId");
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      new: true,
    }).exec();
    const result = await cart.populate('productId')
    res.status(203).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteProductformCart = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Cart.findByIdAndDelete(id).exec();
    console.log(deletedProduct);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Failed to delete product from cart" });
  }
};

// exports.deleteProductFromCart = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedProduct = await Cart.findOneAndDelete({ productId: id }).exec();
//     console.log(deletedProduct);
//     res.status(200).json({ productId: deletedProduct.productId, userId: deletedProduct.userId });
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ error: 'Failed to delete product from cart' });
//   }
// };
