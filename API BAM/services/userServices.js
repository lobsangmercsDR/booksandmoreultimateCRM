const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');

const createUser = async (userData) => {
    const { names, lastnames, email, phone_number, delivery_address, password, role } = userData;

    try {
        // Verificar si ya existe un usuario con el correo electrónico proporcionado
        const userExists = await User.findOne({ email });
        if (userExists) {
            return { error: 'User already exists' };
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Crear un nuevo usuario
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

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        // Generar un token JWT
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            token,
            userId: newUser.id
        };
    } catch (error) {
        return { error: error.message };
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

        // Verificar si la contraseña es correcta
        const isMatch = await bcrypt.compare(password, user.password);

        // Si la contraseña es incorrecta, devolver un mensaje de error
        if (!isMatch) {
            return { error: 'Incorrect password' };
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            token,
            userId: user.id
        };
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
        const user = await User.findOne({id: userId});
        return user;
    } catch (error) {
        return { error: error.message };
    }
}

const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        return updatedUser;
    }catch (error) {
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
 

const changePassword = async(userId, newPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
        return updatedUser;
    }
    catch (error) {
        return { error: error.message };
    }
}

const isAdmin = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user.role === 'admin';
    } catch (error) {
        return { error: error.message };
    }
 };

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    changePassword,
    isAdmin
};
