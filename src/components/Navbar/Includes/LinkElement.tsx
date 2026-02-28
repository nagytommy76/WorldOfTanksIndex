import Link from 'next/link'

import Typography from '@mui/material/Typography'

export default function LinkElement({
   href,
   text,
   onClose,
}: {
   href: string
   text: string
   onClose?: () => void
}) {
   return (
      <Link onClick={onClose} href={href} className='hover:text-amber-400 transition-colors duration-150'>
         <Typography variant='body1'>{text}</Typography>
      </Link>
   )
}
