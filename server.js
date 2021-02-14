const express=require('express');
const conn=require('./config/db');
const app=express();
conn();
app.use(express.json({extended:false}));
app.use('/api/regist',require('./router/userregister'));
app.use('/api/login',require('./router/login'));
app.listen(7000,()=>{
    console.log('server on....');
});