import express from 'express';
import {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', submitContact);

// Protected routes
router.get('/', protect, adminOnly, getContacts);
router.get('/:id', protect, adminOnly, getContactById);
router.put('/:id', protect, adminOnly, updateContactStatus);
router.delete('/:id', protect, adminOnly, deleteContact);

export default router;
