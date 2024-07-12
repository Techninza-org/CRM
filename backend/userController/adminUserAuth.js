const User = require('../userModel/adminUserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

exports.signupUser = async (req, res) => {
  const { username, email, password} = req.body;

  try {
    if (!username || !email || !password ) {
      throw new Error('Missing required fields');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res,next) => {
  const { email, password } = req.body;
  const userIp = req.userIp;

  try {
    const user = await User.findOne({ email });
    
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '100d' });
        
        res.json({ token, user, userIp });
      } else {
        res.status(401).json('Incorrect email or password');
      }
    } else {
      res.status(401).json('User not found');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error.message);
  }
};

exports.changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    // Check if all required fields are provided
    if (!email || !oldPassword || !newPassword) {
      throw new Error('Missing required fields');
    }

    // Validate new password length
    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long');
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Verify the old password
      const match = await bcrypt.compare(oldPassword, user.password);

      if (match) {
        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
      } else {
        res.status(401).json('Incorrect old password');
      }
    } else {
      res.status(401).json('User not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
