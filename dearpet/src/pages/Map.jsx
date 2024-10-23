import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import '../style/Map.css';
import hospitalIconOpen from '../images/hospital.png'; // 진료 중인 병원 아이콘
import hospitalIconClosed from '../images/hospital2.png'; // 진료 중이지 않은 병원 아이콘
import locationIcon from '../images/location.png';
import Header from "../component/Header";

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 37.5665,
  lng: 126.9780
};

function NearbyAnimalHospitals() {
  const [mapCenter, setMapCenter] = useState(center);
  const [userLocation, setUserLocation] = useState(null);
  const [hospitalMarkers, setHospitalMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
      setMapCenter({ lat: latitude, lng: longitude });
      if (isLoaded) {
        fetchNearbyHospitals(latitude, longitude);
      }
    });
  }, [isLoaded]);

  const fetchNearbyHospitals = (lat, lng) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API가 로드되지 않았습니다.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: '5000',
      keyword: 'animal hospital',
      language: 'ko'
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const markersPromises = results.map(place => {
          return new Promise((resolve) => {
            service.getDetails({ placeId: place.place_id, language: 'ko' }, (details, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const isOpen = details.opening_hours ? details.opening_hours.isOpen() : false;
                const translatedAddress = details.vicinity;

                resolve({
                  lat: details.geometry.location.lat(),
                  lng: details.geometry.location.lng(),
                  name: details.name,
                  address: translatedAddress,
                  website: details.website || '#',
                  phone: details.formatted_phone_number || '정보 없음',
                  isOpen: isOpen
                });
              } else {
                resolve(null);
              }
            });
          });
        });

        Promise.all(markersPromises).then(markers => {
          setHospitalMarkers(markers.filter(marker => marker));
        });
      }
    });
  };

  const handleMarkerClick = (hospital) => {
    setActiveMarker(hospital);
    const cardElement = document.getElementById(`hospital-card-${hospital.name}`);
    if (cardElement) {
    cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 해당 카드로 스크롤 이동
  }
  };

  const handleListItemClick = (hospital) => {
    setActiveMarker(hospital);
    setMapCenter({ lat: hospital.lat, lng: hospital.lng });
  };

  return isLoaded ? (
    <div className="page-container">
      <Header />
      <div className="title">
        <h1>내 주변 동물병원 찾기</h1>
      </div>
      <div className="map-list-container">
        <div className="map-box">
          <div className="icon-legend" style={{ position: 'absolute', top: '170px', left: '330px', padding: '10px', border:"none", zIndex: 100 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <img src={hospitalIconOpen} alt="진료 중" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
              <span style={{ fontWeight: 'bold' }}>진료 중</span>
              <img src={hospitalIconClosed} alt="진료 중 아님" style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
              <span style={{ fontWeight: 'bold' }}>진료 마감</span>
            </div>
          </div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={12}
          >
            {userLocation && 
              <Marker
                position={userLocation}
                icon={{
                  url: locationIcon, // 사용자 위치 마커
                  scaledSize: new window.google.maps.Size(30, 30) // 아이콘 크기 조정
                }}
              />
            }
            {hospitalMarkers.map((hospital, index) => (
              <Marker
                key={index}
                position={{ lat: hospital.lat, lng: hospital.lng }}
                onClick={() => handleMarkerClick(hospital)}
                icon={{
                  url: hospital.isOpen ? hospitalIconOpen : hospitalIconClosed, // 진료 상태에 따른 아이콘 선택
                  scaledSize: new window.google.maps.Size(30, 30) // 아이콘 크기 조정
                }}
              />
            ))}

            {activeMarker && (
              <InfoWindow
                position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
              >
                <div style={{ textAlign: 'center', padding: '5px', fontSize: '12px', minWidth: '100px', maxWidth: '150px' }}>
                  <h3 style={{ margin: '0', fontSize: '12px', color: '#333' }}>{activeMarker.name}</h3>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
        <div className="hospital-list">
          {hospitalMarkers.map((hospital, index) => (
            <div 
              key={index} 
              id={`hospital-card-${hospital.name}`} 
              className={`hospital-card ${activeMarker?.name === hospital.name ? 'active' : ''}`} 
              onClick={() => handleListItemClick(hospital)}
            >
              {/* 아이콘과 병원이름을 나란히 배치 */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src={hospital.isOpen ? hospitalIconOpen : hospitalIconClosed} 
                  alt="병원 아이콘" 
                  style={{ width: '30px', height: '30px', marginRight: '10px' }} 
                />
                <h3 style={{fontWeight:"bold"}}>{hospital.name}</h3>
              </div>
              <p style={{fontWeight:"bold"}}>주소: {hospital.address}</p>
              <p style={{fontWeight:"bold"}}>전화번호: {hospital.phone}</p>
              {hospital.website !== '#' && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#AC92ED',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '5px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    홈페이지 바로가기
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : <div>Loading...</div>;
}

export default React.memo(NearbyAnimalHospitals);
