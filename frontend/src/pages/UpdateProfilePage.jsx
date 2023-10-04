
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import userAtom from '../atoms/userAtom';
import { useRecoilState } from 'recoil';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';

export default function UpdateProfilePage() {
  //storing inputs in global atom state
    const [user, setUser] = useRecoilState(userAtom);
    const [inputs, setInputs] = useState({
      //instead of having empty strings, we can have all these fields grabbed from our user state
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: ""
    })
    const fileRef = useRef(null);
    const {handleImageChange, imgUrl} = usePreviewImg();
    console.log("user is here", user);

    const showToast = useShowToast();

    const handleSubmit = async(e) => { 
      e.preventDefault();
      try {
        //user._id: our current user id is passed
        const res = await fetch(`/api/users/update/${user._id}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json", 
          },
          //imgUrl is base64 and the uploading to the cloudinary part is handled in the backend
          body: JSON.stringify({...inputs, profilePic: imgUrl})
        })
        const data = await res.json();
        console.log(data);
      } catch (error) {
        showToast('Error', error, 'error')
      }
     }
  return (
    //all UI stuff
    <form onSubmit={handleSubmit}>
    <Flex
      align={'center'}
      justify={'center'} my={6}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl >
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" boxShadow={"md"} src={imgUrl || user.profilePic}/>
            </Center>
            <Center w="full">
              <Button w="full" onClick={() => {
                fileRef.current.click()
              }}>Change Avatar</Button>
              <input type="file" hidden 
              ref={fileRef}
              onChange={handleImageChange}
              />
            </Center>
          </Stack>
        </FormControl>
        <FormControl >
          <FormLabel>Full name</FormLabel>
          <Input
            placeholder="John Doe"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputs.name}
            onChange={(e) => {
              setInputs({...inputs, name:e.target.value})
            }}
          />
        </FormControl>
        <FormControl  >
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="johndoe"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputs.username}
            onChange={(e) => {
              setInputs({...inputs, username:e.target.value})
            }}
          />
        </FormControl>
        <FormControl  >
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={inputs.email}
            onChange={(e) => {
              setInputs({...inputs, email:e.target.value})
            }}
          />
        </FormControl>
        <FormControl  >
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="your bio."
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputs.bio}
            onChange={(e) => {
              setInputs({...inputs, bio:e.target.value})
            }}
          />
        </FormControl>
        <FormControl >
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'green.500',
            }}
            type="submit">
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </form>
  )
}