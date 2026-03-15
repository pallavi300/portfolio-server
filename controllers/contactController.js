import Contact from '../models/Contact.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      message: 'Thank you for contacting! I will get back to you soon.',
      contact
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Mark as read when viewed
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, responded: req.body.responded },
      { new: true }
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
