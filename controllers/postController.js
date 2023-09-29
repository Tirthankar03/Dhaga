import Post from '../models/postModel.js'
import User from '../models/userModel.js'

const createPost = async (req,res) => {
    try {
        const {postedBy, text, img} = req.body;

        if(!postedBy || !text){
            return res.status(400).json({message: "PostedBy and text fields are required"})
        }

        //check if the user actually exists in db
        const user = await User.findById(postedBy)

        if(!user) return res.status(404).json({message: "user not found"})


        
        //(req.user._id is being obtained from the protectRoute => authorized user id, currently logged in)
        //condition checking if id who is creating the post = the current logged-in Id 
        if(user._id.toString() !== req.user._id.toString()) return res.status(404).json({message: "unauthorized to create post"})

        const maxLength = 500;
        if(text.length > maxLength)  return res.status(400).json({message: `text must be less than ${maxLength} characters`})
        
        //adding our Post to db in accordance to our Post model
        const newPost = new Post({postedBy, text, img});

        await newPost.save();
        return res.status(201).json({message: "Post created successfully🔥", newPost})
    
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in createPost", err.message);
    }
}


const getPost = async (req,res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id)
        if(!post) return res.status(404).json({message: "post not found"})

        res.status(200).json({message: "Post found✅", post})
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in getPost", err.message);
    }
}

const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id)

        if(!post) return res.status(404).json({message: "post not found"})

        //check if the person trying to delete the post is actually the owner of the post 
        if(post.postedBy.toString() !== req.user._id.toString()) return res.status(401).json({message: "Unauthorized to delete Post"})
    
        await Post.findByIdAndDelete(id);
        
        res.status(200).json({message: "Post deleted successfully✅"})

    
    
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in deletePost", err.message);
    }
}

const likeUnlikePost = async (req,res)=> {
    try {
        const {id:postId} = req.params;

        //current logged in user, obtained from protectroute
        const userId = req.user._id;


        const post = await Post.findById(postId);

        if(!post) return res.status(404).json({message: "post not found"})

        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            //Unlike post
            await Post.updateOne({_id:postId}, {$pull:{likes: userId}})
            res.status(200).json({message: "Post unliked successfully👺"})
        } else {
            //Like post


            post.likes.push(userId);

            await post.save();
            res.status(200).json({message: "Post liked successfully💦"})
        }
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in likeUnlikePost", err.message);
    }
}

const replyToPost =async (req, res) => {
    try {
        const {text} = req.body;
        const {id:postId} = req.params;
        const {_id:userId, userProfilePic, username} = req.user;

        if(!text) return res.status(400).json({message: "Text field is required"})

        const post = await Post.findById(postId);

        if(!post) return res.status(404).json({message: "post not found"})

        const reply = {userId, text, userProfilePic, username};

        post.replies.push(reply);

        await post.save();

        res.status(200).json({message: "Reply added successfully", post})

        //new feature to be implemented in future, add edit replies feature

    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in replyToPost", err.message);
    }
}

const getFeedPosts = async (req,res) => {
    try {
        const {_id:userId} = req.user;
        const user = await User.findById(userId);

        if(!user) return res.status(404).json({message: "user not found"})

        //get the list of users that the current user follows
        const following = user.following;

        const feedPosts = await Post.find({postedBy: {$in:following}}).sort({createdAt: -1});

        res.status(200).json({feedPosts})
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in getFeedPosts", err.message);
    }
}

export {createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts}
