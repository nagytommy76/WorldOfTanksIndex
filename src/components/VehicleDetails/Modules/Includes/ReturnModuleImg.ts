import type { ModuleType, AmmoType } from '@/types/VehicleDetails/module'

import vehicleChassis from '@/ImagesVehicleParts/vehiclechassis.png'
import vehicleEngine from '@/ImagesVehicleParts/vehicleengine.png'
import vehicleGun from '@/ImagesVehicleParts/vehiclegun.png'
import vehicleRadio from '@/ImagesVehicleParts/vehicleradio.png'
import vehicleTurret from '@/ImagesVehicleParts/vehicleturret.png'

import ARMOR_PIERCING from '@/ImagesShells/ARMOR_PIERCING.webp'
import ARMOR_PIERCING_CR from '@/ImagesShells/ARMOR_PIERCING_CR.webp'
import ARMOR_PIERCING_CR_PREMIUM from '@/ImagesShells/ARMOR_PIERCING_CR_PREMIUM.webp'
import ARMOR_PIERCING_PREMIUM from '@/ImagesShells/ARMOR_PIERCING_PREMIUM.webp'
import HIGH_EXPLOSIVE_MODERN from '@/ImagesShells/HIGH_EXPLOSIVE_MODERN.webp'
import HIGH_EXPLOSIVE from '@/ImagesShells/HIGH_EXPLOSIVE_MODERN.webp'
import HIGH_EXPLOSIVE_MODERN_PREMIUM from '@/ImagesShells/HIGH_EXPLOSIVE_MODERN_PREMIUM.webp'
import HIGH_EXPLOSIVE_SPG_STUN from '@/ImagesShells/HIGH_EXPLOSIVE_SPG_STUN.webp'
import HIGH_EXPLOSIVE_SPG from '@/ImagesShells/HIGH_EXPLOSIVE_SPG.webp'
import HOLLOW_CHARGE_PREMIUM from '@/ImagesShells/HOLLOW_CHARGE_PREMIUM.webp'
import HOLLOW_CHARGE from '@/ImagesShells/HOLLOW_CHARGE.webp'

export default function ReturnModuleImg(moduleType: ModuleType, ammoType?: AmmoType) {
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
      case 'shells':
         switch (ammoType) {
            case 'ARMOR_PIERCING':
               return ARMOR_PIERCING
            case 'ARMOR_PIERCING_CR':
               return ARMOR_PIERCING_CR
            case 'ARMOR_PIERCING_CR_PREMIUM':
               return ARMOR_PIERCING_CR_PREMIUM
            case 'ARMOR_PIERCING_PREMIUM':
               return ARMOR_PIERCING_PREMIUM
            case 'HIGH_EXPLOSIVE_MODERN':
               return HIGH_EXPLOSIVE_MODERN
            case 'HIGH_EXPLOSIVE':
               return HIGH_EXPLOSIVE
            case 'HIGH_EXPLOSIVE_MODERN_PREMIUM':
               return HIGH_EXPLOSIVE_MODERN_PREMIUM
            case 'HIGH_EXPLOSIVE_SPG_STUN':
               return HIGH_EXPLOSIVE_SPG_STUN
            case 'HIGH_EXPLOSIVE_SPG':
               return HIGH_EXPLOSIVE_SPG
            case 'HOLLOW_CHARGE_PREMIUM':
               return HOLLOW_CHARGE_PREMIUM
            case 'HOLLOW_CHARGE':
               return HOLLOW_CHARGE
         }

      default:
         return '' // Return a default image source
   }
}
