import React from "react";
import VideoList from './VideoList';
import { Box } from "@chakra-ui/react";

import TopNavBar from "./TopNavBar";

export default function Home(){
    return (
        <Box bg="white">
            <TopNavBar 
                isLoggedIn={false}
            />
            <VideoList />
        </Box>
    );
};