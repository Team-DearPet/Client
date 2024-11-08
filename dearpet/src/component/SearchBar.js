import React from 'react';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ setSearchTerm }) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder="검색어를 입력해주세요."
      onChange={handleSearch}
      InputProps={{
        endAdornment: <SearchIcon />,
      }}
      sx={{
        border: '2px solid #7B52E1',
        width: '30vw',
        borderRadius: '20px',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
    />
  );
};

export default SearchBar;
