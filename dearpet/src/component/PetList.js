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

                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '100%', 
                        marginTop: 2,
                    }}
                >
                    <Avatar 
                        src={photoPreview} 
                        sx={{ width: 100, height: 100, marginLeft: '1vw' }}
                    >
                        {!formData.photo && <PetsIcon sx={{ fontSize: 80 }} />}
                    </Avatar>

                    <Box sx={{ flexGrow: 1, marginLeft: '2vw' }}>
                        <Typography variant="h6">{formData.petname}</Typography>
                        <Typography variant="body2" color="text.secondary" paddingTop='15px'>
                            {formData.species}
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
            </Box>
        </Box>
    );
};

export default PetList;
