import React, {useState} from 'react'
import { Flex, Text, Spacer, Avatar, Icon, Button, Input, Box, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { IoPersonCircle, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom"; // library untuk routing

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import debounce from 'lodash.debounce';

import axios from 'axios';

function NavBar({ isLoggedIn }) {
    const [search, setSearch] = useState('');
    const [videos, setVideos] = useState([]);

    // membuat fungsi untuk mengirim pesan bahwa fitur sedang dikembangkan
    function featureUnavailable () {
        toast.error('Fitur dalam pengembangan', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }

    // Membuat fungsi untuk melakukan request ke server dengan parameter nama
    const fetchVideos = (name) => {
        // Memanggil endpoint dengan metode GET
        axios
        .get(`http://localhost:500/videos/search/m/?name=${name}`)
        .then((response) => {
            // Menyimpan data videos 
            setVideos(response.data?.videos ?? []);
        })
        .catch((error) => {
            // Menampilkan pesan error jika ada
            console.error(error);
        });
    };
    // Membuat fungsi baru yang di-debounce oleh lodash.debounce
    const debouncedFetchVideos = debounce(fetchVideos, 2000);
    // Membuat fungsi untuk menangani perubahan input search
    function handleChange(event) {
        const { value } = event.target;
        setSearch(value);

        // Memanggil fungsi debouncedFetchVideos dengan value sebagai argumen
        debouncedFetchVideos(value);
    };

    return (
        <Flex align="center" justify="center" px={10} py={3} boxShadow='base' mb={3}>
            <Link to={{ pathname: `/` }} bg="green" >
                <Text fontSize="xl" fontWeight="bold">Home</Text>
            </Link>
            <Spacer />
            <Box border="1px" alignItems={'center'} display='flex' borderRadius={10} borderColor='gray.200' bg="white.100" >
                <Menu>
                    <MenuButton as={Button} rightIcon={<IoSearch />} w={"400px"}>
                        {search === '' ? 'Telusuri' : search}
                    </MenuButton>
                    <MenuList>
                        <Input name="search" placeholder='Telusuri' w={"400px"} border={0} onChange={handleChange}  max={30}/>
                        {
                            videos.map((video) => ( // loop setiap title jika ada
                                <Link to={{ pathname: `/${video._id}`, state: { video_id: video._id } }} bg="green" >
                                    <MenuItem key={video._id}>{video.title.substring(0, 40)}</MenuItem>
                                </Link>
                            ))
                        }
                    </MenuList>
                </Menu>
            </Box>
            <Spacer />
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
            <Button onClick={featureUnavailable} type='button' py={1}>
                {isLoggedIn ? (
                    <Text mr="2">Username</Text>
                ) : (
                    <Text mr="2">Sign in</Text>
                )}
                <Avatar size="sm" src={isLoggedIn ? "https://bit.ly/broken-link" : null} icon={!isLoggedIn && <Icon as={IoPersonCircle} boxSize={5}/>} />
            </Button>
        </Flex>
    )
}

export default NavBar
