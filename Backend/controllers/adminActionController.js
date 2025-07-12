
import User from '../models/user.js';

export const adminActions = async (req, res) => {
  try {
   const users = await User.find({ role: { $ne: 'admin' } }).select('name phone email');
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
}