'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

import AccordionMenu from './AccordionMenu'

export default function DropdownMenu() {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   const [expanded, setExpanded] = useState<string | false>(false)

   const handleExpandChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
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
            Vehicles
         </Button>
         <Menu id='tech-tree-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
            <AccordionMenu
               expanded={expanded}
               handleExpandChange={handleExpandChange}
               handleClose={handleClose}
               path='techtree'
               accordionName='Tech Tree Tanks'
            />
            <AccordionMenu
               expanded={expanded}
               handleExpandChange={handleExpandChange}
               handleClose={handleClose}
               path='premium'
               accordionName='Premium Tanks'
            />
            <AccordionMenu
               expanded={expanded}
               handleExpandChange={handleExpandChange}
               handleClose={handleClose}
               path='collectors'
               accordionName='Collectors Tanks'
            />
            <AccordionMenu
               expanded={expanded}
               handleExpandChange={handleExpandChange}
               handleClose={handleClose}
               path='other'
               accordionName='Other Tanks'
            />
         </Menu>
      </div>
   )
}
