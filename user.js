const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    birthdate:{
        type:Date
    },
    adress:{
        type:String
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }

});
const userinfo=mongoose.model('userinfo',userschema);
module.exports=userinfo;