import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other']
  },
  proficiency: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  icon: {
    type: String // Can be URL or icon name from icon library
  },
  description: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
