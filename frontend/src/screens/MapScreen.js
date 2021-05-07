import React, { useEffect, useRef, useState } from 'react'
import { LoadScript, GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api'
import Button from '../../node_modules/react-bootstrap/esm/Button';
import LoadingBox from '../components/LoadingBox';
import { useDispatch } from 'react-redux';
import axios from '../../node_modules/axios/index';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';

const libs = ['places']
const defaultLocation = { lat: 10.81552882601105, lng: 106.70693773545536 }

export default function MapScreen(props) {
    const [googleApiKey, setGoogleApiKey] = useState('');
    // map position
    const [center, setCenter] = useState(defaultLocation);
    // marker
    const [location, setLocation] = useState(center);
    // 
    const mapRef = useRef(null);
    const placeRef = useRef(null);
    const markerRef = useRef(null);

    const dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {
          const { data } = await axios('/api/config/google');
          setGoogleApiKey(data);
          getUserCurrentLocation();
        };
        fetch();
      }, []);

    // onLoad
    const onLoad = (map) => {
        mapRef.current = map;
      };
    
      const onMarkerLoad = (marker) => {
        markerRef.current = marker;
      };
      const onLoadPlaces = (place) => {
        placeRef.current = place;
      };

    // onIdle
    const onIdle = () => {
        setLocation({
          lat: mapRef.current.center.lat(),
          lng: mapRef.current.center.lng(),
        });
      };
      const onPlacesChanged = () => {
        const place = placeRef.current.getPlaces()[0].geometry.location;
        setCenter({ lat: place.lat(), lng: place.lng() });
        setLocation({ lat: place.lat(), lng: place.lng() });
      };

      const onConfirm = () => {
        const places = placeRef.current.getPlaces();
        if (places && places.length === 1) {
          // dispatch select action
          dispatch({
            type: USER_ADDRESS_MAP_CONFIRM,
            payload: {
              lat: location.lat,
              lng: location.lng,
              address: places[0].formatted_address,
              name: places[0].name,
              vicinity: places[0].vicinity,
              googleAddressId: places[0].id,
            },
          });
          alert('location selected successfully.');
          props.history.push('/shipping');
        } else {
          alert('Please enter your address');
        }
      };
      const getUserCurrentLocation = () => {
        if (!navigator.geolocation) {
          alert('Geolocation os not supported by this browser');
        } else {
          navigator.geolocation.getCurrentPosition((position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }
      };
    return (
        googleApiKey
            ? (<>
                <div className="full-containter">
                    <LoadScript 
                    libraries={libs} 
                    googleMapsApiKey={googleApiKey}>
                        <GoogleMap 
                        id="sample-map" 
                        style
                        mapContainerStyle={{ height: 'calc(100vh - 120px)', width: '100vw', marginTop:'120px' }} 
                        center={center} 
                        zoom={15} 
                        onLoad={onLoad}
                        onIdle={onIdle}>
                            <StandaloneSearchBox 
                            onLoad={onLoadPlaces} 
                            onPlacesChange={onPlacesChanged}>
                                <div className="map-input-box">
                                    <input type="text" placeholder="Enter The Address"></input>
                                    <Button variant="primary" onClick={onConfirm}>Confirm</Button>
                                </div>
                            </StandaloneSearchBox>
                            <Marker 
                            posistion={location} 
                            onLoad={onMarkerLoad}></Marker>
                        </GoogleMap>
                    </LoadScript>
                </div>
            </>
            )
            : (<LoadingBox />)
    );
}
