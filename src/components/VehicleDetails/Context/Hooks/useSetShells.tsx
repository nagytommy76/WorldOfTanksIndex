import { ActionDispatch, useEffect } from 'react'
import type { IShells } from '@VehicleTypes/Shells'
import type { ITankData } from '@VehicleTypes/Vehicle'
import type { IVehicleContextActions } from '../Types'
import type { IModifiersContextActions } from '../ModifiersTypes'

export default function useSetShells(
   tankData: ITankData,
   vehicleDispatch: ActionDispatch<[IVehicleContextActions]>,
   modifiersDispatch: ActionDispatch<[IModifiersContextActions]>,
   selectedTurretName: string | null,
   selectedGun: string | null,
) {
   useEffect(() => {
      if (!tankData) return
      const foundSelectedTurret = Object.values(tankData.stats.turrets).find(
         (turret) => turret.name === selectedTurretName,
      )
      const foundSelectedGun = foundSelectedTurret?.guns.find((gun) => gun.name === selectedGun)

      if (foundSelectedTurret && foundSelectedGun) {
         const helperObjectShells: { [shellName: string]: IShells } = {}
         for (const shell of foundSelectedGun?.shells || []) {
            helperObjectShells[shell.name] = shell
         }
         vehicleDispatch({
            type: 'SET_SHELLS',
            payload: helperObjectShells,
         })

         const vehiclShellsKeys: string[] = Object.keys(helperObjectShells)
         vehicleDispatch({
            type: 'SET_MODULE_NAME_BY_TYPE',
            payload: {
               type: 'shells',
               value: helperObjectShells[vehiclShellsKeys[0]]?.name || '',
            },
         })
         modifiersDispatch({
            type: 'SET_DEFAULT_SHELL_NAME',
            payload: {
               shells: helperObjectShells[vehiclShellsKeys[0]]?.name || '',
            },
         })
      }
   }, [selectedTurretName, selectedGun, vehicleDispatch, modifiersDispatch, tankData])

   return null
}
