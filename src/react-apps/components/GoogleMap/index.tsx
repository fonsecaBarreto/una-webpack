import * as React from 'react';
import "./style.css"
import { GoogleMap, useJsApiLoader, Marker, StreetViewPanorama } from '@react-google-maps/api';
/* import `` */

export const GoogleMapAdapter: React.FunctionComponent<any> = ({ coordinates, googleMapsApiKey }) =>{

    const center: any = React.useMemo(()=>coordinates,[coordinates])
    const { isLoaded } = useJsApiLoader({ googleMapsApiKey })

    if(!isLoaded) return (<div> Loading .... </div>)

    const options = {
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1,
        disableDefaultUI: true
    }


    return (
        <GoogleMap options={options} clickableIcons={false} mapContainerClassName={"google-map-adapter-container"}
          center={center} zoom={13}>
           {/*  <StreetViewPanorama  position={center} visible={true} /> */}
          <Marker position={center}></Marker>
      </GoogleMap>

    )
}

export default GoogleMapAdapter