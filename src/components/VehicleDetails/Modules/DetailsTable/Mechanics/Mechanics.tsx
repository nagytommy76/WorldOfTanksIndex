'use client'
import { useParams } from 'next/navigation'
import type {
   BorkenkaferMechanics,
   HirschkaferMechanics,
   Leo120Mechanics,
   TaschenratteMechanics,
   Kr1Mechanics,
   Obj432UMechanics,
} from './Types'

import Hirschkafer from './Includes/Hirschkafer'
import Borkenkafer from './Includes/Borkenkafer'
import Taschenratte from './Includes/Taschenratte'
import Leo120 from './Includes/Leo120'
// USSR-----------
import Kr1 from './Includes/ussr/Kr1'
import Obj432u from './Includes/ussr/obj432u'

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
         return <Hirschkafer mechanics={mechanics as HirschkaferMechanics} />
      case 'G188_LeKpz_Borkenkafer':
         return <Borkenkafer mechanics={mechanics as BorkenkaferMechanics} />
      case 'G187_Taschenratte':
         return <Taschenratte mechanics={mechanics as TaschenratteMechanics} />
      case 'G185_Leopard_120_Verbessert':
         return <Leo120 mechanics={mechanics as Leo120Mechanics} />
      case 'R228_KR_1':
         return <Kr1 mechanics={mechanics as Kr1Mechanics} />
      case 'R230_Object_432U':
         return <Obj432u mechanics={mechanics as Obj432UMechanics} />

      default:
         return null
   }
}
