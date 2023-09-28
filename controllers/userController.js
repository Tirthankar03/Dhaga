import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";



const signupUser = async (req, res) => {
    try {
        const {name, email, username, password} = req.body;
        const user = await User.findOne({$or:[{email},{username}]});

        if (user) {
            return res.status(400).json({message: "user already exists!😑"})
        }

        //authentication 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword
        })

        await newUser.save();

        if (newUser) {

            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            })
        }else{
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in signupUser", err.message);
    }
}


const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) return res.status(400).json({message: "Invalid username or password!💢"});


        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        })

    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in loginUser", err.message);
    }
}


const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:1}) //clearing the cookie
        res.status(200).json({message: "User logged out successfully👍🏼"})
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in logoutUser", err.message);
    }
}


const follow = async (req, res) => {
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        //case where you follow/unfollow yourself
        if(id == req.user._id) return res.status(400).json({message:"You cannot follow/unfollow yourself"})

        //if the userToModify or currentUser not found in the db
        if(!userToModify || !currentUser) return res.status(400).json({message:"User not found"})
        
        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            //unfollow user
            //Modify current user following, modify followers of userToModify
            await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}})
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}})
            res.status(200).json({message: "User unfollowed successfully💩!"})
        } else {
            //follow user
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}})
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}})
            res.status(200).json({message: "User followed successfully!🥵"})
        }



    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in followUnfollowUser", err.message);
    }
}


export {signupUser, loginUser, logoutUser, follow}