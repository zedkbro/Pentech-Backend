import express from 'express';
import UserRoutes from './userRoutes.js';
import AdminRoutes from './adminRoutes.js';

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/admin', AdminRoutes);

export default router;