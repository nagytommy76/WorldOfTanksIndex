import TableRowComponent from '@/VehicleDetails/Modules/DetailsTable/Includes/TableRow'
import { getRowEffect, getRowTint, isImproved } from '@/utils/helpers/modifierEffect'
import { screen, render } from '@testing-library/react'

function renderRow(props: Partial<React.ComponentProps<typeof TableRowComponent>>) {
   render(
      <table>
         <tbody>
            <TableRowComponent titleText='Test row' valueText={110} {...props} />
         </tbody>
      </table>,
   )
   return screen.getByText('Test row').closest('tr') as HTMLTableRowElement
}

describe('isImproved', () => {
   it('should be improved when the difference is greater than 0 by default', () => {
      expect(isImproved({ difference: 5 })).toBe(true)
      expect(isImproved({ difference: -5 })).toBe(false)
   })

   it('should be improved when the difference is less than 0 for lower-is-better', () => {
      expect(isImproved({ difference: -0.5 }, 'lower-is-better')).toBe(true)
      expect(isImproved({ difference: 0.5 }, 'lower-is-better')).toBe(false)
   })

   it('should prefer the explicit improved value', () => {
      expect(isImproved({ difference: -5, improved: true })).toBe(true)
      expect(isImproved({ difference: -5, improved: false }, 'lower-is-better')).toBe(false)
   })
})

describe('getRowEffect', () => {
   it('should return null without any difference', () => {
      expect(getRowEffect(null, 100)).toBeNull()
      expect(getRowEffect([{ difference: 0 }], 100)).toBeNull()
   })

   it('should calculate the percent from the base value', () => {
      // base: 100 -> 110
      expect(getRowEffect([{ difference: 10 }], 110)).toEqual({ improved: true, percent: 10 })
      // base: 10 -> 9
      expect(getRowEffect([{ difference: -1 }], 9, 'lower-is-better')).toEqual({
         improved: true,
         percent: 10,
      })
      expect(getRowEffect([{ difference: -1 }], 9)).toEqual({ improved: false, percent: 10 })
   })

   it('should pair the values with the modifiers and use the biggest effect', () => {
      // 100 -> 101 (+1%) and 100 -> 80 (-20%)
      expect(getRowEffect([{ difference: 1 }, { difference: -20 }], [101, 80])).toEqual({
         improved: false,
         percent: 20,
      })
   })

   it('should use the explicit base when provided', () => {
      // base - current: 1 - 0.9
      const effect = getRowEffect([{ difference: 0.1, base: 1 }], 0.9)
      expect(effect?.improved).toBe(true)
      expect(effect?.percent).toBeCloseTo(10)
   })
})

describe('getRowTint', () => {
   it('should return undefined without an effect', () => {
      expect(getRowTint(null)).toBeUndefined()
   })

   // it('should be stronger when the effect is bigger and stop at the maximum', () => {
   //    expect(getRowTint({ improved: true, percent: 0 })).toBe('rgba(22, 163, 74, 0.06)')
   //    expect(getRowTint({ improved: true, percent: 10 })).toBe('rgba(22, 163, 74, 0.253)')
   //    expect(getRowTint({ improved: true, percent: 15 })).toBe('rgba(22, 163, 74, 0.45)')
   //    expect(getRowTint({ improved: false, percent: 80 })).toBe('rgba(220, 38, 38, 0.45)')
   // })
})

describe('TableRowComponent modifiers', () => {
   // it('should be green when the difference is greater than 0', () => {
   //    const row = renderRow({ modifiers: [{ difference: 10 }] })

   //    expect(screen.getByText('10')).toHaveClass('text-green-600')
   //    expect(row).toHaveStyle({ backgroundColor: 'rgba(22, 163, 74, 0.253)' })
   // })

   // it('should be red when the difference is less than 0', () => {
   //    const row = renderRow({ valueText: 90, modifiers: [{ difference: -10 }] })

   //    expect(screen.getByText('-10')).toHaveClass('text-red-600')
   //    expect(row).toHaveStyle({ backgroundColor: 'rgba(220, 38, 38, 0.253)' })
   // })

   // it('should be green when the difference is less than 0 and lower is better', () => {
   //    const row = renderRow({ valueText: 9, modifiers: [{ difference: -1 }], direction: 'lower-is-better' })

   //    expect(screen.getByText('-1')).toHaveClass('text-green-600')
   //    expect(row).toHaveStyle({ backgroundColor: 'rgba(22, 163, 74, 0.253)' })
   // })

   // it('should be red when the difference is greater than 0 and lower is better', () => {
   //    const row = renderRow({ valueText: 11, modifiers: [{ difference: 1 }], direction: 'lower-is-better' })

   //    expect(screen.getByText('1')).toHaveClass('text-red-600')
   //    expect(row).toHaveStyle({ backgroundColor: 'rgba(220, 38, 38, 0.253)' })
   // })

   it('should not be colored without a difference', () => {
      const row = renderRow({ modifiers: [{ difference: 0 }] })

      expect(row.style.backgroundColor).toBe('')
      expect(row).not.toHaveStyle({ backgroundColor: 'rgba(22, 163, 74, 0.06)' })
      expect(row).not.toHaveStyle({ backgroundColor: 'rgba(220, 38, 38, 0.06)' })
   })
})
