import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { Autocomplete, AutocompleteItem } from '@mantine/core'

type PlacesProps = {
  setRegion: (position: google.maps.LatLngLiteral) => void
  location: string
}

export default function Places({ setRegion, location }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (val: AutocompleteItem) => {
    setValue(val.value, false)
    clearSuggestions()

    const results = await getGeocode({ address: val.value })
    const { lat, lng } = await getLatLng(results[0])
    setRegion({ lat, lng })
  }
  const newData = status === 'OK' ? data.map((place) => place.description) : [`${location}`]
  return (
    <>
      <Autocomplete
        value={value}
        defaultValue={location}
        onChange={setValue}
        data={newData}
        onItemSubmit={handleSelect}
        placeholder="Search Map for Locality"
        radius="md"
        variant="filled"
        className='rounded-md outline-none ring-0'
      />
    </>
  )
}
