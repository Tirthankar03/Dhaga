import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import userAtom from '../atoms/userAtom'
import { useSetRecoilState } from 'recoil'
import useShowToast from '../hooks/useShowToast';

//when we click on logout button
    // backend => clear cookies
    // frontend => clear local storage
        //clear our global user state

function LogoutButton() {
    // const toast = useToast();
    const showToast = useShowToast();
    const setUser = useSetRecoilState(userAtom)
    const handleLogout = async () => { 
        try {

            //fetch -> router.post("/logout", logoutUser);  
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            
            // const data2 = res.json();
            // console.log("data without await", data2);
            
            const data = await res.json();
            console.log("data",data);
            
            //setting our toast
            if (data.error) {
                // toast({
                //     title: "Error",
                //     description: data.error,
                //     status: "error",
                //     duration: 3000,
                //     isClosable: true
                // })
                showToast("Error", data.error, "error");
            } else {
            //remove user from local Storage
            localStorage.removeItem("user-threads")
            //setting our global user state to null
            setUser(null);
                // toast({
                //     title: "Success",
                //     description: data.message,
                //     status: "success",
                //     duration: 3000,
                //     isClosable: true
                // })
                showToast("Success!", data.message, "success")
            }
            


        } catch (err) {
            console.log(err);
        }
     }
  return (
    <Button
        position={"fixed"}
        top={"30px"}
        right={"30px"}
        size={"sm"}
        onClick={handleLogout}
    >LogoutButton</Button>
  )
}

export default LogoutButton