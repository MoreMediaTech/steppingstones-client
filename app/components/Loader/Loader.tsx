import React from 'react'
import { Loader as MantineLoader } from '@components/mantine-components'

export default function Loader() {
 return (
   <div className="flex  items-center justify-center">
     <MantineLoader size="xl" variant="bars" />
   </div>
 )
}
