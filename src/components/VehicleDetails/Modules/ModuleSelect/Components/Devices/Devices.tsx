'use client'
import { useState } from 'react'

import useGetDevices from './Hooks/useGetDevices'

import Typography from '@mui/material/Typography'

import ReturnTypography from '../../Includes/ModuleType'
import DeviceGroup from './DeviceGroup/DeviceGroup'

/**
 * @description Maximum number of devices a player can equip
 */
const MAX_DEVICES = 3

export default function Devices() {
   const allGroupedDevices = useGetDevices()
   // Record<archeType, deviceId> — at most MAX_DEVICES (3) entries at any time
   const [selectedDevices, setSelectedDevices] = useState<Record<string, number>>({})

   if (!allGroupedDevices) return null

   // ── How many slots are currently filled ───────────────────────────────────
   const selectedCount = Object.keys(selectedDevices).length

   /**
    * @description The single source of truth for adding/removing a device.
    * Rules enforced here:
    * 1. deviceId === 0  → deselect (remove the entry for this archeType)
    * 2. already at MAX_DEVICES AND this archeType isn't selected yet → block
    * 3. otherwise → add or replace the entry for this archeType
    * @param archeType which group this action belongs to (e.g. "turbocharger")
    * @param deviceId the device's database id, OR 0 to signal deselection
    */
   function addSelectedDevice(archeType: string, deviceId: number) {
      // ── Rule 1: Deselect ──────────────────────────────────────────────────
      if (deviceId === 0) {
         // Destructure to remove the key without mutating state directly.
         // The underscore variable (_removed) is intentionally unused.
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const { [archeType]: _removed, ...rest } = selectedDevices
         setSelectedDevices(rest)
         return
      }

      const hasCurrentSelection = archeType in selectedDevices

      // ── Rule 2: Block if at capacity and this slot is empty ───────────────
      if (selectedCount >= MAX_DEVICES && !hasCurrentSelection) return

      // ── Rule 3: Add or swap ───────────────────────────────────────────────
      // Using the functional updater form of setState is safer here because
      // React batches state updates — this guarantees we always read the
      // latest snapshot of selectedDevices.
      setSelectedDevices((prev) => ({ ...prev, [archeType]: deviceId }))
   }

   return (
      <>
         <ReturnTypography text='Compatible Devices' />
         <Typography
            variant='caption'
            color='text.secondary'
            className={`text-center mb-2
            ${selectedCount >= MAX_DEVICES ? 'text-red-400' : 'text-green-400'}
            `}
         >
            {selectedCount} / {MAX_DEVICES} devices selected
         </Typography>
         <section className='grid grid-cols-4 gap-2'>
            {Object.entries(allGroupedDevices).map(([deviceArcheType, devices]) => (
               <DeviceGroup
                  key={deviceArcheType}
                  archeType={deviceArcheType}
                  devices={devices}
                  isBlocked={selectedCount >= MAX_DEVICES && !(deviceArcheType in selectedDevices)}
                  addSelectedDevice={addSelectedDevice}
                  // addDeviceToMap={addDeviceToMap}
                  // selectedDevices={selectedDevices}
               />
            ))}
         </section>
      </>
   )
}
