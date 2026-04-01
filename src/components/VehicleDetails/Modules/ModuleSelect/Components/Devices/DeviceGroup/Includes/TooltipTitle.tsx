import { useContext } from 'react'
import { VehicleContext } from '@/VehicleContext/VehicleContext'

import Typography from '@mui/material/Typography'
import type { IAggregateModifier, IModifier } from '@/types/Devices/Devices'
import type { OverlayTypes } from '../../Types'

export default function TooltipTitle({
   selectedDeviceTypeOverlay,
   aggregateModifiers,
   modifiers,
   children,
}: {
   modifiers: IModifier[] | null
   aggregateModifiers: IAggregateModifier[] | null
   children: React.ReactNode
   selectedDeviceTypeOverlay: OverlayTypes
}) {
   const { vehicleType } = useContext(VehicleContext)
   return (
      <section className='min-w-[260px] min-h-[100px] p-3 bg-[#222222]'>
         {children}
         <div>
            {aggregateModifiers && (
               <>
                  {aggregateModifiers.map((aggregateModifier, index) => (
                     <div key={index}>
                        {aggregateModifier.vehicleTypes.includes(vehicleType) && (
                           <>
                              {aggregateModifier.specValue &&
                              selectedDeviceTypeOverlay === 'supplySlotActive' ? (
                                 <Typography variant='body2'>
                                    {
                                       ReturnModifierDisplayString(aggregateModifier.specValue)[
                                          aggregateModifier.name
                                       ]
                                    }
                                 </Typography>
                              ) : (
                                 <Typography variant='body2'>
                                    {
                                       ReturnModifierDisplayString(aggregateModifier.value)[
                                          aggregateModifier.name
                                       ]
                                    }
                                 </Typography>
                              )}
                           </>
                        )}
                     </div>
                  ))}
               </>
            )}
            {modifiers && (
               <>
                  {modifiers.map((modifier, index) => (
                     <div key={index}>
                        {modifier.specValue && selectedDeviceTypeOverlay === 'supplySlotActive' ? (
                           <Typography variant='body2'>
                              {ReturnModifierDisplayString(modifier.specValue)[modifier.name]}
                           </Typography>
                        ) : (
                           <Typography variant='body2'>
                              {ReturnModifierDisplayString(modifier.value)[modifier.name]}
                           </Typography>
                        )}
                     </div>
                  ))}
               </>
            )}
         </div>
      </section>
   )
}
type ModifierDisplayString = {
   [key: string]: string
}

function ReturnModifierDisplayString(value: number | string): ModifierDisplayString {
   if (typeof value === 'string') value = Number(value)
   const percentValue = (value - 1) * 100
   const transformValue = Math.round(percentValue * 100) / 100
   return {
      vehicleCamouflage: `+${transformValue}% to concealment`,
      vehicleStillCamouflage: `+${transformValue}% to concealment while stationary`,
      vehicleStillCamouflageDeluxe: `+${transformValue}% to concealment while stationary`,
      /**
       * @description Ventillation
       */
      crewLevel: `+${transformValue}% to crew level`,
      /**
       * Modifiers - Gun Rammer
       */
      vehicleGunReloadTime: `${transformValue}% to reload time`,
      /**
       * @description Spall liner
       */
      vehicleHEShellDamageResistance: `${transformValue}% to HE shell damage`,
      vehicleRamDamageResistance: `${transformValue}% to ramming damage`,
      crewHitChance: `+${transformValue}% to crew protection from injuries`,
      crewStunDuration: `${transformValue}% stun duration`,
      crewRepeatedStunDuration: `${transformValue}% additional stun duration if already stunned`,
      /**
       * @description Optics
       */
      vehicleCircularVisionRadius: `+${transformValue}% to view range`,
      /**
       * @description Binoculars
       */
      vehicleStillCircularVisionRadius: `+${transformValue}% to view range while stationary`,
      vehicleStillCircularVisionRadiusDeluxe: `+${transformValue}% to view range while stationary`,
      /**
       * @description CVS
       */
      demaskFoliageFactor: `${transformValue}% to concealment of enemy vehicles behind foliage`,
      demaskMovingFactor: `${transformValue}% to concealment of moving enemy vehicles`,
      /**
       * @description Improved Radio Set
       */
      vehicleEnemySpottingTime: `+${value}s duration an enemy vehicle is visible`,
      vehicleOwnSpottingTime: `${value}s duration you are visible to enemy vehicles`,
      /**
       * @description Gun laying drive
       */
      vehicleGunAimSpeed: `+${transformValue}% to aiming speed`,
      /**
       * @description Vertical Stabilizer
       */
      vehicleGunShotDispersion: `${transformValue}% to dispersion during movement and traverse`,
      /**
       * @description Hardening (HP boost)
       */
      vehicleStrength: `+${transformValue}% to hit points`,
      vehicleChassisStrength: `+${transformValue}% to suspension durability`,
      vehicleChassisRepairSpeed: `+${transformValue}% to suspension repair speed`,
      vehicleChassisFallDamage: `${transformValue}% to collision damage`,
      /**
       * @description Additional Grousers
       */
      vehicleAllGroundRotationSpeed: `+${transformValue}% to vehicle traverse speed`,
      vehicleSpeedGain: `+${transformValue}% to maintaining speed when moving across any terrain type`,
      /**
       * @description Modified Configuration
       */
      vehicleRepairSpeed: `+${transformValue}% to repair speed`,
      vehicleAmmoBayEngineFuelStrength: `+${transformValue}% to ammo rack, fuel rank, and engine durability`,
      vehPenaltyForDamagedEngine: `${transformValue}% to engine power penalty when damaged`,
      vehPenaltyForDamagedAmmorack: `${transformValue}% to ammo rack durability penalty when damaged`,
      vehicleFireChance: `${transformValue}% chance of engine fire`,
      /**
       * @description Improved Rotation Mechanism
       */
      vehicleTurretOrCuttingRotationSpeed: `+${transformValue}% to hull traverse speed`,
      /**
       * @description Improved Aiming
       */
      vehicleGunShotFullDispersion: `${transformValue}% to aiming circle size`,
      /**
       * @description Turbocharger
       */
      vehicleEnginePower: `+${transformValue}% to engine power`,
      vehicleForwardMaxSpeed: `+${value}km/h to top forward speed`,
      vehicleBackwardMaxSpeed: `+${value}km/h to top backward speed`,
   }
}
