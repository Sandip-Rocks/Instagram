// const { request } = require('express');
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post')


// router.get('/p',(req,res)=>{
//     res.send('Hello p')
// })
router.get('/allpost',(req,res)=>{
    Post.find()
    .populate('postedBy','_id name')
    .then(posts=>{
        res.json({posts});
    })
    .catch(err=>{
        console.log(err);
    })
})
router.post('/createpost',requireLogin, (req, res) => {
    const {title,body} = req.body
    if (!title || !body) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    // console.log(req.user);
    // res.send('OK')
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy: req.user
    })
    post.save().then(result=>{
        res.json({
            post:result
        })
    })
    .catch(err=>{
        console.log(err);
    })
})
module.exports = router;