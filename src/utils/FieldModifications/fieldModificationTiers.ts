/**
 * @description Field modifications exist for tier VI - X vehicles only.
 * Shared by the API route (header validation) and the UI (query `enabled` flag).
 */
export const FIELD_MODIFICATION_MIN_TIER = 6
export const FIELD_MODIFICATION_MAX_TIER = 10

export function isFieldModificationTier(tier: number) {
   return Number.isInteger(tier) && tier >= FIELD_MODIFICATION_MIN_TIER && tier <= FIELD_MODIFICATION_MAX_TIER
}
