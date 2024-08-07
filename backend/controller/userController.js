const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../model/UserMode')
const { json } = require('express')
const NotFoundError = require('../utils/errors');

///GenerateToken
const GenerateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'//will expire in 30 days
    })
}


//@desc    Register new user
//@route   POST/api/users
//@access  Public
const RegisterUser=asyncHandler(async (req,res)=>{
    const {name,email,password,role}=req.body
    if(!name||!email||!password)
        {
            res.status(400)
            throw new Error ('Please add all fields')
        }
    
        //check if user exist
    const userExist =await User.findOne({email}) 

    if(userExist)
    {
        res.status(400)
        throw new Error ('User Already Exists')
    }
    //Hash password
    const salt=await bcrypt.genSalt(10)
    const HashedPaSS=await bcrypt.hash(password,salt)
    console.log('Hashed Password:', HashedPaSS)


    ///Creating and Registering new User
    const newUser= await User.create({
        name,
        email,
        password:HashedPaSS,
        role:role||'member'
    }) 
    if(newUser)
    {
        res.status(201).json({
            _id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            role: newUser.role,
            token:GenerateToken(newUser._id),
        })
    }
    else{
        res.status(400)
        throw new NotFoundError("Invalid Data Please try entering valid data for user")
    }

})


//@desc    Authenticate a user
//@route   POST/api/users/login
//@access  Public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    
    //check for user email if it exist
    if(!email|!password)
    {
        res.status(400)
        throw new Error('Please enter Credentials')
    }
    const newUser= await User.findOne({email})
    
    if(newUser && (await bcrypt.compare(password,newUser.password))){
        res.json({
            _id:newUser.id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role,
            token:GenerateToken(newUser._id)
        })
    }
    else{
        res.status(400)
        throw new NotFoundError("Invalid user credentials")
    }
   
})



//@desc    Get  user's data     
//@route   GET/api/users/me
//@access  Protect
const GetUser=asyncHandler(async(req,res)=>{
    const {_id,name,email,role}=await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,
        email,
        role,
    })
})

//@desc    Get  user's data     
//@route   GET/api/users/admin/getUser
//@access  Protect
const GetAllUsers = asyncHandler(async (req, res) => {
    // Assuming 'member' is a specific role name in your schema
    const users = await User.find({ role: 'member' }).select('_id name email role');
    res.status(200).json(users);
});


module.exports={
    RegisterUser,
    loginUser,
    GetUser,
    GetAllUsers
}