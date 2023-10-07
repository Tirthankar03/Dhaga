import { AddIcon } from '@chakra-ui/icons'
import { Image, Button, FormControl, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea,Text, useColorModeValue, useDisclosure, Input, Flex, CloseButton } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg'
import { BsFillImageFill } from 'react-icons/bs'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'

function CreatePost() {
    //used to get the id of the user that we send to the backend
    const user = useRecoilValue(userAtom)
    const MAX_CHAR = 500;



    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText, setPostText] = useState('')
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR)
    const [loading, setLoading] = useState(false)
    const showToast = useShowToast();


    const {handleImageChange, imgUrl, setImgUrl} = usePreviewImg();
    const imageRef = useRef(null)


    const handleTextChange = (e) => { 
        const inputText = e.target.value;

        if (inputText.length > MAX_CHAR) {
            const truncatedText = inputText.slice(0, MAX_CHAR);
            setPostText(truncatedText);
            setRemainingChar(0);
        }else{
            setPostText(inputText);
            setRemainingChar(MAX_CHAR - inputText.length);
        }
    }



    const handleCreatePost = async() => {
        setLoading(true);
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({postedBy:user._id, text: postText, img:imgUrl}),
            })
            const data = await res.json();

            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            console.log(data);
            showToast("Success", data.message, "success");
            onClose()
            //the info remains and we want to reset it
            setPostText("");
            setImgUrl("");
            
        } catch (error) {
            showToast("Error", error,"error");
        }finally{
            setLoading(false);
        }
}



  return (
    <>
        <Button
            position={"fixed"}
            bottom={10}
            right={10}
            leftIcon={<AddIcon/>}
            bg={useColorModeValue("gray.300", "gray.dark")}
            onClick={onOpen}>
            Post
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl>
                <Textarea placeholder='Post content goes here' onChange={handleTextChange} value={postText}/>
                <Text fontSize='xs' fontWeight='bold' textAlign={"right"} m={"1"} color={"gray.200"}>{remainingChar}/{MAX_CHAR}</Text>
                <Input type="file" hidden  ref={imageRef} onChange={handleImageChange}/>
                <BsFillImageFill style={{marginLeft: "5px", cursor:"pointer"}}  size={16} onClick={() => imageRef.current.click()}/>
            </FormControl>

            {imgUrl && (
                <Flex position={"relative"} mt={5} w={"full"}>
                    <Image src={imgUrl} alt='selected img'/>
                    <CloseButton onClick={() =>{setImgUrl("")}} bg={"gray.800"} position={"absolute"} top={2} right={2} />
                </Flex>
            )}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost