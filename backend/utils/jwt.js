import jwt from 'jsonwebtoken';

const genToken = (payload, secretKey) =>{
    const token = new Promise((res, rej) => {
        jwt.sign(payload, secretKey, (err, token) =>{
            if(err) rej(`Something went wrong ${err}`);
            res(token);
        })
    })

    return token;
}

const verifyToken = (token, secretKey) =>{
    const isVerified = new Promise((res, rej) =>{
        jwt.verify(token, secretKey, (err, status) =>{
            if(err) rej(`Something went wrong ${err}`);
            res(status);
        })
    })

    return isVerified;
}

export {genToken, verifyToken};