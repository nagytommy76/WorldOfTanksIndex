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
         <Image
            src={isGold ? '/icons/money_gold.webp' : '/icons/money_silver.webp'}
            alt={isGold ? 'Gold' : 'Credits'}
            width={25}
            height={25}
            className='object-cover w-[30px]'
         />
         <Typography variant='subtitle2' color={isGold ? 'primary' : ''} className='text-xs'>
            {isGold
               ? (vehiclePrice as { gold: number }).gold.toLocaleString()
               : (vehiclePrice as number).toLocaleString()}{' '}
         </Typography>
      </div>
   )
}

export default function PriceCell({ vehiclePrice }: { vehiclePrice: number | { gold: number | null } }) {
   if (vehiclePrice === null) return null
   return (
      <>
         {typeof vehiclePrice === 'number' ? (
            <Price vehiclePrice={vehiclePrice} />
         ) : vehiclePrice.gold !== null ? (
            <Price vehiclePrice={vehiclePrice} isGold />
         ) : (
            <Price vehiclePrice={0} />
         )}
      </>
   )
}
