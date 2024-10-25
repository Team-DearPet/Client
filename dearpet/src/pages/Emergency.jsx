import React, { useRef, useState } from "react";
import { Container, Typography, Box, IconButton, Card, CardContent, CardMedia, Grid, Modal  } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import '../style/Emergency.css';
import Header from "../component/Header";
import SearchBar from "../component/SearchBar";
import videoData from '../data/videoData';
import emergencyGuides from '../data/emergencyGuides';
import emergencyDefault from '../images/emergencyDefault.png'

export default function Emergency() {
    const [open, setOpen] = useState(false); // 모달 열림 상태 관리
    const [selectedGuide, setSelectedGuide] = useState(null); // 선택된 가이드 저장
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleOpen = (guide) => {
        setSelectedGuide(guide);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);    };
    const scrollRef = useRef(null);
    const [startIndex, setStartIndex] = useState(0); // 현재 보이는 시작 인덱스

    const scroll = (direction) => {
        const newStartIndex = direction === 'left' 
            ? Math.max(startIndex - 1, 0) 
            : Math.min(startIndex + 1, videoData.length - 4); // 인덱스 범위 조정
        
        setStartIndex(newStartIndex); // 새로운 인덱스로 업데이트
    };

    const filteredVideos = videoData.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredGuides = emergencyGuides.filter((guide) =>
        guide.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>

        <Header/>
        <Container maxWidth={false} style={{ textAlign: 'center', padding: '20px' }}>
            <h1>반려동물 응급처치 가이드</h1>
            <div className="search">
            <SearchBar/>
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
                    width: '80%', // 박스 너비 설정
                    maxWidth: '1300px', // 최대 너비 조정
                    margin: '0 auto', // 중앙 정렬
                    padding: '10px' // 내부 여백 추가
                }}
            >
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: '10px', 
                        left: '10px', 
                        zIndex: 1, 
                        padding: '5px 10px', 
                        backgroundColor: '#F7F4FD', // 배경색 추가
                        borderRadius: '5px' // 둥근 모서리 추가
                    }}
                >
                    <Typography variant="h6" style={{fontWeight:"bold"}}>
                        반려동물 건강정보
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
                    disabled={startIndex === 0} // 시작 인덱스가 0일 때 비활성화
                    style={{ position: 'absolute', left: '2px', zIndex: 1 }} // 왼쪽 화살표 위치 조정
                >
                    <ChevronLeft />
                </IconButton>
                <Box 
                    ref={scrollRef} 
                    sx={{ 
                        display: 'flex', 
                        scrollBehavior: 'smooth', 
                        width: '100%', // 부모 박스 크기 설정
                        paddingTop: '40px', // 제목 아래 여백 추가
                    }}
                >
                    {filteredVideos.slice(startIndex, startIndex + 4).map((video, index) => ( // 현재 보이는 인덱스 범위만 표시
                        <Box 
                            key={index} 
                            sx={{ 
                                marginTop: '20px',
                                marginRight: '15px',
                                marginLeft: '15px', 
                                cursor: 'pointer', 
                                width: '300px', // 썸네일 박스 크기 조정
                                height: 'auto'
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
                    disabled={startIndex >= videoData.length - 4} // 마지막 인덱스에서 비활성화
                    style={{ position: 'absolute', right: '1px', zIndex: 1 }} // 오른쪽 화살표 위치 조정
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
                    padding: '10px'
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
                        borderRadius: '5px'
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
                <Grid container spacing={3} sx={{ paddingTop: '60px' }}>
                    {filteredGuides.map((guide, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ height: '100%' }} onClick={() => handleOpen(guide)}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={emergencyDefault}
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
                    bgcolor: '#F7F4FD', // Set the background color to match your theme
                    border: '2px solid #E0D7F8', // Border color to match your theme
                    boxShadow: 24,
                    borderRadius: '10px', // Add rounded corners
                    p: 4,
                }}
            >
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
        </div>
    );
}