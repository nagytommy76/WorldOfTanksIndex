import { useState } from 'react'

export default function useMenuHandler() {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)

   /**
    * @description
    * Called when the Menu closes without a selection (backdrop click / Escape).
    * We intentionally do NOT change selectedDeviceType here — the player didn't
    * actually pick anything, so the button state must stay as-is.
    */
   const handleMenuClose = () => {
      setAnchorEl(null)
   }

   return { anchorEl, setAnchorEl, open, handleMenuClose }
}
