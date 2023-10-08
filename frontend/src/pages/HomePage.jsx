import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";
import Post from "../components/Post";

function HomePage() {
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json()
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        console.log("Homepage, setting this data to posts",data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      }finally{
         setLoading(false)
      }
    };

    getFeedPosts();
  }, []);



  return (
    <>
        {!loading && posts.length ===0 && (
<h1>Follow some users to see the feed</h1>
      )}



      {loading && (
        <Flex justify="center">
          <Spinner size="xl"/>
        </Flex>
      )}

        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy}/>
        ))};
    </>
  );
}

export default HomePage;
