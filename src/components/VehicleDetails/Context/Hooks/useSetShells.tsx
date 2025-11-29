import { useContext, useEffect } from 'react'
import { VehicleContext } from '../VehicleContext'
import type { IShells } from '@VehicleTypes/Shells'

export default function useSetShells() {
   const {
      vehicleReducer: {
         moduleGroup: { vehicleTurret },
         selectedModuleNames: { vehicleTurret: selectedTurretName, vehicleGun: selectedGun },
      },
      vehicleDispatch,
   } = useContext(VehicleContext)

   useEffect(() => {
      const foundSelectedTurret = Object.values(vehicleTurret).find(
         (turret) => turret.name === selectedTurretName
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
      }
   }, [selectedTurretName, selectedGun, vehicleTurret, vehicleDispatch])

   return null
}
