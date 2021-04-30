import jwt from 'jsonwebtoken'
export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
};

export const isAuth = (req,res,next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        // const token takes from the 7th index.
        // ex:
        //Bearer XXXXXX
        const token = authorization.slice(7, authorization.length);
        // jwt verify the sent token
        // if there is error, return
        // else set the request user with the decoded data
        // to the next() middleware it applied
        jwt.verify(
            token,
            process.env.JWT_SECRET, 
            (err,decode) =>{
            if(err){
                res.status(401).send({message: 'Invalid Token' });
            }else{
                req.user = decode;
                next();
            }
        });
    }else{
        res.status(401).send({message: 'No Token'});
    }
}

export const isAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send({message: 'Invalid Token. U no Admin'});
    }
}