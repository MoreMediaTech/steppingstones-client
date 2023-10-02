import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { Autocomplete } from '@mantine/core'
import { FormEventHandler, ReactEventHandler } from 'react'

type PlacesProps = {
  setRegion: (position: google.maps.LatLngLiteral) => void
  location: string
}

// TODO: update this component to use react-hook-form and shadcnui Input component
export default function Places({ setRegion, location }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (val: any) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val.value });
    const { lat, lng } = await getLatLng(results[0]);
    setRegion({ lat, lng });
  };
  const newData = status === 'OK' ? data.map((place) => place.description) : [`${location}`]
  return (
    <>
      <Autocomplete
        value={value}
        defaultValue={location}
        onChange={setValue}
        data={newData}

        placeholder="Search Map for Locality"
        radius="md"
        variant="filled"
        aria-label="Search Map for Locality input"
        className='rounded-md outline-none border-2 border-gray-900 dark:border-white ring-0'
      />
    </>
  )
}
