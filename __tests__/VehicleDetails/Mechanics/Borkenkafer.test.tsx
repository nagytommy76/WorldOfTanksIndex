import { render, screen } from '@testing-library/react'
import Borkenkafer from '@/Mechanics/Includes/Borkenkafer'

const mockMechanics = {
   mechanics: {
      designatorInitialCooldownS: 30,
      designatorCooldownS: 20,
      designatorMarkDurationS: 12.5,
      designatorMarkedEnemiesAdditionalDamage: '15%',
   },
   targetDesignator: {
      deployTime: 60,
      cooldownTime: 25,
      spottedMarkedTime: 10,
      unspottedMarkedTime: 7,
      damageIncomeFactor: 1.1,
   },
}

describe('Test Borkenkafer mechanics', () => {
   it('should render Additional marked damage row', () => {
      render(
         <>
            <table>
               <tbody>
                  <Borkenkafer mechanics={mockMechanics} />
               </tbody>
            </table>
         </>,
      )
      expect(screen.getByText(/Additional marked damage/i)).toBeInTheDocument()
      expect(screen.getByText('15')).toBeInTheDocument()
   })
})
