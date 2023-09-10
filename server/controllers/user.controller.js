const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


module.exports = {
    register: (req, res) => {
        User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
    },

    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    return res.status(400).json({ message: "Invalid Credentials" });
                }
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(400).json({ message: "Invalid Credentials" });
                }
    
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.JWT_SECRET);
    
                res.cookie("userToken", userToken, { httpOnly: true });
    
                res.json({ message: "Logged in successfully" });
            })
            .catch(err => res.status(400).json(err));
    },

    logout: (req,res) => {
        res.clearCookie('userToken');
        res.sendStatus(200);
    },

    allUsers: (req, res) =>{
        User.find()
        .then(allUsers =>res.json(allUsers))
        .catch(err => res.status(400).json(err));
    }

}
