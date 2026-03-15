import express from 'express';
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);

// Protected routes
router.post('/', protect, adminOnly, createTestimonial);
router.put('/:id', protect, adminOnly, updateTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

export default router;
