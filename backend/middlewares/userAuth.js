const userAuth = (req, res, next) =>{
    const token = req.cookies.user_auth_token;
    if(!token){
        return res.json({success:false, message: "Not authorized"});
    }else{
        req.token = token;
        next();
    }
}

export default userAuth;