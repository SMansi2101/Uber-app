const blacklistTokenModel = require('../models/blacklistToken');
const captainModel = require('../models/captainModel');
const captainService = require('../services/captainServices');
const { validationResult } = require('express-validator');

module.exports.regiterCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname,email,password,vehicle} = req.body;
    
    const isCaptainExist = await captainModel.findOne({email});
    if(isCaptainExist) {
        return res.status(400).json({error:'Captain already exist'});
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        colour:vehicle.colour,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });
    console.log(req.body);
    const token = captain.generateAuthToken();

    res.status(201).json({captain,token});

}

module.exports.LoginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

   const { email, password } = req.body;

   const captain = await captainModel.findOne({email}).select('+password');

   if(!captain){
       return res.status(400).json({message: 'Invalid email or password'});
   }

   const isMatch = await captain.comparePassword(password);

   if(!isMatch){
       return res.status(400).json({message: 'Invalid email or password'});
   }

   const token = captain.generateAuthToken();

   res.cookie('token',token);

   res.status(200).json({token, captain});
}

module.exports.getCaptainProfile = async(req,res,next) =>{
    res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain = async(req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.clearCookie('token');
     
    res.status(200).json({message: 'Logout successfully'});
}