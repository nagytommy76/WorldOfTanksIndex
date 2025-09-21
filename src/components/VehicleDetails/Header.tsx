import Image from 'next/image'
import Typography from '@mui/material/Typography'

import hangar from '@/Imageshangar-bg.webp'

export default function Header({ tank_name, description }: { tank_name: string; description: string }) {
   return (
      <header className='min-h-[260px] relative lg:min-h-[600px]'>
         <Image
            className='absolute bottom-0 lg:top-0 left-0 -z-9'
            src={`https://eu-wotp.wgcdn.co/dcont/tankopedia_images/${tank_name.toLocaleLowerCase()}/${tank_name.toLocaleLowerCase()}_image.png`}
            alt={tank_name}
            width={1500}
            height={900}
         />
         <Image
            className='absolute bottom-0 lg:top-0 left-0 object-cover -z-10'
            src={hangar.src}
            alt={tank_name}
            width={1920}
            height={900}
         />
         <Typography variant='body2'>{description}</Typography>
      </header>
   )
}
