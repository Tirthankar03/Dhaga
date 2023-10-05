import { useToast } from '@chakra-ui/react';
import React, { useCallback } from 'react'

const useShowToast = () => { 
    const toast = useToast();

    // const showToast = useCallback((title, description, status) => {
    //     toast({
    //         title: title,
    //         description: description,
    //         status:status,
    //         duration: 3000,
    //         isClosable: true
    //     })
    // },[toast]);

    const showToast = (title, description, status) => {
        toast({
            title: title,
            description: description,
            status:status,
            duration: 3000,
            isClosable: true
        })
    }


    return showToast;
 }

export default useShowToast