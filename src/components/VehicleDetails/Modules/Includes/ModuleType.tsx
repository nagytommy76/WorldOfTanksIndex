import type { ModuleType } from '@/types/VehicleDetails/module'

export default function ModuleType({ moduleType }: { moduleType: ModuleType }) {
   switch (moduleType) {
      case 'vehicleChassis':
         return <h1>Chassis</h1>
      case 'vehicleEngine':
         return <h1>Engines</h1>
      case 'vehicleGun':
         return <h1>Guns</h1>
      case 'vehicleRadio':
         return <h1>Radios</h1>
      case 'vehicleTurret':
         return <h1>Turrets</h1>
      default:
         return <h1></h1>
   }
}
