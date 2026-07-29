export default function ModuleTypeTypography(
   moduleType: 'vehicleTurret' | 'vehicleEngine' | 'vehicleChassis' | 'vehicleGun' | 'vehicleRadio',
): string {
   switch (moduleType) {
      case 'vehicleChassis':
         return 'Chassis'
      case 'vehicleEngine':
         return 'Engines'
      case 'vehicleGun':
         return 'Guns'
      case 'vehicleRadio':
         return 'Radios'
      case 'vehicleTurret':
         return 'Turrets'
   }
}
