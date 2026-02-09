import dbConnect from '@/lib/ConnectDB'
import { VehicleModel } from '@Models/TankModel'

import type { PopularTanksType } from '@Types/VehicleDetails/Vehicle'

import TankCard from '@/Base/TankCard/TankCard'
import Typography from '@mui/material/Typography'

async function getPopularTanks(): Promise<PopularTanksType[] | undefined> {
   try {
      await dbConnect()

      return await VehicleModel.find({
         xmlId: {
            $in: [
               'R228_KR_1',
               'R45_IS-7',
               'R159_SU_130PM',
               'R132_VNII_100LT',
               'G187_Taschenratte',
               'G121_Grille_15_L63',
               'G42_Maus',
               'G89_Leopard1',
               'G16_PzVIB_Tiger_II',
               'G176_Jagdpanzer_E90',
               'G189_Hirschkafer',
               'A182_T803',
               'A183_XM69_Hacker',
               'A191_Ares_90_C',
               'A179_Black_Rock',
               'A69_T110E5',
               'A128_concept_1b',
               'A189_Ares_90',
               'F97_ELC_EVEN_90',
               'F108_Panhard_EBR_105',
               'F18_Bat_Chatillon25t',
               'F136_AMX_67_Imbattable',
               'F116_Bat_Chatillon_Bourrasque',
               'GB142_FV230_Canopener',
               'GB100_Manticore',
               'GB106_Cobra',
               'Ch70_PTZ_78',
               'Ch67_BZ_79',
               'Ch48_BZ_75',
               'J40_Type_71',
               'J52_STK_2',
               'J20_Type_2605',
               'Cz34_Vz_71_Tesak',
               'Cz21_Vz_60S_Dravec',
               'Pl15_60TP_Lewandowskiego',
               'Pl37_CS_67_Szakal',
               'S36_Strv_107_12',
               'S11_Strv_103B',
               'It39_Coccodrillo',
               'It13_Progetto_M35_mod_46',
            ],
         },
      })
         .select([
            '_id',
            'id',
            'xmlId',
            'name',
            'type',
            'tier',
            'nation',
            'tags',
            'tankDetails.images',
            'tankDetails.short_name',
            'tankDetails.is_premium',
         ])
         .sort({ nation: -1, tier: -1, type: 1 })
         .lean()
   } catch (error) {
      console.log(error)
   }
}

export default async function PopularTanks() {
   const popularTanks = await getPopularTanks()
   return (
      <section id='popularTanks' className='max-w-[1200px] mx-auto'>
         <Typography variant='h4' className='font-semibold text-center mt-10 xl:text-5xl text-2xl'>
            Popular Vehicles
         </Typography>
         <section className='grid justify-center justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 my-10'>
            {popularTanks &&
               popularTanks.map((singleVehicle) => (
                  <TankCard key={singleVehicle._id} singleVehicle={singleVehicle} />
               ))}
         </section>
      </section>
   )
}
