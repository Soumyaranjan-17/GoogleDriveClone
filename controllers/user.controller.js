const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register: async (req, res) => {
        try {
            const { email, username, password } = req.body;
            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await userModel.create({
                email,
                username,
                password: hashPassword,
            });

            res.render('signup-success');
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
};

module.exports = userController; 