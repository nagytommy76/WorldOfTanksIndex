// Which direction is considered "better" for each field
export type DiffDirection = 'higher-is-better' | 'lower-is-better'

export interface IFieldDifferences {
   base: number
   compared: number
   difference: number // compared - base
   percentDifference: number // delta / base * 100
   improved: boolean // delta is in the "good" direction
   neutral: boolean // delta === 0
}

export type ShellDiffMap = Partial<Record<ShellComparableField, IFieldDifferences>>

// Only the fields that make sense to compare
export type ShellComparableField =
   | 'piercingPower[0]'
   | 'piercingPower[1]'
   | 'damage.armor'
   | 'speed'
   | 'maxDistance'
   | 'price'
