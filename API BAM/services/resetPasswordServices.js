const bcrypt = require('bcrypt');
const crpyto = require('crypto');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const requestPasswordReset = async (req, res) => {
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();


  const resetUrl = `http://localhost:3000/reset/${resetToken}`;
  const message = `
    <h1>Reset your password</h1>
    <p>To reset your password, click on the following link:</p>
    <a href="${resetUrl}" target="_blank">Reset Password</a>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Password Reset',
    html: message,
  });
}


const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return { error: 'Invalid or expired token' };
  }
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();


};

module.exports = { requestPasswordReset, resetPassword };
