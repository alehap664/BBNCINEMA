const {check} = require('express-validator');
const User = require('../../models/Cinema/user');

module.exports = {
  signUpUser: () => {
    return [ 
      check('username', 'username nhiều hơn 6 ký tự').isLength({ min: 6 }),
      check("username").custom(value => {
        return User.findOne({username: value}).then(user => {
          if (user) {
            return Promise.reject('username đã tồn tại');
          }
        })
      }),
      check('mail', 'mail không được để trống').not().isEmpty(),
      check('mail', 'mail không hợp lệ').isEmail(),
      check("mail").custom(value => {
        return User.findOne({mail: value}).then(user => {
          if (user) {
            return Promise.reject('mail đã tồn tại');
          }
        })
      }),
      check('password', 'password nhiều hơn 6 ký tự').isLength({ min: 6 })
    ]; 
  },
  signInUser: () => {
    return [ 
      check("username").custom(value => {
        return User.findOne({username: value}).then(user => {
          if (!user) {
            return Promise.reject('username không tồn tại');
          }
        })
      }),
      check("password").custom( (value, {req}) => {
        return User.findOne({username: req.body.username, password: value}).then(user => {
          if (!user) {
            return Promise.reject('password không hợp lệ');
          }
        })
      }),
    ]; 
  }
}