const captainModel = require('../models/captainModel');

module.exports.createCaptain = async ({
    firstname,lastname,email,password,colour,plate,capacity,vehicleType
}) => {
    if(!firstname || !lastname || !email || !password || !colour || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,   
        vehicle:{
            colour,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}