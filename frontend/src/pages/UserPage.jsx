import React, { useEffect, useState } from "react";
import UserHeader from ".././components/UserHeader";
import UserPost from ".././components/UserPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";

function UserPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [fetchingPosts, setFetchingPosts] = useState(true)
  //named according to the dynamic route path set in App.jsx
  const {username} = useParams();
  const showToast = useShowToast();
  //fetch data using useEffect
  useEffect(() => {
     // @ts-ignore
     const getUser = async () => { 
      try {
        const res = await axios.get(`/api/users/profile/${username}`)
        const data = res.data;

        //fetch
          // const res = await fetch(`/api/users/profile/${username}`)
          // const data = await res.json()
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data)
        console.log("user", user);
        // console.log(data);
      } catch (error) {
        showToast("Error",error.response.data.message, "error");
        //   console.log(error.response.data);
          // console.log(error);
      }finally{
        setLoading(false)
      }
    }

    const getPosts = async () => { 
      setFetchingPosts(true)
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log("setting them into posts state",data);
        setPosts(data);
      } catch (error) {
        showToast('Error', error.message, 'error')
        setPosts([]);
      } finally{
        setFetchingPosts(false);
      }
     }
      getUser();
      getPosts();
    }, [username])


 
    if (!user && loading ) {
      return (
        <Flex justifyContent={"center"}>
          <Spinner size='xl'/>
        </Flex>
      )
    }
    
    
    if(!user && !loading) return <h1>User not found</h1>;
    console.log("user", user);
  
  return (
    <>
    <UserHeader user={user}/>
    {!fetchingPosts && posts.length === 0 && <h1>User has no posts</h1>}
    
    {fetchingPosts && (
      <Flex justifyContent={"center"} my={12}>
        <Spinner size={"xl"}/>
      </Flex>
    )}

    {posts.map((post) => (
      <Post key={post._id} post={post} postedBy={post.postedBy} />
    ))}

    </>
)

}

export default UserPage