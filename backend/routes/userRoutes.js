const express=require('express')
const router=express.Router()
const {RegisterUser, loginUser, GetMe}=require('../controller/userController')

const { Protect } = require('../middleWare/authMiddleware')

router.post('/Register',Protect,RegisterUser)//add a resource(registrations)
router.post('/login',Protect,loginUser)//login



module.exports=router