'use client'
import { useContext, useEffect, useState } from 'react'
import { ModuleContext } from '@/ModuleContext/ModuleContext'
import { useQuery } from '@tanstack/react-query'

export default function useGetModuleDetails() {
   const [isIdsReady, setIsIdsReady] = useState<boolean>(false)
   const {
      tank_id,
      modulesReducer: {
         selectedModuleIds: { vehicleChassis, vehicleEngine, vehicleGun, vehicleRadio, vehicleTurret },
      },
   } = useContext(ModuleContext)

   const queryFunction = async () => {
      const response = await fetch(
         `
        https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=${process.env.NEXT_PUBLIC_WOT_APP_ID}&tank_id=${tank_id}&suspension_id=${vehicleChassis}&engine_id=${vehicleEngine}&gun_id=${vehicleGun}&turret_id=${vehicleTurret}&radio_id=${vehicleRadio}
        `,
         { method: 'GET' }
      )
      return await response.json()
   }

   useEffect(() => {
      if (vehicleChassis && vehicleEngine && vehicleGun && vehicleRadio) setIsIdsReady(true)
   }, [setIsIdsReady, vehicleChassis, vehicleEngine, vehicleGun, vehicleRadio])

   const { data } = useQuery({
      queryKey: ['moduleDetails', [vehicleChassis, vehicleEngine, vehicleGun, vehicleRadio]],
      queryFn: queryFunction,
      refetchOnWindowFocus: false,
      enabled: isIdsReady,
   })

   console.log(data)

   return null
}
