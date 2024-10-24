import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Tab, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import items from '../data/items';
import SearchBar from '../component/SearchBar';

const Category = () => {
  const [value, setValue] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredItems = (categoryIndex) =>
    items[categoryIndex].filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const renderItems = (categoryIndex) => (
    <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
      {filteredItems(categoryIndex).map((item, index) => (
        <Link to='/detail'>
        <Card
          key={index}
          sx={{
            width: 200,
            height: 350,
            borderRadius: 8,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            padding: 2,
          }}
        >
          <CardMedia
            component="img"
            height="180"
            image={item.image}
            alt={item.title}
            sx={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              objectFit: 'contain',
            }}
          />
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 2 }}>
            <Typography
              component="p"
              sx={{
                textAlign: 'left',
                color: "#d9d9d9",
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: '100%',
              }}
            >
              {item.brand}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                textAlign: 'left',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                width: '100%',
              }}
            >
              {item.title}
            </Typography>
            <Box sx={{ borderTop: '1px solid #ddd', width: '100%', marginY: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: '600',
                textAlign: 'left',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: '100%',
              }}
            >
              {item.price}
            </Typography>
          </CardContent>
        </Card>
        </Link>
      ))}
    </Box>
  );

  return (
    <TabContext value={value}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '80%',
          margin: '0 auto',
          marginTop: 2,
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flex: 1,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <TabList onChange={handleChange} aria-label="Category tabs" textColor="secondary" indicatorColor="secondary">
            <Tab sx={{fontSize: '1.1rem'}} label="패션" value="1" />
            <Tab sx={{fontSize: '1.1rem'}} label="사료" value="2" />
            <Tab sx={{fontSize: '1.1rem'}} label="장난감" value="3" />
          </TabList>
        </Box>

        <Box>
          <SearchBar setSearchTerm={setSearchTerm} />
        </Box>
      </Box>

      <TabPanel value="1">{renderItems(1)}</TabPanel>
      <TabPanel value="2">{renderItems(2)}</TabPanel>
      <TabPanel value="3">{renderItems(3)}</TabPanel>
    </TabContext>
  );
};

export default Category;