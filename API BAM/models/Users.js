const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  names: {
    type: String,
    required: true
  },
  lastnames: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  delivery_address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
    required: true
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  confirmationToken: String,
  confirmationTokenExpires: Date,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Aplicar el plugin para autoincrementar el campo 'id'
UserSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', UserSchema);

module.exports = User;
