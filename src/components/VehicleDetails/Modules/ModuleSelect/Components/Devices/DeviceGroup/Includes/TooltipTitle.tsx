import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Typography from '@mui/material/Typography'
import type { IAggregateModifier, IModifier } from '@/types/Devices/Devices'

export default function TooltipTitle({
   aggregateModifiers,
   modifiers,
   children,
}: {
   modifiers: IModifier[] | null
   aggregateModifiers: IAggregateModifier[] | null
   children: React.ReactNode
}) {
   const { vehicleType } = useContext(VehicleContext)
   return (
      <>
         {children}
         <div className='min-w-[250px] min-h-[100px]'>
            <h1>AGGREGATE M?ODIFIERS:::::</h1>
            {aggregateModifiers && (
               <div>
                  {aggregateModifiers.map((aggregateModifier, index) => (
                     <div key={index}>
                        {aggregateModifier.vehicleTypes.includes(vehicleType) && (
                           <>
                              <Typography>Vehicle Type: {vehicleType}</Typography>
                              {ReturnModifierDisplayString(aggregateModifier.value)[aggregateModifier.name]}
                              {/* {aggregateModifier.name}: {aggregateModifier.value} */}
                           </>
                        )}
                     </div>
                  ))}
               </div>
            )}
            <h1>M?ODIFIERS:::::</h1>
            {modifiers && (
               <div>
                  {modifiers.map((modifier, index) => (
                     <div key={index}>
                        {modifier.name}: {modifier.value}
                     </div>
                  ))}
               </div>
            )}
         </div>
      </>
   )
}
type ModifierDisplayString = {
   [key: string]: string
}

function ReturnModifierDisplayString(value: number): ModifierDisplayString {
   const transformValue = ((value - 1) * 100).toFixed(1)
   console.log(transformValue)
   return {
      vehicleCamouflage: `+${transformValue}% to concealment`,
   }
}
