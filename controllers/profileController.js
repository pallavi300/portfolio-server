import Profile from '../models/Profile.js';

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Private/Admin
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload profile image
// @route   POST /api/profile/upload
// @access  Private/Admin
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ profileImage: imageUrl });
    } else {
      profile.profileImage = imageUrl;
      await profile.save();
    }

    res.json({ imageUrl, profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload resume
// @route   POST /api/profile/upload-resume
// @access  Private/Admin
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Copy file to public folder with fixed name
    const resumeUrl = `/uploads/${req.file.filename}`;
    
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ resumeUrl });
    } else {
      profile.resumeUrl = resumeUrl;
      await profile.save();
    }

    res.json({ resumeUrl, profile, message: 'Resume uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
