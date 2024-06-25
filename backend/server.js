const express=require('express')
const dotenv=require('dotenv').config()
const port=3000
const app=express()

//GET @ /user
app.get('/user',(req,res)=>{
    console.log('/***********\nGet method called on the Entry point /user\n***********/\n')
    res.json({user:"Hi there i am the new User!"})
})
//POST @ /user
app.post('/user',(req,res)=>{
    console.log('/***********\nPost method called on the Entry point /user\n***********/\n')
    res.json({user:"New User Created!",name:"Saim"})
})
app.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('***********/\nPut method called on the Entry point /user\n***********/\n');
    res.json({ message: `User number ${userId} updated!` });
});

// DELETE @ /user/id
app.delete('/user/:id', (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('***********/\ndelete method called on the Entry point /user\n***********/\n');
    res.json({ message: `User number ${userId} deleted!` });
});


app.listen(port,()=>console.log(`Server is started on port ${port}`))
