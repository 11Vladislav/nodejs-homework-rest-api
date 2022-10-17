const bcrypt = require('bcryptjs');
const {User} = require('../../models/user');

const {RequestError} = require('../../helpers');

const register = async(req, res) => {
    const {email, password, subscription} = req.body;
    const user = await User.findOne({email});
        if(user){
            throw RequestError(409, 'Email in use');
        }
    const hashPassword = await bcrypt.hash(password, 10);    
    const result = await User.create({email, subscription, password: hashPassword});
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          user: {
            email: result.email,
            subscription: result.subscription,
          }
        }
    });    
};

module.exports = register;