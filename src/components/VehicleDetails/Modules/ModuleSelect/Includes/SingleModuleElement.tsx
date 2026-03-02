import type { IShells } from '@/types/VehicleDetails/Shells'
import type { IChassis } from '@/types/VehicleDetails/Hull'
import type { IRadios } from '@/types/VehicleDetails/Other'
import type { IEngines } from '@/types/VehicleDetails/Engines'
import type { ITurrets } from '@/types/VehicleDetails/Turrets'
import type { IGuns } from '@/types/VehicleDetails/Guns'
import type { ModuleType } from '@/types/VehicleDetails/module'

import ModuleImage from './ModuleImg/ModuleImage'

import ListItemButton from '@mui/material/ListItemButton'
import Tooltip from '@mui/material/Tooltip'

export default function SingleModuleElement({
   module,
   selected,
   moduleName,
   moduleType,
   onClickFn,
}: {
   module: ITurrets | IEngines | IChassis | IGuns | IRadios | IShells
   selected: boolean
   moduleName: string
   moduleType: ModuleType
   onClickFn: () => void
}) {
   return (
      <Tooltip title={moduleName}>
         <ListItemButton
            className='h-10 w-10 rounded-sm'
            selected={selected}
            onClick={onClickFn}
            sx={{
               '&.Mui-selected': {
                  backgroundColor: 'rgba(63, 63, 63, 0.925)',
               },
               '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(44, 44, 44, 0.925)',
               },
               '&.MuiListItemButton-root': {
                  padding: 0,
               },
            }}
         >
            <ModuleImage
               moduleName={module.name}
               moduleType={moduleType}
               shellImage={'kind' in module ? module.kind : undefined}
            />
         </ListItemButton>
      </Tooltip>
   )
}
