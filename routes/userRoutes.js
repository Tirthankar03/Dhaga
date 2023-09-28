import express from 'express'
import { signupUser, loginUser, logoutUser, follow } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, follow);
//dealing with id for the first time 
//protectRoute(+user_Fromtoken) => followUnfollowUser(user._id)


export default router;