import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
  file: { type: String },
}, { timestamps: true });

export default mongoose.model('Products', productSchema);
