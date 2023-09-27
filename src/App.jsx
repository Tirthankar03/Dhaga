import { Button } from "@chakra-ui/button";
import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";


import UserHeader from "./components/UserHeader";
import UserPost from "./components/UserPost";


function App() {

  return (
    <Container maxW="640px">
    <Header/>
    <Routes>
      <Route path="/:username" element={<UserPage/>}/>
      <Route path="/:username/post/:pid" element={<PostPage/>}/>
    </Routes>

    {/* extra stuff needed to be deleted */}
     <Button>Hello</Button>
      <UserHeader/>
      <UserPost/>


    </Container>

  )
}

export default App;
