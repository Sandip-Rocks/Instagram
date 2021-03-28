const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')
const User=mongoose.model('User')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../keys');
const requireLogin=require('../middleware/requireLogin');

router.get('/protected',requireLogin,(req,res)=>{
    res.send('Hello Auth')
})
// router.get('/p',requireLogin,(req,res)=>{
//     res.send('Hello p')
// })
router.post('/signup',(req,res,next)=>{
    // res.send(req.body)
    const {name,email,password}=req.body;
    if(!email||!password||!name){
        return res.status(422).json({
            error:"Please add all the fields"
        })
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exist with that email"})
        }
        bcrypt.hash(password,12).then(hashedPassword=>{

            const user=new User({
                email,
                password:hashedPassword,
                name
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })
    .catch(err=>{
        console.log(err);
    })
    
    
})

router.post('/signin',(req,res,next)=>{
    const {email,password}=req.body

    if(!email||!password){
        return res.status(422).json({
            message:"Email or password should not be blank"
        })
    }
    User.findOne({email:email})
    .then(  savedUser=>{
        if(!savedUser){
            return res.status(422).json({
                error:"Invalid email or password"
            })
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.status(200).json({
                //     message:'Signed in successfully'
                // })
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})
            }
            else{
                return res.status(422).json({
                    error:'Invalid email id or password'
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports=router;