import React, { useState, useEffect } from "react";
import axios from "axios"; // library untuk melakukan request HTTP
import VideoItem from "./VideoItem"; // komponen untuk menampilkan thumbnail video
import { Center, Grid } from "@chakra-ui/react";

function VideoList() {
  // state untuk menyimpan daftar video
  const [videos, setVideos] = useState([]);

  // fungsi untuk melakukan request ke API
  const fetchVideos = async () => {
    try {
      // request ke dengan method GET
      const response = await axios.get("http://localhost:500/videos");
      // simpan data video ke state
      setVideos(response.data.videos);
    } catch (error) {
      // tampilkan pesan error jika ada
      console.error(error);
    }
  };

  // panggil fungsi fetchVideos saat komponen pertama kali dimuat
  useEffect(() => {
    fetchVideos();
  }, []);

  // render komponen
  return (
    <>
      {
      videos.length > 0 ? ( // jika ada video, tampilkan daftar thumbnail
        <Center>
          <Grid templateColumns="repeat(4, 1fr)">
            {
              videos.map((video) => ( // loop setiap video dan render komponen VideoItem
                <VideoItem key={video._id} video={video} />
              ))
            }
          </Grid>
        </Center>
      ) : (
        // jika tidak ada video, tampilkan pesan tidak ada video live
        <p>Tidak ada video live. {videos.length}</p>
      )}
    </>
  );
}

export default VideoList;
