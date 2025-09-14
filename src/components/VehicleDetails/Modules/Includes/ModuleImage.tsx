import Image from 'next/image'
import ListItemAvatar from '@mui/material/ListItemAvatar'

import ReturnModuleImg from './ReturnModuleImg'
import { AmmoType, ModuleType } from '@/types/VehicleDetails/module'

export default function ModuleImage({
   moduleType,
   shellImage,
   moduleName,
}: {
   moduleName: string
   shellImage?: AmmoType
   moduleType: ModuleType
}) {
   return (
      <ListItemAvatar>
         {shellImage ? (
            <Image
               src={ReturnModuleImg(moduleType as ModuleType, shellImage)}
               alt={moduleName}
               width={45}
               height={45}
            />
         ) : (
            <Image src={ReturnModuleImg(moduleType as ModuleType)} alt={moduleName} width={45} height={45} />
         )}
      </ListItemAvatar>
   )
}
