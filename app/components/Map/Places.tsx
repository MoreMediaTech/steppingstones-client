'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { Button } from "@components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"

const FormSchema = z.object({
  places: z.string().optional(),
})

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

   const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      places: location,
    },
  })

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
      <Form {...form}>
      <form className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="places"
          aria-label="Search Map for Locality input"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search Map</FormLabel>
              <FormControl>
                <Input placeholder="Search Map for Locality" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
    
    </>
  )
}
