const jwt = require('jsonwebtoken');
const userService = require('../services/userServices');
const { registerValidation, loginValidation } = require('../validations/userValidation');
const User = require('../models/Users');
const e = require('express');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { names, lastnames, email, phone_number, delivery_address, password, role } = req.body;
    const result = await userService.createUser({ names, lastnames, email, phone_number, delivery_address, password, role });

    // Generar un token JWT
    const token = jwt.sign({ userId: result.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ token, userId: result.userId });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(409).json({ error: 'User already exists' });
    } else if (error.message === 'Failed to send confirmation email') {
      return res.status(500).json({ error: 'Failed to send confirmation email' });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);

    if (result.error) {
      return res.status(401).json({ error: result.error });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: result.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token, userId: result.userId });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const confirmEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      confirmationToken: req.params.token,
      confirmationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired confirmation token' });
    }

    user.isConfirmed = true;
    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email confirmed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `http://localhost:3000/reset/${resetToken}`; // Corregido aquí
  const message = {
    to: user.email,
    from: process.env.EMAIL_USER, // Asegúrate de que esta dirección de correo esté configurada en SendGrid
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetUrl}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  try {
    await sgMail.send(message);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Password has been reset successfully' });
};
;

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  confirmEmail,
  resetPassword,
  requestPasswordReset,
};
