import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

 export const loginRequired = (req, res, next) => {
    
        next();
   
 }

 export const register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
        
        const savedUser = await newUser.save();

        savedUser.hashPassword = undefined;

        return res.json(savedUser);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message || 'Registration failed' });
    }
};

 export const login = async (req, res) => {
    
        const user = await User.findOne({ email: req.body.email });

        return res.json({
            token: jwt.sign({ email: user.email, username: user.username, _id: user.id }, 'RESTFULAPIs'),
        });
   
};


