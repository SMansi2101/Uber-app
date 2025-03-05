const userModel = require('../models/userModel');
const captainModel = require('../models/captainModel');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isblacklisted = await blacklistTokenModel.findOne({token: token});

    if(isblacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try  {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();
    }catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isblacklisted = await blacklistTokenModel.findOne({token});

    if(isblacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try{
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;

        return next();
    }catch (error){
        console.log(error);
        return res.status(401).json({message: 'Unauthorized'});
    }
}