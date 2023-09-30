import { useEffect, useState } from "react";
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

import Actions from "../components/Actions";

function Comment({comment,
    createdAt,
    likes,
    username,
    userAvatar}) {
    const [liked, setLiked] = useState(false)
  return (
    <>
    <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={userAvatar} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize='sm' fontWeight='bold'>
                    {username}
                </Text>
                <Flex gap={4} alignItems={"center"}>
                    <Text>{createdAt}</Text>
                    <BsThreeDots/>
                </Flex>
            </Flex>
            <Text>{comment}</Text>
        </Flex>
    </Flex>

<Actions liked={liked} setLiked={setLiked}/>
<Text color={"gray.light"} fontSize={"sm"}>
            { likes + (liked ? 1: 0)} likes
          </Text>
          <Divider my={4}/> 
</>
  )
}

export default Comment