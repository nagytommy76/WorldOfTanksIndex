import type { SetStateAction } from 'react'
import type { OverlayTypes } from '../../Types'

/**
 * @description Only open the menu if:
 *  1. We are not blocked (fewer than 3 devices selected globally), OR
 *  2. This group already has a selection (the player wants to swap/deselect)
 * @param {boolean} isBlocked True when 3 devices are already selected globally AND this group has no current selection. Prevents opening the menu so the player cannot exceed the limit.
 * @param selectedDeviceTypeOverlay drives which overlay icon is shown on the button
 * @param setAnchorEl
 * @returns handleButtonClick void
 */
export default function handleButtonClick(
   isBlocked: boolean,
   selectedDeviceTypeOverlay: OverlayTypes,
   setAnchorEl: (value: SetStateAction<HTMLElement | null>) => void,
) {
   // True when this group has an active device chosen by the player
   const isSelected = selectedDeviceTypeOverlay !== 'none'

   const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isBlocked && !isSelected) return
      setAnchorEl(event.currentTarget)
   }

   return handleButtonClick
}
