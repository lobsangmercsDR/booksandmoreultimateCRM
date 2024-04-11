// Importaciones necesarias
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/userModel');

// Configura SendGrid con tu API Key
