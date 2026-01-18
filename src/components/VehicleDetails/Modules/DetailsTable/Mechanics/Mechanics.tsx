'use client'
import { useParams } from 'next/navigation'
import type {
   BorkenkaferMechanics,
   HirschkaferMechanics,
   Leo120Mechanics,
   TaschenratteMechanics,
   Kr1Mechanics,
   Obj432UMechanics,
   T803Mechanics,
   HackerMechanics,
   BreakerMechanics,
   Bz79Mechanics,
   SzakalMechanics,
   Strv107Mechanics,
   AresLineMechanics,
   Ptz78Mechanics,
} from './Types'

import Hirschkafer from './Includes/Hirschkafer'
import Borkenkafer from './Includes/Borkenkafer'
import Taschenratte from './Includes/Taschenratte'
import Leo120 from './Includes/Leo120'
// USSR-----------
import Kr1 from './Includes/ussr/Kr1'
import Obj432u from './Includes/ussr/obj432u'
// USA --------------
import T803 from './Includes/usa/T803'
import Hacker from './Includes/usa/Hacker'
import AresLine from './Includes/usa/AresLine'
// UK --------------
import Breaker from './Includes/uk/Breaker'
// China --------------
import Bz79 from './Includes/china/Bz79'
import PTZ78 from './Includes/china/PTZ78'
// Poland --------------
import Szakal from './Includes/poland/Szakal'
// Sweden --------------
import Strv107 from './Includes/sweden/Strv107'

const TIER_XI_VEHICLES = [
   'G185_Leopard_120_Verbessert',
   'G187_Taschenratte',
   'G188_LeKpz_Borkenkafer',
   'G189_Hirschkafer',
   'Ch67_BZ_79',
   'Ch70_PTZ_78',
   'J52_STK_2',
   'F135_AS_XX_40_t',
   'F136_AMX_67_Imbattable',
   'Pl37_CS_67_Szakal',
   'S36_Strv_107_12',
   'GB147_FV4025_Contriver',
   'GB152_AT_FV230_Breaker',
   'R228_KR_1',
   'R230_Object_432U',
   'A179_Black_Rock',
   'A182_T803',
   'A183_XM69_Hacker',
   'A187_Ares_75',
   'A188_Ares_MTB',
   'A189_Ares_90',
   'A190_Ares_85',
   'A191_Ares_90_C',
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
      case 'A182_T803':
         return <T803 mechanics={mechanics as T803Mechanics} />
      case 'A183_XM69_Hacker':
         return <Hacker mechanics={mechanics as HackerMechanics} />
      case 'GB152_AT_FV230_Breaker':
         return <Breaker mechanics={mechanics as BreakerMechanics} />
      case 'Ch67_BZ_79':
         return <Bz79 mechanics={mechanics as Bz79Mechanics} />
      case 'Ch70_PTZ_78':
         return <PTZ78 mechanics={mechanics as Ptz78Mechanics} />
      case 'Pl37_CS_67_Szakal':
         return <Szakal mechanics={mechanics as SzakalMechanics} />
      case 'S36_Strv_107_12':
         return <Strv107 mechanics={mechanics as Strv107Mechanics} />
      case 'A191_Ares_90_C':
      case 'A190_Ares_85':
      case 'A189_Ares_90':
      case 'A188_Ares_MTB':
      case 'A187_Ares_75':
         return <AresLine mechanics={mechanics as AresLineMechanics} />
      default:
         return null
   }
}
