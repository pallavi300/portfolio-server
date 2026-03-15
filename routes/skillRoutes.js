import express from 'express';
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getSkills);
router.get('/:id', getSkillById);

// Protected routes
router.post('/', protect, adminOnly, createSkill);
router.put('/:id', protect, adminOnly, updateSkill);
router.delete('/:id', protect, adminOnly, deleteSkill);

export default router;
