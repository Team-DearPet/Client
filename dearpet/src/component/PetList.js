import { Box, Avatar, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PetList = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]); // 기본값으로 빈 배열 설정
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('https://www.carepet.site/api/pets', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setPets(Array.isArray(response.data) ? response.data : []); // 응답 데이터가 배열인지 확인
            } catch (error) {
                console.error('Error fetching pets:', error);
                setPets([]); // 오류 발생 시 빈 배열로 설정
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const handleMypet = () => {
        navigate('/mypet');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5vh 0',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 3,
                    borderRadius: 2,
                    maxWidth: 800,
                    width: '100%',
                    bgcolor: '#F7F4FD',
                    position: 'relative', // relative로 설정
                }}
            >
                <Typography 
                    variant="h6" 
                    sx={{ fontWeight: 'bold', justifyContent:"flex-start"}}
                >
                    마이펫
                </Typography>

                {loading ? (
                    <Typography>로딩 중...</Typography>
                ) : (
                    pets.map((pet) => (
                        <Box 
                            key={pet.petId} 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                width: '100%', 
                                marginTop: 2,
                            }}
                        >
                            <Avatar 
                                src={pet.photo || ''} 
                                sx={{ width: 100, height: 100, marginLeft: '1vw' }}
                            >
                                {!pet.photo && <PetsIcon sx={{ fontSize: 80 }} />}
                            </Avatar>

                            <Box sx={{ flexGrow: 1, marginLeft: '2vw' }}>
                                <Typography variant="h6">{pet.name}</Typography>
                                <Typography variant="body2" color="text.secondary" paddingTop='15px'>
                                    {pet.species}
                                </Typography>
                            </Box>
                        </Box>
                    ))
                )}
                {/* 버튼을 감싸는 Box 추가 */}
                <Box
                    sx={{
                        position: 'absolute', // absolute로 설정
                        top: '50%', // 수직 중앙 정렬
                        right: '2.5vw', // 오른쪽 여백
                        transform: 'translateY(-50%)', // 수직 중앙 정렬을 위한 변환
                    }}
                >
                    <Button 
                        onClick={handleMypet} 
                        sx={{
                            width: 48,
                            border: '1px solid #AC92ED',
                            borderRadius: '50px',  
                            bgcolor: 'white', 
                            color: '#AC92ED', 
                            '&:hover': { bgcolor: '#E0D7F8' } 
                        }}
                    >
                        편집
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default PetList;
