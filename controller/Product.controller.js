const { Product } = require("../model/Product.models");

exports.createProduct = async (req, res) => {
  // this product we have to get from api body
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.featchAllProducts = async (req, res) => {
  // TODO :we have to try with multiple category and brands
  // this product we have to get from api body
  let query = Product.find({});
  let totalProductsQuery = Product.find({});
  if(req.user.role==='user'){
    query = query.find({deleted:false})
  }
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {//TODO: How to get sort on discounted Price not aon actual price
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductsQuery = totalProductsQuery.sort({
      [req.query._sort]: req.query._order,
    });
  }

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  const totalDocs = await totalProductsQuery.count().exec();

  // console.log({ totalDocs });
  try {
    const docs = await query.exec();
    res.setHeader("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.featchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) { 
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req,res)=>{
    const {id} = req.params
    try {
        const product = await Product.findByIdAndUpdate(id,req.body,{returnDocument:"after",new:true});
        res.status(203).json(product)
    } catch (error) {
        res.status(400).json(error);
    }
}