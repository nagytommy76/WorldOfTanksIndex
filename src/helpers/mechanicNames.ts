export type MechanicNameKey =
   | 'rechargeableNitro'
   | 'stagedJetBoosters'
   | 'overheatStacks'
   | 'targetDesignator'
   | 'accuracyStacks'
   | 'supportWeapon'
   | 'improvedRamming'
   | 'chargeShot'
   | 'battleFury'
   | 'concentrationMode'
   | 'reactiveDebuffs'
   | 'chargeableBurst'
   | 'powerMode'
   | 'twinGun'
   | 'stanceDance'
   | 'pillboxSiegeMode'
   | 'stationaryReload'
   | 'extraShotClip'
   | 'heatingZonesGun'

const MECHANIC_NAMES: Record<
   MechanicNameKey,
   {
      name: string
      description: string
      icon: string
   }
> = {
   /**
    * @description China Ch67_BZ_79
    */
   rechargeableNitro: {
      name: 'Liquid Fuel Boosters',
      description:
         'Activate the Liquid Fuel Boosters at any time for a burst of speed when you need it most. The boosters heat up and must cool down before they can be reused, while exceeding the critical heat level will temporarily disable them completely.',
      icon: 'rechargeableNitro',
   },
   /**
    * @description China Ch70_PTZ_78
    */
   stagedJetBoosters: {
      name: 'Sequential Rocket Thrusters',
      description:
         'Solid-fuel thrusters that boost acceleration, mobility, and maneuverability for several seconds. The left and right thrusters can work independently of each other for faster hull traverse, and do not restrict reverse capability.',
      icon: 'stagedJetBoosters',
   },
   /**
    * @description Germany G189_Hirschkafer
    */
   overheatStacks: {
      name: 'Propellant Thermal Control System',
      description:
         'Remain stationary or move slowly to build preheat, increasing your next shot’s damage and accuracy. At maximum preheat, penetrating an enemy with fewer HP than your average damage causes an ammo rack explosion, destroying the vehicle.',
      icon: 'overheatStacks',
   },
   /**
    * @description Germany G188_LeKpz_Borkenkafer
    */
   targetDesignator: {
      name: 'Laser Target Designator',
      description:
         "Your next shot applies an effect based on the enemy's spotting status. Hitting a spotted enemy will mark them—they will remain spotted longer and receive more damage. Hitting an unspotted enemy will highlight their location with a special marker.",
      icon: 'targetDesignator',
   },
   /**
    * @description Germany G185_Leopard_120_Verbessert
    */
   accuracyStacks: {
      name: 'Analog Ballistic Computing Device',
      description:
         "By remaining stationary or moving slowly, you build accuracy levels to improve your next shot's precision. At the highest accuracy level, you gain decent gun handling, with reduced dispersion even during movement or turret/hull traverse.",
      icon: 'accuracyStacks',
   },
   /**
    * @description Germany G187_Taschenratte
    */
   supportWeapon: {
      name: 'Auxiliary Weapons',
      description:
         "Pressing the activation button fires your vehicle's auxiliary weapons at the target. This additional firepower comes with its own reload cycle, independent of the main gun.",
      icon: 'supportWeapon',
   },
   /**
    * @description Russian R228_KR_1
    */
   improvedRamming: {
      name: 'Ramming Configuration',
      description:
         'Drawing on design experience from earlier models, this vehicle is specially configured for deadly ramming attacks. Structural reinforcements allow it to deal more damage when ramming enemy vehicles, giving an upper hand in close-quarters encounters.',
      icon: 'improvedRamming',
   },
   /**
    * @description Russian R230_Object_432U
    */
   chargeShot: {
      name: 'Thermo-Ballistic Overcharge',
      description:
         'If your gun is loaded, you can start heating your next shot for increased damage—the higher the heat level, the greater the effect. At maximum heat, you have several seconds to fire—if you do not, you will be temporarily unable to shoot.',
      icon: 'chargeShot',
   },
   /**
    * @description American A182_T803
    */
   battleFury: {
      name: 'Semi-Automatic Ammo Rack',
      description:
         "Every time you hit an enemy with a shell, you gain a reload efficiency level, temporarily boosting your gun's reload speed. Levels accumulate with each hit. Destroying an enemy vehicle with a shell grants additional reload efficiency levels.",
      icon: 'battleFury',
   },
   /**
    * @description American A183_XM69_Hacker
    */
   concentrationMode: {
      name: 'Pneumatic Gyro-Stabilizer',
      description:
         'The Pneumatic Gyro-Stabilizer grants maximum stabilization during movement, hull traverse, and turret traverse, allowing for more accurate firing, as well as rapid response to sudden threats and effective engagement from cover.',
      icon: 'concentrationMode',
   },
   /**
    * @description American A191_Ares_90_C
    */
   reactiveDebuffs: {
      name: 'Thermal Overheated Control Autocannon',
      description:
         'The gun can fire continuously without the need for reload. Each shot generates heat: the higher its temperature, the more some of its parameters change. Continuous firing will cause the gun to overheat, preventing further firing until it cools down.',
      icon: 'reactiveDebuffs',
   },
   /**
    * @description American A179_Black_Rock
    */
   chargeableBurst: {
      name: 'Burst Mode',
      description:
         'Landing two armor-penetrating hits on enemy vehicles triggers Burst mode, loading a burst-fire cassette that lets you unleash two shells in quick succession with your next shot for massive damage.',
      icon: 'chargeableBurst',
   },
   /**
    * @description UK GB152_AT_FV230_Breaker
    */
   powerMode: {
      name: 'Direct Drive',
      description:
         'This mode provides a significant boost to engine power and top forward speed. The longer you drive forward, the more speed builds, allowing you to surge across the battlefield and cover large distances with ease.',
      icon: 'powerMode',
   },
   /**
    * @description UK GB147_FV4025_Contriver
    */
   twinGun: {
      name: 'Salvo Fire Mode',
      description:
         'Offers double damage and improved stabilization at the cost of mobility, accuracy, turret traverse speed, and aiming time. Best used in close combat.',
      icon: 'twinGun',
   },
   /**
    * @description Polish Pl37_CS_67_Szakal
    */
   stanceDance: {
      name: 'Tactical Power Pack',
      description:
         'Depending on the active mode and charge level, the vehicle can activate one of two abilities: Ion-Discharge Afterburner: Increases engine power and speed. Coincidence Electromechanical Sight: Reduces dispersion and reload time and improves accuracy.',
      icon: 'stanceDance',
   },
   /**
    * @description Swedish S36_Strv_107_12
    */
   pillboxSiegeMode: {
      name: 'Pillbox Mode',
      description:
         'This mode turns your vehicle into a fortified gun platform, granting superior accuracy and faster reload time. In exchange for this enhanced firepower, vehicle mobility—forward/reverse speed and vertical/horizontal traverse—is severely limited.',
      icon: 'pillboxSiegeMode',
   },
   /**
    * @description France F135_AS_XX_40_t
    */
   stationaryReload: {
      name: 'External Ammunition Supply Module',
      description:
         'This module keeps you in the fight by letting you interrupt reload at any time if at least one shell is loaded. Press the hotkey to stop reloading, fire after a short delay, then resume reload manually or let the clip auto-reload when empty.',
      icon: 'stationaryReload',
   },
   /**
    * @description France F136_AMX_67_Imbattable
    */
   extraShotClip: {
      name: 'Cassette Loading System',
      description:
         'The system automatically begins loading a new cassette when one shell remains in the current one, keeping you ready to engage. You can still fire the final shell during this process, but doing so adds several seconds to the remaining reload time.',
      icon: 'extraShotClip',
   },
   /**
    * @description Japan J52_STK_2
    */
   heatingZonesGun: {
      name: 'Active Gun Cooling',
      description:
         'The system keeps the gun cooled, allowing for highly accurate firing. The gun heats up when fired, but begins cooling down and returns to improved parameters during reload. The higher its temperature, the more some of its parameters change.',
      icon: 'heatingZonesGun',
   },
}

export default MECHANIC_NAMES
