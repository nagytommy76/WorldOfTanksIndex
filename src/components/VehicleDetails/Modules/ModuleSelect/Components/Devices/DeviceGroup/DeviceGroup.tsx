import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'
import { DeviceContext } from '@/DevicesContext/DeviceContext'

import useMenuHandler from './Hooks/useMenuHandler'
import useDeviceStates from './Hooks/useDeviceStates'
import useCheckDevices from './Hooks/useCheckDevices'

import useSelectAndClose from './Hooks/useSelectAndClose'
import useSetCloseNone from './Hooks/useSetCloseNone'
import useSupplyActive from './Hooks/useSupplyActive'

import ReturnFoundDevices from './Functions/ReturnFoundDevices'

import type { IDevice } from '@/types/Devices/Devices'
import type { OverlayTypes, DeviceTypes } from '../Types'
import type { DeviceModifierKeys } from '@/VehicleContext/DevicesContext/Types'

import Menu from '@mui/material/Menu'

import MenuItemOverlay from './Includes/MenuItemOverlay'
import SingleMenuItem from './Includes/SingleMenuItem'
import SingleDeviceButton from './Includes/SingleDevicebutton/SingleDeviceButton'
import MenuTooltip from './Includes/MenuTooltip'

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
}: {
   archeType: DeviceModifierKeys
   devices: IDevice[]
   isBlocked: boolean
}) {
   const { supplySlotCategory, vehicleType } = useContext(VehicleContext)
   const {
      deviceReducer: { incompatibleDevices },
   } = useContext(DeviceContext)

   // ── Local state ──────────────────────────────────────────────────────────
   const foundDevices = ReturnFoundDevices(devices)

   // selectedDeviceType drives which overlay icon is shown on the button
   const { selectedDeviceTypeOverlay, setSelectedDeviceTypeOverlay, selectedDevice, setSelectedDevice } =
      useDeviceStates(foundDevices.tiers || foundDevices.equipmentModernized_1)
   const { anchorEl, setAnchorEl, open, handleMenuClose } = useMenuHandler()
   useCheckDevices(foundDevices, archeType, setSelectedDeviceTypeOverlay)
   const handleSelectAndClose = useSelectAndClose(
      foundDevices,
      archeType,
      setAnchorEl,
      setSelectedDevice,
      setSelectedDeviceTypeOverlay,
   )
   const selectAndCloseNoneDeviceType = useSetCloseNone(
      selectedDevice,
      foundDevices,
      archeType,
      setAnchorEl,
      setSelectedDevice,
      setSelectedDeviceTypeOverlay,
   )
   const supplySlotActiveSelectAndClose = useSupplyActive(
      vehicleType,
      foundDevices,
      archeType,
      setAnchorEl,
      setSelectedDevice,
      setSelectedDeviceTypeOverlay,
   )

   if (!selectedDevice) return null
   return (
      <>
         <SingleDeviceButton
            isBlocked={
               isBlocked ||
               (incompatibleDevices?.includes(selectedDevice.tags[0]) &&
                  selectedDeviceTypeOverlay === 'none') ||
               false
            }
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
                              <MenuTooltip
                                 key={deviceType}
                                 DisplayTextComponent={device.displayName}
                                 aggregateModifiers={device.aggregateModifiers}
                                 modifiers={device.modifiers}
                                 price={device.price}
                                 selectedDeviceTypeOverlay={'tiers'}
                              >
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
                              </MenuTooltip>

                              {/**
                               * IF We have MOBILITY supplySlotCategory inside VehicleContext.
                               * If TIERS device has this category, Use specValue of device.modifiers array.
                               */}
                              {supplySlotCategory &&
                                 foundDevices.tiers?.categories &&
                                 foundDevices.tiers?.categories?.includes(supplySlotCategory) && (
                                    <MenuTooltip
                                       DisplayTextComponent={`${foundDevices.tiers.displayName} (in ${supplySlotCategory} slot)`}
                                       aggregateModifiers={foundDevices.tiers.aggregateModifiers}
                                       modifiers={foundDevices.tiers.modifiers}
                                       price={foundDevices.tiers.price}
                                       selectedDeviceTypeOverlay={'supplySlotActive'}
                                    >
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
                                    </MenuTooltip>
                                 )}
                           </>
                        ) : (
                           <MenuTooltip
                              DisplayTextComponent={
                                 (deviceType as OverlayTypes) === 'equipmentTrophyUpgraded'
                                    ? `Upgraded ${device.displayName}`
                                    : device.displayName
                              }
                              aggregateModifiers={device.aggregateModifiers}
                              modifiers={device.modifiers}
                              price={device.price}
                              selectedDeviceTypeOverlay={deviceType as OverlayTypes}
                           >
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
                           </MenuTooltip>
                        )}
                     </div>
                  ),
            )}
         </Menu>
      </>
   )
}
