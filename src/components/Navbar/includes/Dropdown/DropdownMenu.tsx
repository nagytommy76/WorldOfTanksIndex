'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

import Dropdown from './Dropdown'

export default function DropdownMenu() {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <div>
         <Button
            variant='text'
            id='tech-tree-menu-button'
            aria-controls={open ? 'tech-tree-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<KeyboardDoubleArrowDownIcon />}
         >
            Tech tree
         </Button>
         <Menu id='tech-tree-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
            <Dropdown />
         </Menu>
      </div>
   )
}
