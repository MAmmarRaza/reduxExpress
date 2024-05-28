const jwt = require('jsonwebtoken')
const Jwt_Secret_Key = "KeyByProctorialPrismSty@le";
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    // Bypass authentication check for requests to the 'public' directory
    // if (req.path.startsWith('/public/')) {
    //     return next();
    // }
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized r21831' })
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(token, Jwt_Secret_Key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden r37226' })
        }
        console.log(decoded.user);
        req.userId = decoded.user.id;
        // req.roles = decoded.UserInfo.roles
        next()
    })
}
module.exports = verifyJWT
