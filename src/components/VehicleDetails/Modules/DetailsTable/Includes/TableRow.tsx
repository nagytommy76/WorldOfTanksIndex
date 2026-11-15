import Image from 'next/image'
import type { DiffDirection, IRowModifier } from '@/types/VehicleDetails/Modifiers'

import { getRowEffect, getRowTint } from '@/utils/helpers/modifierEffect'

import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

import Modifiers from './Modifiers'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} />
))(({}) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#3d3d49',
      borderRadius: '4px',
      padding: '15px',
   },
}))

const IMAGE_SIZE = 27

export default function TableRowComponent({
   titleText,
   valueText,
   unit,
   paddingLeft,
   iconSrc,
   toFixed = 4,
   TooltipTitle,
   modifiers = null,
   direction = 'higher-is-better',
}: {
   titleText: string
   valueText: number[] | number | string
   unit?: string
   toFixed?: number
   paddingLeft?: boolean
   iconSrc?: string
   TooltipTitle?: React.ReactNode
   modifiers?: IRowModifier[] | null
   /** Which sign of the difference is the good one. Gun Loading, Aiming Time, etc. are 'lower-is-better' */
   direction?: DiffDirection
}) {
   // sx instead of style, so the hover highlight still wins over the tint
   const rowTint = getRowTint(getRowEffect(modifiers, valueText, direction))

   return (
      <HtmlTooltip title={TooltipTitle}>
         <TableRow className='h-[30px]' sx={rowTint ? { backgroundColor: rowTint } : undefined} hover>
            <TableCell component='th' scope='row' className='px-0 py-1'>
               <div className={`${paddingLeft ? 'pl-7' : ''} flex felx-row items-center gap-2`}>
                  {iconSrc && (
                     <Image
                        src={iconSrc}
                        alt={titleText}
                        title={titleText}
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        className={`object-cover w-[${IMAGE_SIZE}px]`}
                     />
                  )}
                  <Typography variant='body2' fontSize={14}>
                     {titleText}
                  </Typography>
               </div>
            </TableCell>
            <TableCell align='right' className='px-1 py-1 '>
               <div className='flex flex-row justify-end gap-1 items-center'>
                  {modifiers && <Modifiers modifiers={modifiers} direction={direction} />}
                  <Typography className='text-white font-semibold' variant='subtitle1' fontSize={15}>
                     {typeof valueText === 'string' && valueText}
                     {typeof valueText === 'number' && parseFloat(valueText.toFixed(toFixed))}
                     {typeof valueText === 'object' &&
                        valueText.map((value, index) => (
                           <span key={index}>
                              {parseFloat(value.toFixed(toFixed))}{' '}
                              {index !== valueText.length - 1 && ' / '}{' '}
                           </span>
                        ))}
                  </Typography>
                  <Typography className='opacity-65' variant='subtitle2' fontSize={10}>
                     {unit}
                  </Typography>
               </div>
            </TableCell>
         </TableRow>
      </HtmlTooltip>
   )
}
