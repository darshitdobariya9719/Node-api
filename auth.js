const jwt=require('jsonwebtoken');

module.exports=async function(req,res,next){
    const token=req.header('x-auth-token');
    if(!token){
        return res.json({mes:'token not available'});
    }
    try {
        const decode=jwt.verify(token,'asdfghjkl');
        req.user=decode.user;
        next()    
    } catch (err) {
        console.log(err.message);
        res.json({mes:'token not authorised'});
    }
    
    
}