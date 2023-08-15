
import React from "react";
import { Box,Text } from "@chakra-ui/react";

import TopNavBar from "./TopNavBar";

export default function NotFound(){
    return(
        <Box bg="white">
            <TopNavBar 
                isLoggedIn={false}
            />
            <Text fontSize="xl" p={4}>
                Halaman atau video yang Anda cari tidak ada
            </Text> 
        </Box>
    );
}