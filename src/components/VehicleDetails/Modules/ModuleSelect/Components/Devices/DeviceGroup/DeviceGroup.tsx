import useMenuHandler from './Hooks/useMenuHandler'
import useDeviceStates from './Hooks/useDeviceStates'

import ReturnFoundDevices from './Functions/ReturnFoundDevices'
import HandleButtonClick from './Functions/HandleButtonClick'

import type { IDevice } from '@/types/Devices/Devices'
import type { OverlayTypes } from '../Types'

import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'

import MenuItemOverlay from './Includes/MenuItemOverlay'
import SingleMenuItem from './Includes/SingleMenuItem'
import DeviceButton from './Includes/DeviceButton'
import TooltipTitle from './Includes/TooltipTitle'

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
   // ── Local state ──────────────────────────────────────────────────────────
   const foundDevices = ReturnFoundDevices(devices)
   // selectedDeviceType drives which overlay icon is shown on the button
   const { selectedDeviceTypeOverlay, setSelectedDeviceTypeOverlay, selectedDevice, setSelectedDevice } =
      useDeviceStates(foundDevices.tiers)
   const { anchorEl, setAnchorEl, open, handleMenuClose } = useMenuHandler()

   const handleButtonClick = HandleButtonClick(isBlocked, selectedDeviceTypeOverlay, setAnchorEl)

   // Called when the player picks an item (or "Deselect") from the dropdown
   function handleSelectAndClose(deviceType: OverlayTypes) {
      setAnchorEl(null)

      if (deviceType === 'none') {
         // ── Deselect ──────────────────────────────────────────────────────
         // Reset the button back to the default tiers icon
         setSelectedDevice(foundDevices.tiers)
         setSelectedDeviceTypeOverlay('none')
         // Notify parent: deviceId 0 means "remove this slot"
         addSelectedDevice(archeType, 0)
         return
      }

      const device = foundDevices[deviceType]
      if (!device) return // guard: variant doesn't exist for this archeType

      setSelectedDevice(device)
      setSelectedDeviceTypeOverlay(deviceType)
      // Notify parent with the real device id so it can track the selection
      addSelectedDevice(archeType, device.id)
   }

   if (!selectedDevice) return null
   return (
      <>
         <DeviceButton
            selectedDeviceTypeOverlay={selectedDeviceTypeOverlay}
            open={open}
            handleButtonClick={handleButtonClick}
            TooltipTitle={
               <TooltipTitle
                  modifiers={selectedDevice.modifiers}
                  aggregateModifiers={selectedDevice.aggregateModifiers}
               >
                  <Typography textAlign={'center'} variant='body1' gutterBottom className='font-bold'>
                     {selectedDeviceTypeOverlay === 'equipmentTrophyUpgraded'
                        ? `Upgraded ${selectedDevice.displayName}`
                        : selectedDevice.displayName}
                  </Typography>
               </TooltipTitle>
            }
         >
            <MenuItemOverlay
               overlayType={selectedDeviceTypeOverlay}
               altName={selectedDevice.name}
               icon={selectedDevice.icon}
            />
         </DeviceButton>
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
            <SingleMenuItem
               displayName={'Deselect equipment'}
               handleClose={() => handleSelectAndClose('none')}
            >
               <MenuItemOverlay overlayType='none' altName={'empty_loadout'} icon={'empty_loadout'} />
            </SingleMenuItem>
            {Object.entries(foundDevices).map(
               ([deviceType, device]) =>
                  device !== undefined && (
                     <SingleMenuItem
                        key={deviceType}
                        displayName={`
                           ${deviceType === 'equipmentTrophyUpgraded' ? 'Upgraded ' : ''}
                           ${device.displayName}
                           `}
                        handleClose={() => handleSelectAndClose(deviceType as OverlayTypes)}
                     >
                        <MenuItemOverlay
                           overlayType={deviceType as OverlayTypes}
                           altName={device.name}
                           icon={device.icon}
                        />
                     </SingleMenuItem>
                  ),
            )}
         </Menu>
      </>
   )
}
