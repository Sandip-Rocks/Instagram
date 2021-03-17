const jwt=


module.exports=(req,res,next)=>{
    const {authorization}=req.header;
    if(!authorization){
        res.status(401).json({
            error:'you must be logged in'
        })
    }
    const token=authorization.replace('Bearer',"")
    jwt.verify(token,)
}