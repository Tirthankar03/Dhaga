import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'


const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message: "Unauthorized"})

        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        //if the jwt verification fails, it goes straight to error

        const user = await User.findById(decoded.userId).select("-password");
        //we grab the userId that is inside the token

        req.user = user; //create a new field called user in the object req, add our current user to the existing req body
        //we find the user form the userId obtained from the cookie and send the entire goddamn thing - password
        // res.status(200).json({decodedToken: decoded})
        next();

    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in protectRoute", err.message);
    }
}

export default protectRoute;