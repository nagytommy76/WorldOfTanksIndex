'use client'
import useModal from './Hooks/useModal'
import useHandleTextField from './Hooks/useHandleTextField'
import useSendRequest from './Hooks/useSendRequest'

import Button from '@mui/material/Button'

import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import VehicleElements from './Includes/VehicleElements'

export default function SearchBar() {
   const { open, handleOpen, handleClose } = useModal()
   const { inputValue, isEnabled, debouncedInputValue, handleOnChange } = useHandleTextField()
   const data = useSendRequest(debouncedInputValue, isEnabled)

   return (
      <section>
         <Button onClick={handleOpen} variant='contained' color='primary'>
            Search for Vehicles
         </Button>
         <Modal
            disableRestoreFocus
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
               backdrop: {
                  timeout: 500,
               },
            }}
         >
            <Fade in={open}>
               <Paper className='absolute top-[10%] left-[50%] translate-x-[-50%] p-5 xl:w-[650px] w-full'>
                  <TextField
                     id='search-for-vehicles'
                     label='Search for vehicles'
                     autoComplete='list'
                     variant='outlined'
                     placeholder='Search for vehicles'
                     type='search'
                     autoFocus={true}
                     focused
                     fullWidth
                     value={inputValue}
                     onChange={handleOnChange}
                  />
                  {data && data.foundTanks.length > 0 ? (
                     <VehicleElements handleClose={handleClose} foundTanks={data.foundTanks} />
                  ) : (
                     <>
                        <p className='mt-4 text-center'>No vehicles found.</p>
                     </>
                  )}
               </Paper>
            </Fade>
         </Modal>
      </section>
   )
}
