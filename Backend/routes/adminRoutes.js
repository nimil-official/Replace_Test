import express from 'express';
import { adminActions } from '../controllers/adminActionController.js';


const router = express.Router();

// Get all users with role 'user'
router.get('/users', adminActions);

export default router;
