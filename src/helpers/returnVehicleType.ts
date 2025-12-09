import type { VehicleTypes } from '@/types/VehicleDetails/Other'

export default function retrunVehicleType(type: VehicleTypes): string {
   switch (type) {
      case 'lightTank':
         return 'Light Tank'
      case 'mediumTank':
         return 'Medium Tank'
      case 'heavyTank':
         return 'Heavy Tank'
      case 'AT-SPG':
         return 'Tank Destroyer'
      case 'SPG':
         return 'Artillery'
      default:
         return ''
   }
}
