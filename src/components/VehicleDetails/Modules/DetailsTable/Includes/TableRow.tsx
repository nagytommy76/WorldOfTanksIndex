import Image from 'next/image'

import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} />
))(({}) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#3d3d49',
      borderRadius: '4px',
      padding: '15px',
   },
}))

const IMAGE_SIZE = 32

export default function TableRowComponent({
   titleText,
   valueText,
   unit,
   paddingLeft,
   iconSrc,
   TooltipTitle,
}: {
   titleText: string
   valueText: string | number
   unit?: string
   paddingLeft?: boolean
   iconSrc?: string
   TooltipTitle?: React.ReactNode
}) {
   return (
      <HtmlTooltip title={TooltipTitle}>
         <TableRow className='h-[20px] ' hover>
            <TableCell component='th' scope='row' className='px-1'>
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
                  <Typography variant='body2' fontSize={14} sx={{ opacity: 0.85 }}>
                     {titleText}
                  </Typography>
               </div>
            </TableCell>
            <TableCell align='right' className='px-1'>
               <div className='flex flex-row justify-end gap-1 items-center'>
                  <Typography className='text-white font-semibold' variant='subtitle1' fontSize={15}>
                     {valueText}
                  </Typography>
                  <Typography className='opacity-65' variant='subtitle2' fontSize={11}>
                     {unit}
                  </Typography>
               </div>
            </TableCell>
         </TableRow>
      </HtmlTooltip>
   )
}
