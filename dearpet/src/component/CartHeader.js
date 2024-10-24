import React from 'react';
import { Box, Grid2, Checkbox, Typography, Button } from '@mui/material';

const CartHeader = ({ items, handleSelectAll, handleDeleteSelected }) => {
    return (
        <Grid2 container alignItems="center" sx={{ mb: 2 }}>
            <Grid2 item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                    checked={items.every((item) => item.checked)}
                    indeterminate={
                        items.some((item) => item.checked) && !items.every((item) => item.checked)
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <Typography variant="subtitle1">
                    전체 선택({items.filter((item) => item.checked).length}/{items.length})
                </Typography>
            </Grid2>
            <Grid2 item xs={6} sx={{ textAlign: 'right' }}>
                <Button 
                    onClick={handleDeleteSelected} 
                    sx={{ 
                        color: 'black', 
                        marginLeft: 100, 
                        backgroundColor: 'transparent', 
                        boxShadow: 'none', 
                        '&:hover': { backgroundColor: 'transparent' }, 
                        '&:active': { backgroundColor: 'transparent' }, 
                        '&:focus': { backgroundColor: 'transparent' } 
                    }}
                >
                    선택 삭제
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default CartHeader;
