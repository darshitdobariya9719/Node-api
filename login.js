const express=require('express');
const route=express.Router();
const bcrypt=require('bcryptjs');
const User=require('../model/user');
const auth=require('../midelware/auth');
const {check,validationResult}=require('express-validator');

route.post('/',[
    check('email','email is required').not().isEmpty(),
    check('password','password is required').not().isEmpty()
],async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.json(error.array());
    }
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.json({mes:'user not exist'});
    }
    const valid=await bcrypt.compare(password,user.password);
    if(!valid){
        return res.json({mes:'password not match'});
    }
    res.json({user});
});
route.get('/',auth,async (req,res)=>{
    try {
        const user=await User.findOne({_id:req.user.id});
        //console.log(user);
        res.json({user});
    } catch (err) {
        console.log(err.message);
        res.json({mes:'server error'});
    }
});

module.exports=route;