const express=require('express');
const User=require('../model/user');
const bcrypt=require('bcryptjs');
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

const route=express.Router();

route.post('/',[
    check('name','name is required').not().isEmpty(),
    check('email','email is required').not().isEmpty(),
    check('email','email is not formeted').isEmail(),
    check('password','password is required').not().isEmpty(),
    check('password','passwors is minimum 8 character').isLength({min:8})
],async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.json(error.array());
    }
    try {
        const {name,email,birthdate,adress,password}=req.body;
        const exiset=await User.findOne({email});
        if(exiset){
            return res.json({mes:'user is allredy exist'});
        }
        const user=await new User ({
            name,
            email,
            birthdate,
            adress,
            password
        });
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
        const paylod={
            user:{
                id:user.id
            }
        };
        const token=await jwt.sign(paylod,'asdfghjkl');
        res.json({token,user});

    } catch (err) {
        console.log(err.message);
        res.json('server error');
    }
});

module.exports=route;