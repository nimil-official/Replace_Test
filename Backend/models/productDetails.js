// models/ProductDetails.js
import mongoose from 'mongoose';

const productDetailsSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  modelUrl: { type: String, required: true },
  configuration: { type: mongoose.Schema.Types.Mixed, default: {} } // flexible object
}, {
  timestamps: true
});

export default mongoose.model('ProductDetails', productDetailsSchema);
