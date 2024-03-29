'use client';
import React, { useEffect } from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
} from '@react-google-maps/api'

import { getGeocode, getLatLng } from 'use-places-autocomplete'

import Places from './Places'
import Loader from '@components/Loader';

type LatLngLiteral = google.maps.LatLngLiteral
type MapOptions = google.maps.MapOptions

type Libraries = (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'visualization'
)[]

const Map = ({
  location,
  districtsArray,
}: {
  location: string
  districtsArray?: string[]
}) => {
  const librariesArray = React.useMemo<Libraries>(() => ['places'], [])
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: librariesArray,
  })
  const [map, setMap] = React.useState(null)
  const [region, setRegion] = React.useState<LatLngLiteral>()
  const mapRef = React.useRef<GoogleMap>()
  const center = React.useMemo<LatLngLiteral>(
    () => region as LatLngLiteral,
    [region]
  )
  const options = React.useMemo<MapOptions>(
    () => ({
      mapId: 'b13ee47679c2d2a6',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  )
  const handleSelect = async (val: string) => {
    const results = await getGeocode({ address: val })
    const { lat, lng } = await getLatLng(results[0])

    setRegion({ lat, lng })
  }

  useEffect(() => {
    if (isLoaded) {
      handleSelect(location)
    }
  }, [location, isLoaded])

  const onLoad = React.useCallback((map: any) => (mapRef.current = map), [])
  //   const districts = React.useMemo(
  //     () => generateDistrictsCords(districtsArray as string[]),
  //     [districtsArray]
  //   )

  if (!isLoaded) {
    return (
      <div className="flex h-[700px] items-center justify-center">
        <Loader className='h-8 w-8' />
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-[500px] w-full flex-col ">

      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={10}
        onLoad={onLoad}
        options={options}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {region && (
          <>
            <Marker position={region} />

            {/* {districts?.length > 0 && (
              <MarkerClusterer>
                {(clusterer) =>
                  districts.map((district) => (
                    <Marker
                      key={district.lat}
                      position={district}
                      clusterer={clusterer}
                    />
                  ))
                }
              </MarkerClusterer>
            )} */}

            <Circle center={region} radius={15000} options={closeOptions} />
            <Circle center={region} radius={30000} options={middleOptions} />
          </>
        )}
      </GoogleMap>
    </div>
  )
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
}
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.2,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
}
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.15,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D',
}
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#FF5252',
  fillColor: '#FF5252',
}
const generateDistrictsCords = (districts: string[]) => {
  const _districts: Array<LatLngLiteral> = []
  districts?.forEach(async (district) => {
    const results = await getGeocode({ address: `${district}, UK` })
    const { lat, lng } = await getLatLng(results[0])
    _districts.push({ lat: lat, lng: lng })
  })
  // console.log(_districts)
  return _districts
}

export default Map
