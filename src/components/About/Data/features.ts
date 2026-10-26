import type { Feature, HowToStep } from '@/types/About/aboutTypes'

import PublicIcon from '@mui/icons-material/Public'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import BuildIcon from '@mui/icons-material/Build'
import GroupsIcon from '@mui/icons-material/Groups'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

export const FEATURES: Feature[] = [
   {
      title: 'Browse by nation & category',
      description:
         'Tech Tree, Premium, Collector and other vehicles for all 11 nations. Filter the table by vehicle type and tier (I–XI).',
      icon: PublicIcon,
      href: '/vehicles/techtree/germany',
   },
   {
      title: 'Detailed vehicle stats',
      description:
         'Firepower, mobility, spotting, concealment and survivability: average damage, rate of fire, shell velocity, camo values, terrain resistance, effective top speed and potential damage.',
      icon: QueryStatsIcon,
   },
   {
      title: 'Module configurator',
      description:
         'Pick guns, turrets, engines, chassis, radios and shells. Every stat is recalculated instantly for the selected configuration.',
      icon: BuildIcon,
   },
   {
      title: 'Equipment, boosters & crew',
      description:
         'Equip devices and battle boosters, train your crew skills and see exactly how each of them changes the vehicle’s performance.',
      icon: GroupsIcon,
   },
   {
      title: 'Marks of Excellence & Mastery',
      description:
         'Damage requirements for 1–3 Marks of Excellence and XP thresholds for every Mastery Badge class, for each vehicle from Tier V.',
      icon: EmojiEventsIcon,
   },
   {
      title: 'Tier XI special mechanics',
      description:
         'Unique vehicle mechanics, such as the Taschenratte’s auxiliary weapons, are displayed with their own stats.',
      icon: AutoAwesomeIcon,
   },
]

export const HOW_TO_STEPS: HowToStep[] = [
   {
      label: 'Find a vehicle',
      description:
         'Type a name into the search bar in the navigation (e.g. Leopard 1, EBR 105, T110E5), or pick a nation flag from the menu.',
   },
   {
      label: 'Filter the list',
      description: 'On a nation page, narrow the table down by vehicle type and tier, then sort the columns.',
   },
   {
      label: 'Configure the vehicle',
      description:
         'Open a vehicle and use the Modules tab to select modules, shells, equipment, battle boosters and crew skills. The stats update as you go.',
   },
   {
      label: 'Check the requirements',
      description:
         'Switch to the Marks of excellence and Mastery Badge tabs to see how much damage or experience you need.',
   },
]
