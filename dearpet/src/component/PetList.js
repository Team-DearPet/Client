import { Box, Avatar, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';

const PetList = () => {
    const navigate = useNavigate();
    const [formData] = useState({
        photo: '',
        petname: '감자',
        species: '진돗개',
    });
    const [photoPreview] = useState(null);

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
                    bgcolor: 'background.paper',
                    gap: 2,
                }}
            >
                <Typography 
                    variant="h6" 
                    sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }}
                >
                    마이펫
                </Typography>

                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '100%', 
                        marginTop: 2, // 마이펫 텍스트와의 간격
                    }}
                >
                    <Avatar 
                        src={photoPreview} 
                        sx={{ width: 100, height: 100, marginRight: 2 }}
                    >
                        {!formData.photo && <PetsIcon sx={{ fontSize: 80 }} />}
                    </Avatar>

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{formData.petname}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formData.species}
                        </Typography>
                    </Box>

                    <Button 
                        onClick={handleMypet} 
                        sx={{ 
                            width: 48,
                            borderRadius: '50px',  
                            bgcolor: '#d9d9d9', 
                            color: 'white', 
                            '&:hover': { bgcolor: '#9f9f9f' },
                            marginLeft: 2,
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
