import Image from 'next/image'
import hangar from '@/Imageshangar-bg.webp'

export default function Header({ tank_name }: { tank_name: string }) {
   return (
      <header className='min-h-[260px] relative lg:min-h-[750px] max-w-screen'>
         <Image
            className='absolute bottom-0 lg:top-0 left-0 -z-9'
            src={`https://eu-wotp.wgcdn.co/dcont/tankopedia_images/${tank_name.toLocaleLowerCase()}/${tank_name.toLocaleLowerCase()}_image.png`}
            alt={tank_name}
            width={1920}
            height={900}
         />
         <Image
            className='absolute bottom-0 lg:top-0 left-0 object-cover -z-10'
            src={hangar.src}
            alt={'Hangar background'}
            width={1920}
            height={900}
         />
      </header>
   )
}
