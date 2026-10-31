import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/Providers/AxiosProvider'

import { isFieldModificationTier } from '@/src/utils/FieldModifications/fieldModificationTiers'

import type { IResolvedFieldModificationTree } from '@Models/FieldModifications/TreeTypes'
import type { VehicleRoles } from '@/types/types'

/**
 * @description Fetches the field modification tree of the vehicle role, filtered to the vehicle tier.
 * The request only runs for tier VI - X vehicles that have a role.
 */
export default function useGetFieldModTree(vehicleTier: number, vehicleRole: VehicleRoles | null) {
   const { data, error, isError, isLoading } = useQuery<{
      data: { fieldModificationTree: IResolvedFieldModificationTree }
   }>({
      queryKey: ['fieldModificationTree', vehicleRole, vehicleTier],
      queryFn: () =>
         axiosInstance.get('/field_modifications', {
            headers: {
               role: vehicleRole,
               tier: vehicleTier,
            },
         }),
      enabled: vehicleRole !== null && isFieldModificationTier(vehicleTier),
      // The trees only change with a game update
      staleTime: Infinity,
   })

   return { error, isError, isLoading, fieldModificationTree: data?.data.fieldModificationTree }
}
