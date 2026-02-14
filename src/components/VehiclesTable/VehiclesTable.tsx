'use client'
import { useState } from 'react'
import useFilteredVehicles from './Hooks/useFilteredVehicles'

import TankCard from '@/Base/TankCard/TankCard'
import ToggleVehicleType from './Includes/ToggleVehicleType'
import ToggleTier from './Includes/ToogleTier'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

export default function EnhancedTable() {
   const filteredVehicles = useFilteredVehicles()

   const allVehicleNames = filteredVehicles.map((vehicle) => vehicle.tankDetails?.short_name || vehicle.name)

   const [value, setValue] = useState<string | null>(allVehicleNames[0])
   const [inputValue, setInputValue] = useState('')

   return (
      <section className='max-w-[1200px] mx-auto'>
         <section className='w-full min-h-[50px] gap-2 bg-neutral-950 mt-10 flex flex-col md:flex-row items-center px-3 py-2 rounded-lg'>
            <ToggleVehicleType />
            <ToggleTier />
            <Autocomplete
               value={value}
               onChange={(_, newValue: string | null) => {
                  setValue(newValue)
               }}
               inputValue={inputValue}
               onInputChange={(_, newInputValue) => {
                  setInputValue(newInputValue)
               }}
               id='vehicle-search'
               options={allVehicleNames}
               sx={{ width: 250 }}
               renderInput={(params) => (
                  <TextField {...params} size='small' variant='standard' label='Search vehicle' />
               )}
            />
         </section>
         <section className='mx-3 xl:mx-0 grid justify-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 my-10'>
            {filteredVehicles.map((vehicle) => (
               <TankCard key={vehicle.id || vehicle.xmlId} singleVehicle={vehicle} />
            ))}
         </section>
      </section>
   )

   // return (
   //    <section className='w-4xl mx-auto my-11'>
   //       <Table
   //          className='min-w-[850px] p-1'
   //          aria-labelledby='Vehicles table'
   //          component={'table'}
   //          size={'medium'}
   //       >
   //          <EnhancedTableHead
   //             order={order}
   //             orderBy={orderBy}
   //             onRequestSort={handleRequestSort}
   //             rowCount={allVehicles.length}
   //          />
   //          <TableBody>
   //             {techTreeVehicles.map((vehicle) => {
   //                return (
   //                   <TableRow hover tabIndex={-1} key={vehicle.id || vehicle.xmlId} className='p-0'>
   //                      <TableCell padding='none'>
   //                         <Image
   //                            src={flagSources[vehicle.nation].source}
   //                            alt={flagSources[vehicle.nation].alt}
   //                            width={70}
   //                            height={70}
   //                            className='object-cover w-[45px]'
   //                         />
   //                      </TableCell>
   //                      <TableCell padding='none' align='center'>
   //                         <Tooltip title={retrunVehicleType(vehicle.type)} placement='top' arrow>
   //                            <Image src={getIcon(vehicle.type)} alt={vehicle.name} width={15} height={15} />
   //                         </Tooltip>
   //                      </TableCell>
   //                      <TableCell padding='none' align='left'>
   //                         <Typography>{tiers[Number(vehicle.tier - 1)]}</Typography>
   //                      </TableCell>
   //                      <TableCell padding='none' align='right'>
   //                         <div className={'flex flex-row items-center '}>
   //                            <Image
   // src={
   //    vehicle.tankDetails?.images.big_icon ||
   //    `
   //       http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/${vehicle.nation}-${vehicle.xmlId}.png
   //       `.trim() ||
   //    ''
   // }
   //                               width={112}
   //                               height={112}
   //                               alt={vehicle.name}
   //                               className='object-cover -translate-x-6'
   //                            />
   //                            <Typography variant='subtitle1'>
   //                               {vehicle.tankDetails?.name || vehicle.name}
   //                            </Typography>
   //                         </div>
   //                      </TableCell>
   //                      <PriceCell vehiclePrice={vehicle.price} />
   //                      {/* {vehicle.tankDetails && ( */}
   //                      <TableCell align='right'>
   //                         <Link
   //                            id={vehicle.id?.toString()}
   //                            href={`/${vehicle.id}/${vehicle.xmlId}/modules`}
   //                            key={vehicle.id}
   //                         >
   //                            <Button variant='contained'>More details</Button>
   //                         </Link>
   //                      </TableCell>
   //                      {/* )} */}
   //                   </TableRow>
   //                )
   //             })}
   //          </TableBody>
   //       </Table>
   //    </section>
   // )
}
