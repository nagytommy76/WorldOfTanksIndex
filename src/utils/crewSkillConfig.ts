type MeasureType = 'percents' | 'seconds'

interface ICrewSkillConfig {
   /** Which field names in your flat object this modifier affects */
   fields: string[]
   /** percents  OR seconds */
   measureType: MeasureType
   isSituational: boolean
}

const CREW_SKILLS_MODIFIER_CONFIG: Record<string, ICrewSkillConfig> = {
   /**
    * COMMON SKILLS ---------------------------------------
    */
   maskingFactor: {
      fields: ['camouflageMoving', 'camouflageStill'],
      measureType: 'percents',
      isSituational: false,
   },
   /**
    * COMMANDER SKILLS ---------------------------------------
    */
   /**
    * @param commander_eagleEye - RECON
    */
   circularVisionRadius: {
      fields: ['viewRange'],
      measureType: 'percents',
      isSituational: false,
   },
   /**
    * @param commander_coordination - COORDINATION * situational
    */
   vehicleGunAimSpeed: {
      fields: ['aimingTime'],
      measureType: 'percents',
      isSituational: true,
   },
   /**
    * @param commander_emergency - EMERGENCY * situational
    * @param commander_holdLine - HOLD THE LINE * situational
    * @param commander_staySharp - STAY SHARP * situational
    */
   crewLevelIncrease: {
      fields: ['crewLevel'],
      measureType: 'percents',
      isSituational: true,
   },
   /**
    * LOADER SKILLS ---------------------------------------
    */
}

export default CREW_SKILLS_MODIFIER_CONFIG
