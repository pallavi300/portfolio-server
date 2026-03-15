import express from 'express';
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
  uploadResume
} from '../controllers/profileController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public route
router.get('/', getProfile);

// Protected routes
router.put('/', protect, adminOnly, updateProfile);
router.post('/upload', protect, adminOnly, upload.single('image'), uploadProfileImage);
router.post('/upload-resume', protect, adminOnly, upload.single('resume'), uploadResume);

export default router;

