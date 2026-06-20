import type { ICrewRoles } from '@/Classes/CrewSkills'

type AffectedFields = {
   [crewRole in ICrewRoles]: string[]
}

const affectedFields: AffectedFields = {
   commander: ['vehicleCircularVisionRadius'],
   driver: ['vehicleAllGroundRotationSpeed', 'vehicleSpeedGain'],
   gunner: [
      'vehicleGunAimSpeed',
      'vehicleGunShotFullDispersion',
      'vehicleTurretOrCuttingRotationSpeed',
      'vehicleGunShotDispersion',
   ],
   loader: ['vehicleGunReloadTime'],
   radioman: ['vehicleRadioCircularVisionRadius'],
}

export default affectedFields
