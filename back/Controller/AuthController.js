const express = require('express');
const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');



const Jwt_Secret_Key = "KeyByProctorialPrismSty@le";





const signup= async (req, res) => {
    try {
        console.log(req.body);
        const candidate1 = await User.findOne({ email: req.body.email });
        if (candidate1) {
            return res.status(500).json({message:'Email Already Exist!'});
        }else{
            const salt = await bcrypt.genSalt(10);
            const securePass = await bcrypt.hash(req.body.password, salt)
            const candidateData = new User({
                name: req.body.name,
                email: req.body.email,
                password: securePass
            });
            
            await candidateData.save();
            const getData = {
                user: {
                    id: candidateData._id
                }
            }
            const auth_token = jwt.sign(getData, Jwt_Secret_Key);
            console.log('Data inserted.');
            res.status(200).json({token:auth_token});
            
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login=async (req, res) => {
    try {
        const { email, password } = req.body;

        const candidate = await User.findOne({ email});
        if (!candidate) {
            return res.status(400).json({ message:"User Doesn't Exist!"});
        }

        const cmpPass = await bcrypt.compare(password, candidate.password);
        if (!cmpPass) {
            return res.status(400).json({ message:"Invalid Credentials!"});
        }
        const getData = {
            user: {
                id: candidate.id
            }
        }
        const auth_token = jwt.sign(getData, Jwt_Secret_Key);
        req.session.token = auth_token;
        res.status(200).json({token:auth_token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getusers=async(req,res)=>{
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}   


module.exports = {
    login,
    signup,
    getusers
};
