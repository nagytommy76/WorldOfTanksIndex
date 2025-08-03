import Image from 'next/image'

// https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=fefeeb22948e9ab6ed8c62a09515d476&tank_id=9745
// https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=fefeeb22948e9ab6ed8c62a09515d476&tank_id=9745

// Big tank image: Vehicle tag: "tag": "G89_Leopard1" -> .toLocaleLowerCase() method needed
// https://eu-wotp.wgcdn.co/dcont/tankopedia_images/g89_leopard1/g89_leopard1_image_resized.png

export default async function page({ params }: { params: Promise<{ tank_id: string; tank_name: string }> }) {
   const { tank_id, tank_name } = await params
   return (
      <div>
         <Image
            src={`https://eu-wotp.wgcdn.co/dcont/tankopedia_images/${tank_name.toLocaleLowerCase()}/${tank_name.toLocaleLowerCase()}_image_resized.png`}
            alt={tank_name}
            width={700}
            height={700}
         />
         <h1>Tank data</h1>
         <h1>{tank_id}</h1>
      </div>
   )
}
