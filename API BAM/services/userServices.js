require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createUser = async (userData) => {
  const { names, lastnames, email, phone_number, delivery_address, password, role } = userData;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      names,
      lastnames,
      email,
      phone_number,
      delivery_address,
      password: hashedPassword,
      role,
      created_at: new Date(),
      updated_at: new Date()
    });

    await newUser.save();

    const confirmationToken = crypto.randomBytes(20).toString('hex');
    newUser.confirmationToken = confirmationToken;
    newUser.confirmationTokenExpires = Date.now() + 3600000; // 1 hora
    await newUser.save();

    const confirmationUrl = `http://localhost:${process.env.PORT}/api/users/confirm/${confirmationToken}`;
    const message = {
      to: newUser.email,
      from: process.env.EMAIL_USER, // Usa aquí la dirección de correo electrónico verificada con SendGrid
      subject: 'Confirmación de correo electrónico',
      text: `Por favor, confirma tu dirección de correo electrónico haciendo clic en el siguiente enlace: ${confirmationUrl}`,
      html: `<strong>Por favor, confirma tu dirección de correo electrónico haciendo clic en el siguiente enlace:</strong> <a href="${confirmationUrl}">${confirmationUrl}</a>`,
    };

    // Enviar el correo de confirmación con SendGrid
    await sgMail.send(message);

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, userId: newUser.id };
  } catch (error) {
    console.error('Error during user creation:', error);
    throw new Error(error.message);
  }
};


const loginUser = async (email, password) => {
  try {
    // Buscar al usuario por su correo electrónico en la base de datos
    const user = await User.findOne({ email });

    // Si no se encuentra al usuario, devolver un mensaje de error
    if (!user) {
      return { error: 'User not found' };
    }

    // Verificar si el usuario ha confirmado su correo electrónico
    if (!user.isConfirmed) {
      return { error: 'Please confirm your email before logging in' };
    }

    // Verificar si la contraseña es correcta
    const isMatch = await bcrypt.compare(password, user.password);

    // Si la contraseña es incorrecta, devolver un mensaje de error
    if (!isMatch) {
      return { error: 'Incorrect password' };
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, userId: user.id, role: user.role};
  } catch (error) {
    return { error: error.message };
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return { error: error.message };
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findOne({ id: userId });
    return user;
  } catch (error) {
    return { error: error.message };
  }
};

const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    return { error: error.message };
  }
};

const changePassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
    return updatedUser;
  } catch (error) {
    return { error: error.message };
  }
};

const isAdmin = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user.role === 'admin';
  } catch (error) {
    return { error: error.message };
  }
};
const requestPasswordReset = async (req, res) => {
  const { email } = req.body; // Asegúrate de obtener el email desde el cuerpo de la petición
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `http://localhost:3000/reset/${resetToken}`;
  const message = {
    to: user.email,
    from: process.env.EMAIL, // Asegúrate de que esta dirección esté verificada en SendGrid
    subject: 'Password Reset',
    html: `
      <h1>Reset your password</h1>
      <p>To reset your password, click on the following link:</p>
      <a href="${resetUrl}" target="_blank">Reset Password</a>
    `,
  };

  try {
    await sgMail.send(message);
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending reset password email', error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).json({ error: 'Error sending reset password email' });
  }
};

// Función para restablecer la contraseña
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body; // Asume que el token y la nueva contraseña vienen en el cuerpo de la petición
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Password has been reset successfully' });
};


module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  isAdmin,
  requestPasswordReset,
  resetPassword
};
