/**
 * - locked: the level is not unlocked yet
 * - available: the level is unlocked, but the option is not chosen
 * - active: an unlocked feature or a chosen option
 */
export type TFieldModImageState = 'locked' | 'available' | 'active'

const STATE_CLASSES: Record<TFieldModImageState, string> = {
   locked: 'grayscale brightness-50 hover:brightness-75',
   available: 'hover:brightness-125',
   active: 'hover:brightness-125',
}

/**
 * @description Tailwind classes of a field modification image. Locked images are desaturated and dark,
 * active ones are in full color, and every state gets brighter on hover.
 */
export function getImageStateClasses(state: TFieldModImageState) {
   return `transition duration-200 ${STATE_CLASSES[state]}`
}

export function getOptionState(isUnlocked: boolean, isChosen: boolean): TFieldModImageState {
   if (!isUnlocked) return 'locked'
   return isChosen ? 'active' : 'available'
}
