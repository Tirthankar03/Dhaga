import React, { useEffect, useState } from "react";
import UserHeader from ".././components/UserHeader";
import UserPost from ".././components/UserPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";

function UserPage() {
  const [user, setUser] = useState(null)
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
      }
    }
      getUser();
    }, [username])




    
    
    if(!user) return null;
    console.log("user", user);
  
  return (
    <>
    <UserHeader user={user}/>
    <UserPost likes={1200} replies={634} postImg="/post1.png" postTitle="Let's talk about threads"  />
    <UserPost likes={69} replies={355} postImg="/post2.png" postTitle="learn something awesome"  />
    <UserPost likes={354} replies={69} postImg="/post3.png" postTitle="abracadabra"  />
    <UserPost likes={140} replies={69} postTitle="nigger, less go...I aint got any image" postImg={undefined}  />
    </>
)

}

export default UserPage