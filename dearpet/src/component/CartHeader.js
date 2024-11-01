import React from 'react';
import { Box, Checkbox, Typography, Button } from '@mui/material';

const CartHeader = ({ items, handleSelectAll, handleDeleteSelected }) => {
    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'space-between', // 양쪽 끝에 요소 배치
                alignItems: 'center',
                mb: 2,
                padding: '0 10px', // 좌우 여백 추가
                width: '100%', // 전체 너비 사용
                minWidth: '300px', // 최소 너비 설정
            }}
        >
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
            <Checkbox
                checked={items.length > 0 && items.every((item) => item.checked)}
                indeterminate={
                    items.some((item) => item.checked) && !items.every((item) => item.checked)
                }
                onChange={(e) => handleSelectAll(e.target.checked)}
                sx={{
                    color: '#6A47B1',
                    '&.Mui-checked': {
                        color: '#6A47B1',
                    },
                    '&.MuiCheckbox-indeterminate': {
                        color: '#6A47B1',
                    },
                }}
            />
                <Typography 
                    variant="subtitle1"
                    sx={{ 
                        fontSize: '1.1rem',
                        whiteSpace: 'nowrap' // 텍스트 줄바꿈 방지
                    }}
                >
                    전체 선택({items.filter((item) => item.checked).length}/{items.length})
                </Typography>
            </Box>
            <Button 
                onClick={handleDeleteSelected} 
                sx={{ 
                    paddingRight:'30px',
                    color: 'black', 
                    fontSize: '1.1rem',
                    backgroundColor: 'transparent', 
                    boxShadow: 'none', 
                    '&:hover': { 
                        backgroundColor: 'transparent' 
                    }, 
                    '&:active': { 
                        backgroundColor: 'transparent' 
                    }, 
                    '&:focus': { 
                        backgroundColor: 'transparent' 
                    } 
                }}
            >
                선택 삭제
            </Button>
        </Box>
    );
};

export default CartHeader;
