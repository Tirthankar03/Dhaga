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
import Comment from "../components/Comment";
import Actions from "../components/Actions";
import { useEffect, useState } from "react";
// import Comment from "../components/Comment";
// import useGetUserProfile from "../hooks/useGetUserProfile";
// import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";

function PostPage() {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex flexDirection={"column"}>
        <Flex w={"full"} alignItems={"center"} gap={3} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zuckerberg" />
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzukerberg
            </Text>
            <Image src="/verified.png" w="4" h={4} ml={4} />
          </Flex>
        </Flex>

          <Flex gap={4} alignItems={"center"}>
            <Text
              fontSize={"xs"}
              width={36}
              textAlign={"right"}
              color={"gray.light"}
            >
              1d ago
            </Text>

            <DeleteIcon 
              // @ts-ignore
              size={20}
              cursor={"pointer"}
              // onClick={handleDeletePost}
            />
          </Flex>
        </Flex>

        <Text my={3}>Let's talk about threads</Text>

				<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
					<Image src={"/post1.png"} w={"full"} />
				</Box>
        
        <Flex >
          <Actions liked={liked} setLiked={setLiked}/>
        </Flex>

        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"} fontSize={"sm"}>238 replies</Text>
          <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
          <Text color={"gray.light"} fontSize={"sm"}>
            {200 + (liked ? 1: 0)} likes
          </Text>
        </Flex>
        <Divider my={4}/>
      </Flex>

      <Flex justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
					<Text fontSize={"2xl"}>👋</Text>
					<Text color={"gray.light"}>Get the app to like, reply and post.</Text>
				</Flex>
				<Button>Get</Button>
			</Flex>
      <Divider my={4}/>

      <Comment 
      comment="tohri behen ke chodo"
      createdAt="2d"
      likes={234}
      username="johndoe"
      userAvatar="https://bit.ly/ryan-florence"
      />
      <Comment 
      comment="maa chodd denge"
      createdAt="69d"
      likes={169}
      username="johrasuda"
      userAvatar="https://bit.ly/prosper-baba"
      />      
      <Comment 
      comment="tohri maa ka burrr"
      createdAt="720d"
      likes={59}
      username="rendisuda"
      userAvatar="https://bit.ly/code-beast"
      />
    </>
  );
}

export default PostPage;
