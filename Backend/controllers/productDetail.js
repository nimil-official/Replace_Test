import ProductDetails from '../models/productDetails.js'; // model file

export const productDetails = async (req, res) => {
  try {
    const productDetails = await ProductDetails.findOne({ product_id: req.params.productId });
    if (!productDetails) return res.status(404).json({ message: "Details not found" });

    res.json(productDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}