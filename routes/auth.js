const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.send('Hello Auth')
})
router.post('/signup',(req,res,next)=>{
    res.send(req.body)
})
module.exports=router;