

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import React from 'react'
import authScreenAtom from '../atoms/authAtoms'
import { useSetRecoilState } from 'recoil'
import useShowToast from '../hooks/useShowToast'
import userAtom from '../atoms/userAtom'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  //updating our global user
  const setUser = useSetRecoilState(userAtom);

  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })

  //setting up the toast
  // const toast = useToast();
  const showToast = useShowToast();



  const handleSignup = async () => { 
    console.log(inputs);
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs)
      })
      const data = await res.json();

      console.log("res", res);
      console.log("data after res.json()", data);

      if (data.error) {
        // toast({
        //   title: "Error",
        //   description: data.error,
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true
        // })

        showToast("Error", data.error,"error");
        return;
      }

      // localStorage.setItem("user-threads", res);
      localStorage.setItem("user-threads", JSON.stringify(data));

      //setting the data to the global user state
      setUser(data); //data in json format
    } catch (err) {
      showToast("Error", err,"error");
    }
   }


  return (
    <Flex
      align={'center'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" 
                  onChange={(e) => {
                    setInputs({...inputs, name: e.target.value})
                  }}
                  value={inputs.name}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" 
                                    onChange={(e) => {
                                      setInputs({...inputs, username: e.target.value})
                                    }}
                                    value={inputs.username}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl  isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" 
                                onChange={(e) => {
                                  setInputs({...inputs, email: e.target.value})
                                }}
                                value={inputs.email}/>
            </FormControl>
            <FormControl  isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} 
                                  onChange={(e) => {
                                    setInputs({...inputs, password: e.target.value})
                                  }}
                                  value={inputs.password}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={'white'}
                onClick={handleSignup}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800")
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={() => {
                  setAuthScreenState("login")
                }}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}