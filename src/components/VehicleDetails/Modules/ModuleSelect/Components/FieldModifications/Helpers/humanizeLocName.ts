/**
 * @description Base modifications only have a localization key in the database, so a readable name is made from it
 * @example humanizeLocName('clutches_replace_1') // 'Clutches replace 1'
 */
export function humanizeLocName(locName: string) {
   const words = locName.split('_').filter(Boolean).join(' ')
   return words.charAt(0).toUpperCase() + words.slice(1)
}
