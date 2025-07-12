import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import productDetailsRoutes from './routes/productDetailsRoute.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
// app.use(cors())
app.use(express.json());


connectDB(); // Connect to MongoDB

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/productDetails', productDetailsRoutes);
app.use('/api/admin', adminRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
