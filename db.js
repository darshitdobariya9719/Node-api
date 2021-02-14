const mongoose=require('mongoose');
const url=require('./config.json');

const db=async()=>{
    await mongoose.connect(url.dburl,{
        useCreateIndex:true,
        useFindAndModify:true
    });
    console.log('connect....');
}


module.exports=db;