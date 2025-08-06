import Image from 'next/image'
import hangar from '@/Imageshangar-bg.webp'

export default function Header({
   tank_id,
   tank_name,
   description,
}: {
   tank_id: string
   tank_name: string
   description: string
}) {
   return (
      <header className='min-h-[600px] relative'>
         <Image
            className='absolute top-0 left-0'
            src={`https://eu-wotp.wgcdn.co/dcont/tankopedia_images/${tank_name.toLocaleLowerCase()}/${tank_name.toLocaleLowerCase()}_image.png`}
            alt={tank_name}
            width={1500}
            height={900}
         />
         <Image
            className='absolute top-0 left-0 object-cover -z-10'
            src={hangar.src}
            alt={tank_name}
            width={1920}
            height={900}
         />
         <h1>{description}</h1>
         <h1>{tank_id}</h1>
      </header>
   )
}
