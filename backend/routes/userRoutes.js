const express=require('express')
const router=express.Router()
const {RegisterUser, loginUser, GetUser,GetAllUsers}=require('../controller/userController')

const { Protect, AdminProtect } = require('../middleWare/authMiddleware')

router.post('/Register',RegisterUser)//add a resource(registrations)
router.post('/login',Protect,loginUser)//login
router.get('/user',Protect,GetUser)
router.get('/admin/getUsers', Protect,AdminProtect, GetAllUsers); // Get all users, admin only


module.exports=router