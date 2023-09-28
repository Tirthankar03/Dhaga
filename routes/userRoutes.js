import express from 'express'
import { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

//dealing with id for the first time 
//protectRoute(+user_Fromtoken) => followUnfollowUser(user._id)
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update/:id", protectRoute, updateUser);



export default router;