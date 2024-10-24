import React, { useRef, useState } from "react";
import { Container, Typography, Box, IconButton, Card, CardContent, CardMedia, Grid, Modal  } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import '../style/Emergency.css';
import Header from "../component/Header";
import SearchBar from "../component/SearchBar";

const videoData = [
    {
        title: "반려동물 응급처치 - 심폐소생술",
        thumbnail: "https://img.youtube.com/vi/L1ZrjXcF4tI/0.jpg",
        link: "https://www.youtube.com/watch?v=L1ZrjXcF4tI"
    },
    {
        title: "반려동물 응급처치 - 출혈",
        thumbnail: "https://img.youtube.com/vi/0aHwCOuEzKo/0.jpg",
        link: "https://www.youtube.com/watch?v=0aHwCOuEzKo"
    },
    {
        title: "반려동물 응급처치 - 기도 막힘",
        thumbnail: "https://img.youtube.com/vi/mcZbfXyy25M/0.jpg",
        link: "https://www.youtube.com/watch?v=mcZbfXyy25M"                      
    },
    {
        title: "반려동물 응급처치 - 경련",
        thumbnail: "https://img.youtube.com/vi/Zs9yR8l8DDo/0.jpg",
        link: "https://www.youtube.com/watch?v=Zs9yR8l8DDo"
    },
    {
        title: "반려동물 응급처치 - 화상",
        thumbnail: "https://img.youtube.com/vi/Q7TtO3AzLfg/0.jpg",
        link: "https://www.youtube.com/watch?v=Q7TtO3AzLfg"
    },
    {
        title: "반려동물 응급처치 - 중독",
        thumbnail: "https://img.youtube.com/vi/nDtiBN_RnA4/0.jpg",
        link: "https://www.youtube.com/watch?v=nDtiBN_RnA4"
    },
];

const emergencyGuides = [
    {
        title: "심폐소생술",
        description: "반려동물의 심장과 호흡이 멈췄을 때, 어떻게 심폐소생술을 할 수 있는지 알아보세요.",
        image: "https://img.youtube.com/vi/L1ZrjXcF4tI/0.jpg",
        detail: "심폐소생술은 심장이 멈춘 반려동물에게 심장 마사지를 통해 혈액순환을 유지하고, 인공호흡을 통해 산소를 공급하는 중요한 응급처치입니다."
    },
    {
        title: "출혈 응급처치",
        description: "출혈이 발생했을 때 신속히 대처하는 방법을 배워보세요.",
        image: "https://img.youtube.com/vi/0aHwCOuEzKo/0.jpg",
        detail: "출혈이 있을 경우 상처 부위를 압박해 출혈을 멈추고, 반려동물이 출혈로 인해 쇼크 상태에 빠지지 않도록 신속하게 응급처치를 해야 합니다."
    },
    {
        title: "기도 막힘",
        description: "반려동물이 숨을 쉬지 못할 때 기도를 확보하는 방법을 안내합니다.",
        image: "https://img.youtube.com/vi/mcZbfXyy25M/0.jpg",
        detail: "기도가 막힌 반려동물에게는 Heimlich법을 통해 이물질을 제거해 주거나, 기도가 막히지 않도록 조치하는 것이 중요합니다."
    },
    {
        title: "경련 대처법",
        description: "반려동물이 경련을 일으켰을 때의 대처 방법을 알아보세요.",
        image: "https://img.youtube.com/vi/Zs9yR8l8DDo/0.jpg",
        detail: "반려동물이 경련을 일으킬 때는 주변 환경을 안전하게 하고, 경련이 멈춘 후 동물병원에 데려가 신속히 치료를 받는 것이 중요합니다."
    },
    {
        title: "화상 응급처치",
        description: "화상을 입은 반려동물에게 적절한 응급처치를 하는 방법입니다.",
        image: "https://img.youtube.com/vi/Q7TtO3AzLfg/0.jpg",
        detail: "화상을 입은 반려동물에게는 즉시 찬물로 상처를 식히고, 심한 경우 수의사의 진료를 받도록 해야 합니다."
    },
    {
        title: "중독 대처법",
        description: "반려동물이 중독되었을 때 신속히 대처하는 방법을 배워보세요.",
        image: "https://img.youtube.com/vi/nDtiBN_RnA4/0.jpg",
        detail: "중독 의심 상황에서는 즉시 동물병원에 연락하고, 중독 원인을 제거하며 구토 유도 방법 등을 수의사의 조언을 받아 신속히 처리해야 합니다."
    }
];

export default function Emergency() {
    const [open, setOpen] = useState(false); // 모달 열림 상태 관리
    const [selectedGuide, setSelectedGuide] = useState(null); // 선택된 가이드 저장

    const handleOpen = (guide) => {
        setSelectedGuide(guide);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const scrollRef = useRef(null);
    const [startIndex, setStartIndex] = useState(0); // 현재 보이는 시작 인덱스

    const scroll = (direction) => {
        const newStartIndex = direction === 'left' 
            ? Math.max(startIndex - 1, 0) 
            : Math.min(startIndex + 1, videoData.length - 4); // 인덱스 범위 조정
        
        setStartIndex(newStartIndex); // 새로운 인덱스로 업데이트
    };

    return (
        <div>
        <Header/>
        <Container maxWidth={false} style={{ textAlign: 'center', padding: '20px' }}>
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
                    {videoData.slice(startIndex, startIndex + 4).map((video, index) => ( // 현재 보이는 인덱스 범위만 표시
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
                        반려동물 응급처치
                    </Typography>
                </Box>

                {/* 응급처치 가이드 카드 목록 */}
                <Grid container spacing={3} sx={{ paddingTop: '60px' }}>
                    {emergencyGuides.map((guide, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ height: '100%' }} onClick={() => handleOpen(guide)}>
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
