import React, { useRef, useState } from "react";
import { Container, Typography, Box, IconButton, Card, CardContent, CardMedia, Grid, Modal } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import '../style/Emergency.css';
import SearchBar from "../component/SearchBar";
import videoData from '../data/videoData';
import emergencyGuides from '../data/emergencyGuides';
import emergencyDefault from '../images/emergencyDefault.png'
import Footer from "../component/Footer";
import CloseIcon from '@mui/icons-material/Close';

export default function Emergency() {
    const [open, setOpen] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleOpen = (guide) => {
        setSelectedGuide(guide);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);    };
    const scrollRef = useRef(null);
    const [startIndex, setStartIndex] = useState(0);

    const scroll = (direction) => {
        const newStartIndex = direction === 'left' 
            ? Math.max(startIndex - 1, 0) 
            : Math.min(startIndex + 1, videoData.length - 4);
        
        setStartIndex(newStartIndex);
    };

    const filteredVideos = videoData.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredGuides = emergencyGuides.filter((guide) =>
        guide.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
        <Container maxWidth={false} style={{ textAlign: 'center', padding: '20px' }}>
            <h1>반려동물 응급처치 가이드</h1>
            <div className="search">
                <SearchBar setSearchTerm={setSearchTerm}/>
            </div>
            <Box 
                sx={{ 
                    backgroundColor:"#F7F4FD",
                    position: 'relative', 
                    display: 'flex', 
                    alignItems: 'center', 
                    border: '2px solid #E0D7F8', 
                    borderRadius: '10px', 
                    overflow: 'hidden', 
                    width: '80%',
                    maxWidth: '1300px',
                    margin: '0 auto', 
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '40px',
                    paddingRight: '40px',
                }}
            >
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: '10px', 
                        left: '10px', 
                        zIndex: 1, 
                        padding: '5px 10px', 
                        backgroundColor: '#F7F4FD',
                        borderRadius: '5px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                    }}
                >
                    <Typography variant="h6" style={{fontWeight:"bold"}}>
                        반려동물 응급처치
                    </Typography>
                </Box>
                {filteredVideos.length === 0 ? (
                        <Typography variant="h6" sx={{ margin: 'auto', padding: '110px' }}>
                            검색 결과가 없습니다.
                        </Typography>
                    ) : (
                <>
                <IconButton 
                    onClick={() => scroll('left')} 
                    disabled={startIndex === 0} 
                    style={{ position: 'absolute', left: '2px', zIndex: 1 }} 
                >
                    <ChevronLeft />
                </IconButton>
                <Box 
                    ref={scrollRef} 
                    sx={{ 
                        display: 'flex', 
                        scrollBehavior: 'smooth', 
                        width: '100%', 
                        paddingTop: '40px', 
                    }}
                >
                    {filteredVideos.slice(startIndex, startIndex + 4).map((video, index) => ( 
                        <Box 
                            key={index} 
                            sx={{ 
                                marginTop: '20px',
                                marginRight: '15px',
                                marginLeft: '15px', 
                                cursor: 'pointer', 
                                width: '300px', 
                                height: 'auto',
                                transition: 'transform 0.3s ease, background-color 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)', // 크기 확대
                                },
                            }} 
                            onClick={() => window.open(video.link, '_blank')}
                        >
                            <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                style={{ width: '250px', height: 'auto', borderRadius: '10px' }} 
                            />
                            <Typography variant="subtitle1" style={{ marginTop: '5px', fontWeight: 'bold' }}>
                                {video.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <IconButton 
                    onClick={() => scroll('right')} 
                    disabled={startIndex >= videoData.length - 4}
                    style={{ position: 'absolute', right: '1px', zIndex: 1 }} 
                >
                    <ChevronRight />
                </IconButton>
            </>
            )}
            </Box>
        </Container>
        <Container maxWidth={false} style={{ textAlign: 'center', padding: '20px' }}>
            <Box
                sx={{
                    backgroundColor: "#F7F4FD",
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    border: '2px solid #E0D7F8',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    width: '80%',
                    maxWidth: '1300px',
                    margin: '0 auto',
                    paddingTop: '10px',
                    paddingBottom: '30px',
                    paddingLeft: '40px',
                    paddingRight: '40px',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex: 1,
                        padding: '5px 10px',
                        backgroundColor: '#F7F4FD',
                        borderRadius: '5px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                    }}
                >
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        반려동물 질병정보
                    </Typography>
                </Box>
                {filteredGuides.length === 0 ? (
                        <Typography variant="h6" sx={{ margin: 'auto', padding: '110px' }}>
                            검색 결과가 없습니다.
                        </Typography>
                    ) : (
                <Grid container spacing={3} sx={{ paddingTop: '60px', justifyContent: 'center' }}>
                    {filteredGuides.map((guide, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    transition: 'transform 0.3s ease, background-color 0.3s ease', 
                                    '&:hover': {
                                        backgroundColor: 'rgba(211, 211, 211, 0.3)', 
                                        cursor: 'pointer',
                                        transform: 'scale(1.05)', 
                                    },
                                }}
                                onClick={() => handleOpen(guide)}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={guide.image}
                                    alt={guide.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {guide.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {guide.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                )}
            </Box>
        </Container>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#F7F4FD', 
                    border: '2px solid #E0D7F8', 
                    boxShadow: 24,
                    borderRadius: '10px', 
                    p: 4,
                }}
            >
                <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                {selectedGuide && (
                    <>
                        <Typography id="modal-title" variant="h6" component="h2">
                            {selectedGuide.title}
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            {selectedGuide.detail}
                        </Typography>
                    </>
                )}
            </Box>
        </Modal>
        <Footer/>
        </div>
    );
}