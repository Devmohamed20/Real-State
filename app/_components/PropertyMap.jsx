"use client";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox"; // if you're using Mapbox
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";
const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    Zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [geoCodingError, setGeoCodingError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;
      const encodedAddress = encodeURIComponent(address);

      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
      );
      const data = await res.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setLat(lat);
        setLng(lng);
        console.log({ lat, lng });
        setViewPort({
          ...viewPort,
          latitude: lat,
          longitude: lng,
        });
      } else {
        setGeoCodingError(true);
        console.error("Geocoding failed:", data);
      }

      setLoading(false);
    };

    fetchCoords();
  }, []);

  console.log(lat, lng);

  if (loading) return <Spinner />;
  if (geoCodingError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{ longitude: lng, latitude: lat, zoom: 15 }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
