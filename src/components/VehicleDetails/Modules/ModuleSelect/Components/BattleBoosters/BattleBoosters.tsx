import type { IDevice } from '@/types/Devices/Devices'

import BaseBooster from '@/BattleBoosters/BaseBooster'
import SingleBooster from './SingleBooster'

export default function BattleBoosters({ battleBoosters }: { battleBoosters: IDevice[] }) {
   return <BaseBooster boosters={battleBoosters} SingleBoosterComponent={SingleBooster}></BaseBooster>
}
