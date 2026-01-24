import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

function Price({
   vehiclePrice,
   isGold = false,
}: {
   vehiclePrice: number | { gold: number | null }
   isGold?: boolean
}) {
   return (
      <div className='flex flex-row items-center gap-1'>
         <Typography variant='subtitle2' color={isGold ? 'primary' : ''}>
            {isGold
               ? (vehiclePrice as { gold: number }).gold.toLocaleString()
               : (vehiclePrice as number).toLocaleString()}{' '}
         </Typography>
         <Image
            src={isGold ? '/icons/money_gold.webp' : '/icons/money_silver.webp'}
            alt={isGold ? 'Gold' : 'Credits'}
            width={30}
            height={30}
            className='object-cover w-[30px]'
         />
      </div>
   )
}

export default function PriceCell({ vehiclePrice }: { vehiclePrice: number | { gold: number | null } }) {
   if (vehiclePrice === null) return null
   return (
      <TableCell padding='none'>
         {typeof vehiclePrice === 'number' ? (
            <Price vehiclePrice={vehiclePrice} />
         ) : (
            vehiclePrice.gold !== null && <Price vehiclePrice={vehiclePrice} isGold />
         )}
      </TableCell>
   )
}
