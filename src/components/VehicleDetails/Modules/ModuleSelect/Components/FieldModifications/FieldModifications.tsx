import { useContext, useMemo } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import tiers from '@/lib/tierList'
import {
   FIELD_MODIFICATION_MAX_TIER,
   FIELD_MODIFICATION_MIN_TIER,
   isFieldModificationTier,
} from '@/src/utils/FieldModifications/fieldModificationTiers'
import { groupFieldModificationLevels } from '@/FieldModificationUtils/groupFieldModificationLevels'

import useGetFieldModTree from './Hooks/useGetFieldModTree'

import ReturnTypography from '../../Includes/ModuleType'
import FieldModTree from './Includes/FieldModTree'
import ResetBtn from './Includes/ResetBtn'

import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export default function FieldModifications() {
   const { vehicleTier, vehicleRole, customRoleSlotOptions } = useContext(VehicleContext)
   const { fieldModificationTree, isError, isLoading } = useGetFieldModTree(vehicleTier, vehicleRole)
   const levels = useMemo(
      () => groupFieldModificationLevels(fieldModificationTree?.steps ?? []),
      [fieldModificationTree],
   )

   let content: React.ReactNode
   if (vehicleRole === null) {
      content = <Message text='This vehicle has no field modifications.' />
   } else if (!isFieldModificationTier(vehicleTier)) {
      content = (
         <Message
            text={`Field modifications are available for tier ${tiers[FIELD_MODIFICATION_MIN_TIER - 1]} - ${
               tiers[FIELD_MODIFICATION_MAX_TIER - 1]
            } vehicles.`}
         />
      )
   } else if (isLoading) {
      content = <CircularProgress aria-label='Loading field modifications' />
   } else if (isError) {
      content = <Message text='Could not load the field modifications.' />
   } else if (levels.length === 0) {
      content = <Message text='This vehicle has no field modifications.' />
   } else {
      content = (
         <>
            <FieldModTree levels={levels} roleSlotOptions={customRoleSlotOptions ?? null} />
            <ResetBtn />
         </>
      )
   }

   return (
      <section className='flex flex-col items-center gap-3 w-[330px] xl:w-[265px] p-2'>
         <ReturnTypography text='Field Modifications' />
         {content}
      </section>
   )
}

function Message({ text }: { text: string }) {
   return (
      <Typography variant='body2' className='text-center text-white/60'>
         {text}
      </Typography>
   )
}
