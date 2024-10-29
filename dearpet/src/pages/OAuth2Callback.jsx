import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth2Callback({ setIsLoggedIn, setUserId }) {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', true);
      setIsLoggedIn(true);

      // 토큰에서 사용자 이름 추출 (서버에서 보낸 사용자 정보로 처리 필요)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      const username = decodedToken.sub;
      localStorage.setItem('userId', username);
      setUserId(username);
      
      navigate("/");
    } else {
      console.error('토큰이 없습니다.');
      navigate("/login");
    }
  }, [navigate, setIsLoggedIn, setUserId]);

  return <div>소셜 로그인 중...</div>;
}