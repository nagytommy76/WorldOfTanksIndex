/**
 * @description Height of one level row in px. The level slider spaces its marks by the same height,
 * so every hexagon lines up with the middle of its row.
 */
export const ROW_HEIGHT = 88

/**
 * @description Display sizes in px. Sources: hexagon 180×135, pair option 100×100, feature 160×100, role slot icon 24×24
 */
export const LEVEL_ICON_SIZE = { width: 60, height: 45 }
export const PAIR_IMAGE_SIZE = 80
export const FEATURE_IMAGE_SIZE = { width: 128, height: 80 }
export const ROLE_SLOT_ICON_SIZE = 30

/**
 * @description Orange of the hexagon artwork, used by the slider track and the chosen options
 */
export const FIELD_MOD_ORANGE = '#f97316'

export const ROLE_SLOT_FEATURE = 'roleSlot'

/**
 * @description Feature steps (action.type === 'feature'): image name in /public/FieldModification/base/ and title
 */
export const FIELD_MOD_FEATURES: Record<string, { image: string; title: string; icon: string }> = {
   shells_consumables_switch: {
      image: 'shellsConsumablesSwitch',
      title: 'Alternate configuration: shells & consumables',
      icon: '/FieldModification/base/shellsSwitchRoman.png',
   },
   opt_dev_boosters_switch: {
      image: 'optDevBoostersSwitch',
      title: 'Alternate configuration: equipment & directives',
      icon: '/FieldModification/base/equipmentSwitchRoman.png',
   },
   [ROLE_SLOT_FEATURE]: {
      image: 'roleSlot',
      title: 'Role slot',
      icon: '/FieldModification/base/roleSlotRoman.png',
   },
}
