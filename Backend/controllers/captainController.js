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