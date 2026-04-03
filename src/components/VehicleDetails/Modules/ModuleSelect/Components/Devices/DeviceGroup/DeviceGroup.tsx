import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/VehicleContext/DevicesContext/DeviceContext'

import useMenuHandler from './Hooks/useMenuHandler'
import useDeviceStates from './Hooks/useDeviceStates'

import ReturnFoundDevices from './Functions/ReturnFoundDevices'

import type { IDevice } from '@/types/Devices/Devices'
import type { OverlayTypes, DeviceTypes } from '../Types'

import Menu from '@mui/material/Menu'

import MenuItemOverlay from './Includes/MenuItemOverlay'
import SingleMenuItem from './Includes/SingleMenuItem'
import SingleDeviceButton from './Includes/SingleDevicebutton/SingleDeviceButton'

/**
 * @description Renders a single equipment slot button + its dropdown menu.
 * Each group represents one archeType (e.g. "turbocharger", "optics", etc.)
 * and shows the tier / trophy-basic / trophy-upgraded / deluxe variants.
 * @param {string} archeType The group identifier (e.g. "turbocharger"). Used when notifying the parent which slot is being changed.
 * @param {IDevice[]} devices All device variants belonging to this archeType.
 * @param {boolean} isBlocked True when 3 devices are already selected globally AND this group has no current selection. Prevents opening the menu so the player cannot exceed the limit.
 * @function addSelectedDevice Callback to the parent. Pass deviceId = 0 to signal deselection
 * @returns Single equipment slot button + its dropdown menu.
 */
export default function DeviceGroup({
   archeType,
   devices,
   isBlocked,
   addSelectedDevice,
}: {
   archeType: string
   devices: IDevice[]
   isBlocked: boolean
   addSelectedDevice(archeType: string, deviceId: number): void
}) {
   const { supplySlotCategory, vehicleType } = useContext(VehicleContext)
   const { setDeviceModifier, removeDeviceModifier } = useContext(DeviceContext)
   // ── Local state ──────────────────────────────────────────────────────────
   const foundDevices = ReturnFoundDevices(devices)

   // selectedDeviceType drives which overlay icon is shown on the button
   const { selectedDeviceTypeOverlay, setSelectedDeviceTypeOverlay, selectedDevice, setSelectedDevice } =
      useDeviceStates(foundDevices.tiers)
   const { anchorEl, setAnchorEl, open, handleMenuClose } = useMenuHandler()

   function selectAndCloseNoneDeviceType() {
      setAnchorEl(null)
      // ── Deselect ──────────────────────────────────────────────────────
      // Reset the button back to the default tiers icon
      setSelectedDevice(foundDevices.tiers)
      setSelectedDeviceTypeOverlay('none')
      // Notify parent: deviceId 0 means "remove this slot"
      addSelectedDevice(archeType, 0)
      removeDeviceModifier(archeType)
   }

   function supplySlotActiveSelectAndClose() {
      setAnchorEl(null)

      setSelectedDevice(foundDevices.tiers)
      setSelectedDeviceTypeOverlay('supplySlotActive')
      addSelectedDevice(archeType, foundDevices.tiers?.id ?? 0)
      if (foundDevices.tiers?.modifiers) {
         foundDevices.tiers.modifiers.forEach((modifier) => {
            setDeviceModifier(modifier.name, modifier.specValue ?? modifier.value, archeType)
         })
      } else if (foundDevices.tiers?.aggregateModifiers) {
         foundDevices.tiers.aggregateModifiers.forEach((aggregatedModifier) => {
            if (aggregatedModifier.vehicleTypes.includes(vehicleType)) {
               setDeviceModifier(
                  aggregatedModifier.name,
                  aggregatedModifier.specValue ?? aggregatedModifier.value,
                  archeType,
               )
            }
         })
      }
   }

   // Called when the player picks an item (or "Deselect") from the dropdown
   function handleSelectAndClose(deviceType: DeviceTypes) {
      setAnchorEl(null)
      const device = foundDevices[deviceType]
      if (!device) return // guard: variant doesn't exist for this archeType

      setSelectedDevice(device)
      setSelectedDeviceTypeOverlay(deviceType)
      // Notify parent with the real device id so it can track the selection
      addSelectedDevice(archeType, device.id)

      if (device?.modifiers) {
         device.modifiers.forEach((modifier) => {
            setDeviceModifier(modifier.name, modifier.value, archeType)
         })
      } else if (device?.aggregateModifiers) {
         device.aggregateModifiers.forEach((aggregatedModifier) => {
            if (aggregatedModifier.vehicleTypes.includes(vehicleType)) {
               setDeviceModifier(aggregatedModifier.name, aggregatedModifier.value, archeType)
            }
         })
      }
   }

   if (!selectedDevice) return null
   return (
      <>
         <SingleDeviceButton
            isBlocked={isBlocked}
            selectedDevice={selectedDevice}
            selectedDeviceTypeOverlay={selectedDeviceTypeOverlay}
            open={open}
            setAnchorEl={setAnchorEl}
         />
         <Menu
            id='equipment-selection-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            slotProps={{
               list: {
                  'aria-labelledby': 'Equipment selection',
               },
            }}
         >
            <SingleMenuItem displayName={'Deselect equipment'} handleClose={selectAndCloseNoneDeviceType}>
               <MenuItemOverlay overlayType='none' altName={'empty_loadout'} icon={'empty_loadout'} />
            </SingleMenuItem>
            {Object.entries(foundDevices).map(
               ([deviceType, device]) =>
                  device !== undefined && (
                     <div key={deviceType}>
                        {deviceType === 'tiers' ? (
                           <>
                              <SingleMenuItem
                                 key={deviceType}
                                 displayName={device.displayName}
                                 handleClose={() => handleSelectAndClose(deviceType)}
                              >
                                 <MenuItemOverlay
                                    overlayType={deviceType as OverlayTypes}
                                    altName={device.name}
                                    icon={device.icon}
                                 />
                              </SingleMenuItem>
                              {/**
                               * IF We have MOBILITY supplySlotCategory inside VehicleContext.
                               * If TIERS device has this category, Use specValue of device.modifiers array.
                               */}
                              {supplySlotCategory &&
                                 foundDevices.tiers?.categories &&
                                 foundDevices.tiers?.categories?.includes(supplySlotCategory) && (
                                    <SingleMenuItem
                                       displayName={`${foundDevices.tiers.displayName} in ${supplySlotCategory} slot`}
                                       handleClose={supplySlotActiveSelectAndClose}
                                    >
                                       <MenuItemOverlay
                                          overlayType='supplySlotActive'
                                          supplySlotIconName={supplySlotCategory}
                                          altName={foundDevices.tiers.displayName}
                                          icon={foundDevices.tiers.icon}
                                       />
                                    </SingleMenuItem>
                                 )}
                           </>
                        ) : (
                           <SingleMenuItem
                              key={deviceType}
                              displayName={`
                           ${deviceType === 'equipmentTrophyUpgraded' ? 'Upgraded ' : ''}
                           ${device.displayName}
                           `}
                              handleClose={() => handleSelectAndClose(deviceType as DeviceTypes)}
                           >
                              <MenuItemOverlay
                                 overlayType={deviceType as OverlayTypes}
                                 altName={device.name}
                                 icon={device.icon}
                              />
                           </SingleMenuItem>
                        )}
                     </div>
                  ),
            )}
         </Menu>
      </>
   )
}
