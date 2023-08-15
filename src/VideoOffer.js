// VideoOffer.js
import React from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { Box, Text, Image, Input, Textarea, Button, Badge, Stack, CircularProgress, Tooltip  } from '@chakra-ui/react';
import { Element} from 'react-scroll';
import moment from 'moment';

import TopNavBar from './TopNavBar';
import NotFound from './NotFound';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IoSearch } from "react-icons/io5";

// Fungsi untuk mendapatkan youtube id dari url
function getYoutubeId(url) {
    // Membagi url dengan karakter "?" sebagai pemisah
    let parts = url.split("?");
    // Mengambil elemen kedua dari array parts
    let part = parts[1];
    // Membagi part dengan karakter "=" sebagai pemisah
    let subparts = part.split("=");
    // Mengambil elemen kedua dari array subparts
    let id = subparts[1];
    // Mengembalikan id
    return id;
}

// membuat komponen ProductItem untuk menampilkan detail produk
const ProductItem = ({ product }) => {
    return (
        <a href={product.url_product} target="_blank">
            <Box mb={2} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
                {/* menampilkan gambar produk dengan src dari url_image_product */}
                <Image src={`https://via.placeholder.com/100x100?text=${product.url_image_product}`} alt={product.title} objectPosition="top" objectFit={'cover'} w={"100%"} h={"100px"} bg="gray.200"/>
                {/* menampilkan judul produk dengan text dari title */}
                <Text fontSize="sm" fontWeight="bold" mt={2} px={4}>
                    {product.title}
                </Text>
                {/* menampilkan harga produk dengan text dari price */}
                <Text fontSize="sm" color="green" mb={2} px={4}>
                    Rp {product.price}
                </Text>
            </Box>
        </a>
    );
};
// membuat komponen CommentItem untuk menampilkan detail komentar
const CommentItem = ({ comment }) => {
    return (
        <Box p={2} border="1px" borderColor="gray.200" borderRadius="md" mb={1} bg="white" boxShadow="sm">
            <Stack direction='row'>
                {/* menampilkan username komentar dengan text dari username */}
                <Text fontSize="sm" color='gray.500'>
                    {comment.username}
                </Text>
                {/* menampilkan comment komentar dengan text dari comment */}
                <Text fontSize="sm" noOfLines={[1, 2, 3]}>
                    {comment.comment}
                </Text>
            </Stack>
            {/* menampilkan timestamp komentar dengan text dari timestamp */}
            <Text fontSize="xs" color="gray.500">
                {moment(comment.timestamp).format('DD/MM/YYYY')}
            </Text>
        </Box>
    );
};

// membuat komponen CommentList untuk menampung CommentItem
const CommentList = ({comments}) => {
    return (
        // Jika ada komentar, menampilkan setiap komentar dengan map
        comments.map((comment) => (
            // menampilkan komponen CommentItem untuk setiap komentar
            <CommentItem key={comment.timestamp} comment={comment} />
        ))
    );
};

class VideoOffer extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            video: undefined,
            video_id: this.props.match.params.video_id  ?? localStorage.getItem ('video_id'),
            urlVideo: this.props.location.state?.urlVideo ?? '',
            products: [],
            comments: [],
            username: '',
            comment: '',
            status: '',
            loadingSubmit: false,

            // fitur video
            autoPlay: 0,
            controls: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Metode siklus hidup yang dipanggil ketika komponen berhasil dirender
    componentDidMount() {
        // Mendapatkan video_id dari parameter URL
        const { video_id } = this.state;

        // Mendapatkan url video dari state yang dikirimkan oleh video_id
        if (video_id) {
            // Memanggil endpoint dengan metode GET
            axios
                .get(`http://localhost:500/videos/search/o/${video_id ?? ""}`)
                .then((response) => {
                    // Menyimpan data produk ke state dan menghapus local storage
                    this.setState({
                        video: response.data.video,
                        urlVideo: response.data.video.status === "deleted" ? '' : response.data.video.url_video,
                        autoPlay: response.data.video.status === "live" ? 1 : 0,
                        controls: response.data.video.status === "recorded" ? 1 : 0
                    });
                    console.log(this.state.autoPlay);
                    localStorage.removeItem("video_id");
                })
                .catch((error) => {
                    // Menampilkan pesan error jika ada
                    console.error(error);
                });

            // Memanggil endpoint dengan metode GET
            axios
                .get(`http://localhost:500/watch/${video_id}`)
                .then((response) => {
                    // Menyimpan data produk ke state
                    this.setState({
                        products: response.data.products,
                    });
                })
                .catch((error) => {
                    // Menampilkan pesan error jika ada
                    console.error(error);
                });

            // Memanggil endpoint dengan metode GET
            axios
                .get(`http://localhost:500/watch/comments/${video_id}`)
                .then((response) => {
                    // Menyimpan data komentar ke state
                    this.setState({
                        comments: response.data.comments,
                    });
                })
                .catch((error) => {
                    // Menampilkan pesan error jika ada
                    console.error(error);
                });
        }
    }

    // metode kelas untuk mengubah state sesuai dengan input yang dimasukkan oleh user
    handleChange(event) {
        const { name, value } = event.target;
        if (name === "username") {
            this.setState({ username: value });
        } else if (name === "comment") {
            this.setState({ comment: value });
        }
    }

    // metode kelas untuk melakukan validasi dan request ke server backend ketika user menekan button submit
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ loadingSubmit: true });
        // melakukan validasi input
        if (this.state.username === "" && this.state.comment === "") {
            // menampilkan pesan error jika username dan comment kosong
            toast.error('Username dan comment kosong', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            this.setState({ loadingSubmit: false });
        } else if (this.state.username === "") {
            // menampilkan pesan error jika username kosong
            toast.error('Username kosong', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            this.setState({ loadingSubmit: false });
        } else if (this.state.comment === "") {
            // menampilkan pesan error jika comment kosong
            toast.error('Comment kosong', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            this.setState({ loadingSubmit: false });
        } else {
            // mengubah status menjadi loading
            this.setState({ status: "loading" });
            // memanggil endpoint dengan metode POST
            axios.post("http://localhost:500/watch/comments/submit", {
                username: this.state.username,
                comment: this.state.comment,
                video_id: this.state.video_id,
            })
            .then((response) => {
                // mengubah status menjadi success
                this.setState({ status: "success" });
                // menampilkan pesan sukses jika response berhasil
                toast.success('Success', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
                // menambahkan comment ke comments
                const timestamp = new Date().toISOString();
                this.setState((prevState) => ({
                    comments: [
                    ...prevState.comments,
                    { username: prevState.username, comment: prevState.comment, timestamp },
                    ],
                    // mengosongkan username dan comment
                    username: "",
                    comment: "",
                }));
            })
            .catch((error) => {
                // mengubah status menjadi error
                this.setState({ status: "error" });
                // menampilkan pesan error jika response gagal
                // Menggunakan operator || untuk memberikan fallback value atau pesan default jika data null
                const errorMessage =
                    error.response?.data?.message ?? "Server sedang sibuk";
                
                toast.error(errorMessage, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            })
            .finally(() => {
                this.setState({ loadingSubmit: false });
            });
        }
    }

    render () {
        return this.state.urlVideo ? (
            <Box bg="white">
                <TopNavBar 
                    isLoggedIn={false}
                />
                <Box display="flex">
                    <Box display="flex" width="70%" >
                        <Box width="80%" ml="2">
                            {/* menambahkan komponen Element untuk menandai video */}
                            <Element name="video" className="element">
                                {/* menampilkan video youtube dengan url video yang didapatkan */}
                                <Box width='692px' height= '422px'>
                                    <YouTube videoId={getYoutubeId(this.state.urlVideo)} opts={{width: '692', height: '422', playerVars: {
                                        autoplay: this.state.autoPlay,
                                        controls: this.state.controls,
                                        rel: 0,
                                        showinfo: 0,
                                        loop: this.state.autoPlay
                                    } }} />
                                </Box>
                                <Stack direction='row' mt={2}>
                                    {(() => {
                                    if (this.state.video?.status === "live") {
                                        return <Badge variant='solid' colorScheme='red'>{this.state.video?.status ?? ''}</Badge>;
                                    } else if (this.state.video?.status === "recorded") {
                                        return <Badge variant='solid' colorScheme='green'>{this.state.video?.status ?? ''}</Badge>;
                                    } else {
                                        return <Badge variant='solid' colorScheme='gray'>{this.state.video?.status ?? ''}</Badge>;
                                    }
                                    })()}
                                </Stack>
                                <Tooltip label={this.state.video?.title ?? ''} placement='top'>
                                    <Text fontSize="lg" mt={2} noOfLines={[1]} fontWeight="bold">
                                        {this.state.video?.title ?? ''}
                                    </Text> 
                                </Tooltip>
                            </Element>
                        </Box>
                        <Box width="20%">
                            {/* menambahkan komponen Element untuk menandai produk */}
                            <Element name="products" className="element">
                                {/* menampilkan produk di bawah video dengan menggunakan HorizontalScroll */}
                                <Box overflowY="scroll" alignItems='center' maxHeight="522px">
                                    {this.state.products.map((product) => (
                                        // menampilkan komponen ProductItem untuk setiap produk
                                        <ProductItem key={product._id} product={product} />
                                    ))}
                                </Box>
                            </Element>
                        </Box>
                    </Box>
                    <Box width="30%" boxShadow='xs'>
                        {/* menambahkan komponen Element untuk menandai komentar */}
                        <Element name="comments" className="element">
                            {/* menampilkan komentar di samping video dengan menggunakan Box */}
                            <Box height="300px" minHeight="30%" overflowY="scroll" p={4}>
                                {this.state.comments.length > 0 ? (
                                    // Jika ada komentar, menampilkan setiap komentar dengan map
                                    <CommentList 
                                        comments={this.state.comments}
                                    />
                                ) : (
                                    // Jika tidak ada komentar, menampilkan pesan tidak ada komentar
                                    <Text fontSize="xl" p={4}>
                                        Tidak ada komentar
                                    </Text>
                                )}
                            </Box>
                            {/* menampilkan form input di bawah komentar dengan menggunakan komponen Input, Textarea, dan Button */}
                            <Box height="30%" p={4} borderColor='gray.200' bg="white.100" >
                                <Input name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" mb={2} />
                                <Textarea name="comment" value={this.state.comment} onChange={this.handleChange} placeholder="Comment" mb={2} resize="none" />
                                
                                {this.state.loadingSubmit ? (
                                    <CircularProgress isIndeterminate color="green.300" />
                                ) : (                        
                                    <Button colorScheme="blue" onClick={this.handleSubmit} isLoading={this.state.status === 'loading'}>Submit</Button>
                                )}
                            </Box>
                        </Element>
                    </Box>
                </Box>
            </Box>  
        ) : (
            <NotFound />
        );
    };
};

export default VideoOffer;
