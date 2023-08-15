import React from "react";
import { Link } from "react-router-dom"; // library untuk routing

import { Box, Text, Image, Center } from '@chakra-ui/react';

function VideoItem({ video }) {
  // Membuat fungsi untuk menghandle perubahan input
  const handleOnMouseUp = (e) => {
    localStorage.setItem('video_id', video._id);
  };

  // render komponen
  return (
    <Box w="240px" h="400px" m={3}>
      <Link to={{ pathname: `/${video._id}`, state: { urlVideo: video.url_video, video_id: video._id } }} bg="green" >
        {/* menampilkan thumbnail video dengan src dari url_image_thumbnail */}
        <Center h={"100%"} >
          <Image src={ video.url_image_thumbnail } onMouseUp={handleOnMouseUp} h={"100%"} objectFit={"cover"} objectPosition="top" borderRadius="md"/>
        </Center>
      </Link>
    </Box>
  );
}

export default VideoItem;
