import productModel from "../models/product.js";

const listProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .select(
        "type category image isNeww isOnSale isFeatured discountPercentage title price originalPrice inStock"
      );
    return res.json({
      success: true,
      message: "Fetched all products",
      length: products.length,
      products
    });
  } catch (error) {
    return res.json({ success: false, message: "Error fetching prouducts" });
  }
};
const listProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findOne({ _id: id });
    if (!product) {
      return res.json({ success: false, message: "No product found" });
    }

    return res.json({
      success: true,
      message: "Fetched product details",
      product,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `Something went wrong ${error}`,
    });
  }
};

export { listProduct, listProducts };
