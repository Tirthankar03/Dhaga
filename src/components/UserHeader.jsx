import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Button, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";

function UserHeader() {
  const toast = useToast()
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
    <div>UserHeader</div>
    <VStack gap={4} alignItems={"start"}>
      <Box>box1</Box>


      <Flex 
      justifyContent={"space-between"} 
      w={"full"}
      >
      
      <Box>
        <Text fontSize={"2xl"} fontWeight={"bold"}>Mark Zukerberg</Text>
        <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"sm"}>markzukerberg</Text>
        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>threads.net</Text>
        </Flex>
      </Box>

      {/* avatar */}
      <Box>
        <Avatar
          name="Mark Zukerberg"
          src="/zuck-avatar.png"
          size={"xl"}
        />
      </Box>
      </Flex>
      <Text>Co-founder, executive chairman and CEO of Meta Platform</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text>3.2K followers</Text>
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
					<Text fontWeight={"bold"}> Threads</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Replies</Text>
				</Flex>
			</Flex>
    </VStack>
    </>
  )
}

export default UserHeader