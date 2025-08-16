import type { ModuleType } from '@/types/VehicleDetails/module'

import vehicleChassis from '@/ImagesVehicleParts/vehiclechassis.png'
import vehicleEngine from '@/ImagesVehicleParts/vehicleengine.png'
import vehicleGun from '@/ImagesVehicleParts/vehiclegun.png'
import vehicleRadio from '@/ImagesVehicleParts/vehicleradio.png'
import vehicleTurret from '@/ImagesVehicleParts/vehicleturret.png'

export default function ReturnModuleImg(moduleType: ModuleType) {
   switch (moduleType) {
      case 'vehicleChassis':
         return vehicleChassis
      case 'vehicleEngine':
         return vehicleEngine
      case 'vehicleGun':
         return vehicleGun
      case 'vehicleRadio':
         return vehicleRadio
      case 'vehicleTurret':
         return vehicleTurret
      default:
         return '' // Return a default image source
   }
}
