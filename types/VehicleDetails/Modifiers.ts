// Which direction is considered "better" for each field
export type DiffDirection = 'higher-is-better' | 'lower-is-better'

/**
 * @param base The value of the field in the base shell
 * @param compared The value of the field in the compared shell
 * @param difference The delta between the compared shell and the base shell
 * @param percentDifference The percent difference between the compared shell and the base shell
 * @param improved Whether the delta is in the "good" direction
 * @param neutral Whether the delta is 0
 */
export interface IFieldDifferences {
   base: number
   compared: number
   difference: number // compared - base
   percentDifference: number // delta / base * 100
   improved: boolean // delta is in the "good" direction
   neutral: boolean // delta === 0
}
// A diff map where every field has a real value
export type ShellDiffMap = Record<ShellComparableField, IFieldDifferences>

// A diff map where every field is null (initial/reset state)
export type ShellDiffMapNull = Record<ShellComparableField, null>

// Union of both — this is what lives in your reducer
export type ShellDiffMapState = ShellDiffMap | ShellDiffMapNull

// Utility: a single field is either populated or null
export type NullableShellDiffMap = Record<ShellComparableField, IFieldDifferences | null>

// Only the fields that make sense to compare
export type ShellComparableField =
   | 'piercingPower[0]'
   | 'piercingPower[1]'
   | 'damage.armor'
   | 'speed'
   | 'maxDistance'
   | 'price'
