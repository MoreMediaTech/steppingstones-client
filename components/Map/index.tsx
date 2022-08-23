import React, { useEffect } from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  MarkerClustererProps,
} from '@react-google-maps/api'
import { Loader } from '@mantine/core'
import { getGeocode, getLatLng } from 'use-places-autocomplete'

import Places from './Places'

type LatLngLiteral = google.maps.LatLngLiteral
type MapOptions = google.maps.MapOptions

type Libraries = (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
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
      mapId: 'b181cac70f27f5e6',
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
        <Loader size="xl" variant="bars" />
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col min-h-[500px]">
      <div className="bg-white p-1 text-gray-900">
        <Places
          setRegion={(position) => {
            setRegion(position)
            mapRef.current?.panTo(position)
          }}
          location={location}
        />
      </div>

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
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
}
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
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
  console.log(_districts)
  return _districts
}

export default Map
