'use client'
import { useParams } from 'next/navigation'

import Hirschkafer from './Includes/Hirschkafer'
import Borkenkafer from './Includes/Borkenkafer'
import Taschenratte from './Includes/Taschenratte'

const TIER_XI_VEHICLES = [
   'G185_Leopard_120_Verbessert',
   'G187_Taschenratte',
   'G188_LeKpz_Borkenkafer',
   'G189_Hirschkafer',
   'Ch67_BZ_79',
   'F135_AS_XX_40_t',
   'F136_AMX_67_Imbattable',
   'Pl37_CS_67_Szakal',
   'S36_Strv_107_12',
   'GB147_FV4025_Contriver',
   'GB152_AT_FV230_Breaker',
   'A179_Black_Rock',
   'A182_T803',
   'A183_XM69_Hacker',
   'R228_KR_1',
   'R230_Object_432U',
] as const

export default function Mechanics({ mechanics }: { mechanics: Record<string, unknown> }) {
   const { tank_name } = useParams<{ tank_name: (typeof TIER_XI_VEHICLES)[number] }>()

   switch (tank_name) {
      case 'G189_Hirschkafer':
         return <Hirschkafer mechanics={mechanics} />
      case 'G188_LeKpz_Borkenkafer':
         return <Borkenkafer mechanics={mechanics} />
      case 'G187_Taschenratte':
         return <Taschenratte mechanics={mechanics} />

      default:
         break
   }
}
