import React, { useEffect, useRef, useState } from 'react'
import { LoadScript, GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api'
import Button from '../../node_modules/react-bootstrap/esm/Button';
import LoadingBox from '../components/LoadingBox';
import { useDispatch } from 'react-redux';
import axios from '../../node_modules/axios/index';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';

const libs = ['places']
const defaultlocation = { lat: 10.81552882601105, lng: 106.70693773545536 }

export default function MapScreen(props) {
    const [googleAPIKey, setGoogleAPIKey] = useState('');
    // map position
    const [center, setCenter] = useState(defaultlocation);
    // marker
    const [location, setLocation] = useState(center);
    // 
    const mapref = useRef(null);
    const placeref = useRef(null);
    const markerref = useRef(null);

    const dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios('/api/config/google');
            setGoogleAPIKey(data);
            getUserCurrentLocation();
        }
        fetch();
    }, [])

    // onLoad
    const onLoad = (map) => {
        mapref.current = map;
    }
    const onLoadMarker = (marker) => {
        markerref.current = marker;
    }
    const onLoadPlace = (places) => {
        placeref.current = places;
    }

    // onIdle
    const onIdle = () => {
        setLocation({
            lat: mapref.current.center.lat(),
            lng: mapref.current.center.lng(),
        })
    }
    const onPlacesChange = () => {
        const places = placeref.current.getPlaces()[0].geometry.location;
        setCenter({ lat: places.lat(), lng: places.lng() });
        setLocation({ lat: places.lat(), lng: places.lng() });
    }

    const onConfirm = () => {
        const places = placeref.current.getPlaces();
        if (places && places.length === 1) {
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
            alert('location added');
            props.history.push('/shipping');
        } else {
            alert('location not added');
        }
    }
    const getUserCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('geolocation not supported or you need to turn on location')
        } else {
            navigator.geolocation.getCurrentPosition((posistion) => {
                setCenter({
                    lat: posistion.coords.latitude,
                    lng: posistion.coords.longitude
                });
                setLocation({
                    lat: posistion.coords.latitude,
                    lng: posistion.coords.longitude
                });
            })
        }
    }
    return (
        googleAPIKey
            ? (<>
                <div className="full-containter">
                    <h1>HI</h1>
                    <LoadScript libraries={libs} googleMapsApiKey={googleAPIKey}>
                        <GoogleMap id="sample-map" mapContainerStyle={{ height: '100%', width: '100%' }} center={center} zoom={15} onLoad={onLoad} onIdle={onIdle}>
                            <StandaloneSearchBox onLoad={onLoadPlace} onPlacesChange={onPlacesChange}>
                                <div className="map-input-box">
                                    <input type="text" placeholder="Enter The Address"></input>
                                    <Button variant="primary" onClick={onConfirm}>Confirm</Button>
                                </div>
                            </StandaloneSearchBox>
                            <Marker posistion={location} onLoad={onLoadMarker}></Marker>
                        </GoogleMap>
                    </LoadScript>
                </div>
            </>
            )
            : (<LoadingBox />)
    );
}
