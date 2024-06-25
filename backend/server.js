const express=require('express')
const dotenv=require('dontenv').config()
const port=3000
const app=express()
app.listen(port,()=>console.log(`Server is started on port ${port}`))