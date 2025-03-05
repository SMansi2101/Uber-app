const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captainController');
const auth = require('../middlewares/auth');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage ('First name at least 3 characters Long'), 
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.colour').isLength({min: 3}).withMessage('Colour must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid Vehicle Type'),
],
  captainController.regiterCaptain
)

router.post('/login',[
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min: 6}).withMessage
  ('Password must be at least 6 characters long')
],
  captainController.LoginCaptain
)

router.get('/profile',auth.authCaptain,captainController.getCaptainProfile);

router.get('/logout',auth.authCaptain,captainController.logoutCaptain);



module.exports = router;

// {
//   "captain": {
//       "fullname": {
//           "firstname": "test_captain_firstname",
//           "lastname": "test_captain_lastname"
//       },
//       "email": "test_captain@captain.com",
//       "password": "$2b$10$JxGijyGwIiTcesOCmf7WV.EWxTTkwcJLRoe4tKEjJ6N2mdk3MpmDS",
//       "status": "inactive",
//       "vehicle": {
//           "colour": "red",
//           "plate": "MH 12 NT 8783",
//           "capacity": 3,
//           "vehicleType": "car"
//       },
//       "_id": "67bab69868c5aeb514f8c8c3",
//       "__v": 0
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JhYjY5ODY4YzVhZWI1MTRmOGM4YzMiLCJpYXQiOjE3NDAyODk2ODksImV4cCI6MTc0MDM3NjA4OX0.dXuFtA-BHzXtTd_w2rfV4_BKn_r5o_RGXk-ZmGK3Mpg"
// }