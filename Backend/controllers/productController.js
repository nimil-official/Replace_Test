import Product from '../models/products.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all from DB
    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
