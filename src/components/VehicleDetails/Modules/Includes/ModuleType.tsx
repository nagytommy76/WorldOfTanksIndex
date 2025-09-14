import type { ModuleType } from '@/types/VehicleDetails/module'
import Typography from '@mui/material/Typography'

function ReturnTypography({ text }: { text: string }) {
   return (
      <Typography gutterBottom variant='h6'>
         {text}
      </Typography>
   )
}

export default function ModuleType({ moduleType }: { moduleType: ModuleType }) {
   switch (moduleType) {
      case 'vehicleChassis':
         return <ReturnTypography text='Chassis' />
      case 'vehicleEngine':
         return <ReturnTypography text='Engine' />
      case 'vehicleGun':
         return <ReturnTypography text='Guns' />
      case 'vehicleRadio':
         return <ReturnTypography text='Radio' />
      case 'vehicleTurret':
         return <ReturnTypography text='Turrets' />
      case 'shells':
         return <ReturnTypography text='Shells' />
      default:
         return <h1></h1>
   }
}
