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
export type ShellDiffMap = Record<ShellComparableField, IFieldDifferences>

// Only the fields that make sense to compare
export type ShellComparableField =
   | 'piercingPower[0]'
   | 'piercingPower[1]'
   | 'damage.armor'
   | 'speed'
   | 'maxDistance'
   | 'price'
