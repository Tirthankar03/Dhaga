import { Button } from "@chakra-ui/button";
import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header";

import React from "react";
import userAtom from "./atoms/userAtom";
import { useRecoilValue } from "recoil";
import LogoutButton from "./components/LogoutButton";






function App() {
    const user = useRecoilValue (userAtom)
    console.log(user)
  return (
    <Container maxW="640px">
    <Header/>
     <Routes>
      <Route path="/" element={user ? <HomePage/> : <Navigate to="/auth"/>}/>
      <Route path="/auth" element={ !user ? <AuthPage/> : <Navigate to="/"/> }/>
      <Route path="/:username" element={<UserPage/>}/>
      <Route path="/:username/post/:pid" element={<PostPage/>}/>
    </Routes>

    {user && <LogoutButton/>}

    </Container>

  )
}

export default App;
