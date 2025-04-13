const userAuth = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json({success:false, message: "Not authorized"});
    }else{
        req.token = token;
        next();
    }
}

export default userAuth;