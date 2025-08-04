import Image from 'next/image'
import hangar from '@/Imageshangar-bg.webp'

// https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=fefeeb22948e9ab6ed8c62a09515d476&tank_id=9745
// https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=fefeeb22948e9ab6ed8c62a09515d476&tank_id=9745

// Big tank image: Vehicle tag: "tag": "G89_Leopard1" -> .toLocaleLowerCase() method needed
// https://eu-wotp.wgcdn.co/dcont/tankopedia_images/g89_leopard1/g89_leopard1_image.png

async function getModulesTree(tank_id: string | number) {
   const filteredData = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${process.env.WOT_APP_ID}&fields=radios%2Csuspensions%2Cengines%2Ccrew%2Cguns%2Cdescription%2Cnext_tanks%2Cmodules_tree%2Cnation%2Ctier%2Cdefault_profile%2Cturrets&tank_id=${tank_id}`,
      { method: 'GET' }
   )
   const response = (await filteredData.json()) as Promise<{
      data: { [tank_id: number]: any }
   }>
   return await response
}

export default async function page({ params }: { params: Promise<{ tank_id: string; tank_name: string }> }) {
   const { tank_id, tank_name } = await params
   const modulesTree = await getModulesTree(tank_id)

   console.log(modulesTree)
   return (
      <section className='min-h-screen'>
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
            <h1>Tank data</h1>
            <h1>{tank_id}</h1>
         </header>
      </section>
   )
}
