const Access = require('../userModel/accessModel');

// Create Access
exports.createAccess = async (req, res) => {
  try {
    const newAccess = new Access(req.body);
    await newAccess.save();
    res.status(201).json(newAccess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Accesses
exports.getAllAccesses = async (req, res) => {
  try {
    const accesses = await Access.find().populate('employees');
    res.status(200).json(accesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Access by ID
exports.getAccessById = async (req, res) => {
  try {
    const access = await Access.findById(req.params.id).populate('employees');
    if (!access) {
      return res.status(404).json({ message: 'Access not found' });
    }
    res.status(200).json(access);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Access
exports.updateAccess = async (req, res) => {
  try {
    const access = await Access.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!access) {
      return res.status(404).json({ message: 'Access not found' });
    }
    res.status(200).json(access);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Access
exports.deleteAccess = async (req, res) => {
  try {
    const access = await Access.findByIdAndDelete(req.params.id);
    if (!access) {
      return res.status(404).json({ message: 'Access not found' });
    }
    res.status(200).json({ message: 'Access deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
