import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'Software Engineer'
  },
  tagline: {
    type: String,
    default: ''
  },
  resumeUrl: {
    type: String,
    default: ''
  },
  experiences: [{
    title: String,
    company: String,
    period: String,
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    year: String
  }]
}, {
  timestamps: true
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;

