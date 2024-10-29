import { Box, Avatar, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PetList = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]); // 반려동물 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/pets', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                console.log(response.data); // API 응답 로그
                setPets(response.data); // 가져온 반려동물 목록을 상태로 설정
            } catch (error) {
                console.error('Error fetching pets:', error);
                setError('반려동물 목록을 가져오는 데 오류가 발생했습니다.'); // 에러 메시지 설정
            } finally {
                setLoading(false); // 로딩 완료
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
                marginTop: '5vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: 3,
                    borderRadius: 2,
                    maxWidth: 800,
                    width: '100%',
                    bgcolor: '#F7F4FD',
                    gap: 2,
                }}
            >
                <Typography 
                    variant="h6" 
                    sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }}
                >
                    마이펫
                </Typography>

                {loading ? (
                    <Typography>로딩 중...</Typography> // 로딩 중 표시
                ) : error ? (
                    <Typography color="error">{error}</Typography> // 에러 메시지 표시
                ) : pets.length > 0 ? (
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

                            <Button 
                                onClick={handleMypet} 
                                sx={{
                                    marginRight: '1vw', 
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
                    ))
                ) : (
                    <Typography>등록된 반려동물이 없습니다.</Typography> // 반려동물이 없는 경우 표시
                )}
            </Box>
        </Box>
    );
};

export default PetList;
