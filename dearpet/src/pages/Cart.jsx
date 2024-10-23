import React, { useState } from 'react';
import {
	Box,
	Grid,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Checkbox,
	IconButton,
	Button,
	Divider,
    Container,
    Grid2
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import petfoodImage from '../images/petfood.png';
import Header from '../component/Header';
import Footer from '../component/Footer';
import BuyFooter from '../component/BuyFooter';

const Cart = () => {
	const [items, setItems] = useState([
		{
			id: 1,
			name: '[하림펫푸드] 강아지 사료',
			option: '500g',
			price: 15000,
			quantity: 2,
			image: petfoodImage,
			checked: false
		},
		{
			id: 2,
			name: '[하림펫푸드] 강아지 사료',
			option: '500g',
			price: 15000,
			quantity: 2,
			image: petfoodImage,
			checked: false
		},
		{
			id: 3,
			name: '[하림펫푸드] 강아지 사료',
			option: '500g',
			price: 15000,
			quantity: 2,
			image: petfoodImage,
			checked: false
		},
		{
			id: 5,
			name: '[하림펫푸드] 강아지 사료',
			option: '500g',
			price: 15000,
			quantity: 2,
			image: petfoodImage,
			checked: false
		},
		{
			id: 6,
			name: '[하림펫푸드] 강아지 사료',
			option: '500g',
			price: 15000,
			quantity: 2,
			image: petfoodImage,
			checked: false
		}
	]);

	const handleQuantityChange = (id, delta) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
			)
		);
	};

	const handleCheckboxChange = (id) => {
		setItems((prevItems) =>
			prevItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
		);
	};

	const handleDeleteSelected = () => {
		setItems((prevItems) => prevItems.filter((item) => !item.checked));
	};

	const handleSelectAll = (checked) => {
		setItems((prevItems) =>
			prevItems.map((item) => ({ ...item, checked }))
		);
	};

	return (
        <div>
        <Header />
        <Container>
            <Box sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    장바구니
                </Typography>
                <Grid2 container alignItems="center" sx={{ mb: 2 }}>
                    <Grid2 item xs>
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
                    <Grid2 item>
                        <Button onClick={handleDeleteSelected}>선택 삭제</Button>
                    </Grid2>
                </Grid2>
                {items.map((item) => (
                    <Card key={item.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
                        <CardContent 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            backgroundColor: '#F7F4FD' 
                            }}>
                            <Checkbox
                                checked={item.checked}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            <CardMedia
                                component="img"
                                image={item.image}
                                alt={item.name}
                                sx={{ width: 100, height: 100, mr: 2 }}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1">{item.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    상품옵션: {item.option}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    상품금액: {item.price.toLocaleString()}원
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2">수량</Typography>
                                <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="body2">{item.quantity}</Typography>
                                <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            <Typography variant="body2" sx={{ ml: 3 }}>
                                주문금액: {(item.price * item.quantity).toLocaleString()}원
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
                
        </Container>
        <BuyFooter />
        {/* <Footer /> */}
        </div>
	);
};

export default Cart;
