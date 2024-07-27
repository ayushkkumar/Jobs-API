const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    // const {name, email, password} = req.body;
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt)
    // const tempUser = {name, email, password:hashedPassword}


    // const {name, email, password} = req.body;
    // if (!name || !email || !password){
    //     throw new BadRequestError('Please fill all the fields correctly')
    // }// will be a repitition as we got a better way
    
    const user = await User.create({...req.body})

    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token})
}

const login = async (req, res) => {
    
    const {email, password} = req.body
    
    if(!email || !password){
        throw new BadRequestError("Please provide username and password")
    }
    const user = await User.findOne({email})
    if (!user){
        throw new UnauthenticatedError('INVALID CREDENTIALS')
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invald Credentials')
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({user:{name:user.name}, token})
}

module.exports = {
    register,
    login

} 


// leaving at bcryptjs