import Header from '@/VehicleDetails/Header'
import Modules from '@/VehicleDetails/Modules'

// https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=fefeeb22948e9ab6ed8c62a09515d476&tank_id=9745
// https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=fefeeb22948e9ab6ed8c62a09515d476&tank_id=9745

// Big tank image: Vehicle tag: "tag": "G89_Leopard1" -> .toLocaleLowerCase() method needed
// https://eu-wotp.wgcdn.co/dcont/tankopedia_images/g89_leopard1/g89_leopard1_image.png

async function getModulesTree(tank_id: string | number) {
   const filteredData = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/
      ?application_id=${process.env.WOT_APP_ID}
      &fields=radios%2Csuspensions%2Cengines%2Ccrew%2Cguns%2Cdescription%2Cnext_tanks%2Cmodules_tree%2Cnation%2Ctier%2Cdefault_profile%2Cturrets&tank_id=${tank_id}`,
      { method: 'GET' }
   )
   const response = (await filteredData.json()) as Promise<{
      data: { [tank_id: number]: { description: string; modules_tree: { [module_id: number]: any } } }
   }>
   return await response
}

export default async function page({ params }: { params: Promise<{ tank_id: string; tank_name: string }> }) {
   const { tank_id, tank_name } = await params
   const { data: modulesTree } = await getModulesTree(tank_id)

   return (
      <section className='min-h-screen'>
         <Header
            tank_id={tank_id}
            tank_name={tank_name}
            description={modulesTree[Number(tank_id)].description}
         />
         <Modules modulesTree={modulesTree} tank_id={tank_id} />
      </section>
   )
}
