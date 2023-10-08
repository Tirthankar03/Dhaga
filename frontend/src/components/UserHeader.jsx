import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";

function UserHeader({
  user //user from the searched profile
}) {
  const toast = useToast() 
  const currentUser = useRecoilValue(userAtom); //logged in user
  //check if we are following the user or not 
  const [following, setFollowing] = useState(user.followers.includes(currentUser?._id))
  console.log(following);
  //check if updating 
  const [updating, setUpdating] = useState(false)
  const showToast = useShowToast();


  const handleFollowUnfollow = async() => { 
    //redundant if we just protect the routes
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error")
      return;
    }
    if (updating) return; 

    setUpdating(true)
    try {
      const res = await axios.post(`/api/users/follow/${user._id}`, {
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to JSON
          // You can also include other headers if needed
        }
      })

      const data = res.data

      if (data.error) {
        showToast("Error", data.error, "error")
        return;
      }

      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success");
        user.followers.pop(); //simulating removing from followers
      }else{
        showToast("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id); //simulating removing from followers
      }




      setFollowing(!following);

      console.log(data);

    } catch (error) {
      showToast("Error",error.response.data.message, "error");
    }finally{
      setUpdating(false)
    }
  }

  const copyURL = () =>{
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(()=>{
      toast({
        // title: 'Account created.',
        description: "Profile link copied",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    })
  }
  return (
    <>
    <VStack gap={4} alignItems={"start"}>


      <Flex 
      justifyContent={"space-between"} 
      w={"full"}
      >
      
      <Box>
        <Text fontSize={"2xl"} fontWeight={"bold"}>{user.name}</Text>
        <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"sm"}>{user.username}</Text>
        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>dhaga.net</Text>
        </Flex>
      </Box>

      {/* avatar */}
      <Box>
        <Avatar
          name={user.name}
          src={user.profilePic}
          size={{
            base: "md",
            md:"xl"
          }}
        />
      </Box>
      </Flex>

      <Text>{user.bio}</Text>
      
      {/* update button / follow and unfollow*/}
      
      {currentUser?._id === user._id && (
        <Link as={RouterLink} to="/update" >
        <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
            {currentUser?._id !== user._id && (

        <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating} >{following ? "Unfollow" : "Follow"}</Button>

      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text>{user.followers.length} followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>

        <Flex>

          <Box className="icon-container">
            <BsInstagram size={"24"} cursor={"pointer"}/>
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={"24"} cursor={"pointer"}/>
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
				<Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
					<Text fontWeight={"bold"}>Dhaga</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}>Replies</Text>
				</Flex>
			</Flex>
    </VStack>
    </>
  )
}

export default UserHeader