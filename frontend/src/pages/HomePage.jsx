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

  import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

  
  function HomePage() {
    return (
     <Link to={"/markzuckerberg"}>
        <Flex w={"full"} justifyContent={"center"}>
            <Button mx={"auto"}>Visit Profile Page</Button>
        </Flex>
     </Link>
    )
  }
  
  export default HomePage