'use client'
import axios from '@/ProvidersAxiosProvider'
import { ActionDispatch, useContext, useEffect, useState } from 'react'
import { ModuleContext } from '@/ModuleContext/ModuleContext'
import { useQuery } from '@tanstack/react-query'
import { IModuleDetails } from '@/types/VehicleDetails/module'
import { IDetailsContextActions } from '../Details/DetailsType'

export default function useGetModuleDetails(
   vehicleProfileDispatch: ActionDispatch<[IDetailsContextActions]>
) {
   const [isIdsReady, setIsIdsReady] = useState<boolean>(false)
   const {
      tank_id,
      modulesReducer: {
         selectedModuleIds: { vehicleChassis, vehicleEngine, vehicleGun, vehicleRadio, vehicleTurret },
      },
   } = useContext(ModuleContext)

   const queryFunction = async () => {
      return await axios.get<{ data: { [tank_id: string]: IModuleDetails } }>(
         '/encyclopedia/vehicleprofile/',
         {
            params: {
               application_id: process.env.NEXT_PUBLIC_WOT_APP_ID,
               tank_id,
               suspension_id: vehicleChassis,
               engine_id: vehicleEngine,
               gun_id: vehicleGun,
               turret_id: vehicleTurret === 0 ? null : vehicleTurret,
               radio_id: vehicleRadio,
            },
         }
      )
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

   useEffect(() => {
      if (data) {
         vehicleProfileDispatch({ type: 'SET_VEHICLE_PROFILE', payload: data.data.data[tank_id] })
      }
   }, [data, tank_id, vehicleProfileDispatch])

   return null
}
