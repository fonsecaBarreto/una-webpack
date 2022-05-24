import * as React from 'react';
import "./style.css"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
/* import `` */

export const GoogleMapAdapter: React.FunctionComponent<any> = ({ coordinates }) =>{


    const center = React.useMemo(()=>coordinates,[coordinates])
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "teste"
    })

    if(!isLoaded) return (<div> Loading .... </div>)
    return (
        <GoogleMap
          mapContainerClassName={"google-map-adapter-container"}
          center={center}
          zoom={12}>
          <Marker position={center}></Marker>
      </GoogleMap>

    )
}

export default GoogleMapAdapter