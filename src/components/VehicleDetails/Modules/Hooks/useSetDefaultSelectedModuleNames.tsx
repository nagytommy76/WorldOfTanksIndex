import { useEffect, useContext } from 'react'
import { TomatoContext } from '@/TomatoContext/TomatoContext'

export default function useSetDefaultSelectedModuleNames() {
   const {
      tomatoDispatch,
      tomatoReducer: {
         moduleGroup: { vehicleTurret, vehicleChassis, vehicleEngine, vehicleGun, vehicleRadio },
      },
   } = useContext(TomatoContext)

   useEffect(() => {
      const vehicleTurretKeys: string[] = Object.keys(vehicleTurret)
      const vehicleChassisKeys: string[] = Object.keys(vehicleChassis)
      const vehicleEngineKeys: string[] = Object.keys(vehicleEngine)
      const vehicleGunKeys: string[] = Object.keys(vehicleGun)
      const vehicleRadioKeys: string[] = Object.keys(vehicleRadio)

      tomatoDispatch({
         type: 'SET_SELECTED_MODULE_NAMES',
         payload: {
            vehicleChassis: vehicleChassis[vehicleChassisKeys[vehicleChassisKeys.length - 1]]?.name || '',
            vehicleEngine: vehicleEngine[vehicleEngineKeys[vehicleEngineKeys.length - 1]]?.name || '',
            vehicleGun: vehicleGun[vehicleGunKeys[vehicleGunKeys.length - 1]]?.name || '',
            vehicleRadio: vehicleRadio[vehicleRadioKeys[vehicleRadioKeys.length - 1]]?.name || '',
            vehicleTurret: vehicleTurret[vehicleTurretKeys[vehicleTurretKeys.length - 1]]?.name || '',
         },
      })
   }, [tomatoDispatch, vehicleTurret, vehicleChassis, vehicleEngine, vehicleGun, vehicleRadio])

   return null
}
