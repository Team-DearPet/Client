import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, OverlayView ,InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import '../style/Map.css';
import hospitalIconOpen from '../images/hospital.png'; 
import hospitalIconClosed from '../images/hospital2.png'; 
import locationIcon from '../images/location.png';
import Header from "../component/Header";
import { blue } from "@mui/material/colors";

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
                const openingHours = details.opening_hours ? details.opening_hours.weekday_text : []; // 영업시간 가져오기
  
                resolve({
                  lat: details.geometry.location.lat(),
                  lng: details.geometry.location.lng(),
                  name: details.name,
                  address: translatedAddress,
                  website: details.website || '#',
                  phone: details.formatted_phone_number || '정보 없음',
                  isOpen: isOpen,
                  openingHours: openingHours || [] // 영업시간이 undefined일 경우 빈 배열로 초기화
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
    cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
          <div className="icon-legend" style={{ position: 'absolute', top: '170px', left: '370px', padding: '10px', border:"none", zIndex: 100 }}>
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
                  url: locationIcon,
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
              />
            }
            {hospitalMarkers.map((hospital, index) => (
              <Marker
                key={index}
                position={{ lat: hospital.lat, lng: hospital.lng }}
                onClick={() => handleMarkerClick(hospital)}
                icon={{
                  url: hospital.isOpen ? hospitalIconOpen : hospitalIconClosed, 
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
              />
            ))}

            {activeMarker && (
              <OverlayView
                position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} 
              >
                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    border: '2px solid blue',
                    padding: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px',
                    textAlign: 'center',
                    transform: 'translate(-50%, -100%)',
                    position: 'relative',
                    bottom: '30px',
                    whiteSpace: 'nowrap',
                    maxWidth: '300px', 
                  }}
                >
                  <h3 style={{ margin: '0', fontSize: '15px', color: '#333', padding: '5px' }}>{activeMarker.name}</h3>
                </div>
                </OverlayView>
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
              {hospital.openingHours.length > 0 && (
                <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
                  <p>영업시간 정보</p>
                  <ul style={{ paddingLeft: '20px' }}>
                    {hospital.openingHours.map((hour, i) => (
                      <li key={i}>{hour}</li>
                    ))}
                  </ul>
                </div>
              )}
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
