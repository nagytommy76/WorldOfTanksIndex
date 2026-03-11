import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import ReturnTypography from '../Includes/ModuleType'

export default function Devices() {
   const { provisions } = useContext(VehicleContext)

   return (
      <>
         <ReturnTypography text='Devices' />
         <section className=''>
            <h2>Section</h2>
         </section>
      </>
   )
}
