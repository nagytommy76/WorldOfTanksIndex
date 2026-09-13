import useGetCrewBoosters from '../Hooks/useGetCrewBoosters'
import SingleCrewBooster from './SingleCrewBooster'
import BaseBooster from '@/BattleBoosters//BaseBooster'

export default function CrewBattleBoosters() {
   const crewBoosters = useGetCrewBoosters()
   if (!crewBoosters) return

   return <BaseBooster boosters={crewBoosters} SingleBoosterComponent={SingleCrewBooster}></BaseBooster>
}
