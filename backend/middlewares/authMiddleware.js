// const jwt = require('jsonwebtoken')
// require('dotenv').config()

// const isAuth = async (req, res, next) => {
//     try {
//         console.log("token is a " + req.cookies.token)
//         const token = req.cookies.token

//         if (!token) {
//             return res.status(401).json({
//                 error: 'Not authenticated',
//                 success: false
//             })
//         }

//         console.log("token is " + token)
//         const decode = jwt.verify(token, process.env.JWT_SECRET)

//         console.log("decode is " + decode)

//         if (!decode) {
//             return res.status(401).json(
//                 {
//                     error: 'Invalid token',
//                     success: false
//                 }
//             )
//         }
//         next()
//     } catch (error) {
//         return res.status(500).json({
//             error: error.message,
//             success: false
//         })
//     }
// }
// module.exports = isAuth

const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = async (req, res, next) => {
    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                error: 'Not authenticated',
                success: false
            });
        }


        let decode;
        try {
            decode = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error("JWT Verification Error:", err.message);
            return res.status(401).json({
                error: 'Invalid or expired token',
                success: false
            });
        }

        if (!decode) {
            return res.status(401).json({
                error: 'Invalid token',
                success: false
            });
        }

        req.id = decode.id  // Adjust based on token payload structure
        next();
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            success: false
        });
    }
};

module.exports = isAuth;
