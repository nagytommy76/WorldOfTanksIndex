import Leo120 from '@/Mechanics/Includes/Leo120'
import { render, screen } from '@testing-library/react'

const mockMechanics = {
   mechanics: {
      accuracyDispersionCap: '-20%',
      accuracyWhileMovingDispersionCap: '-40%',
      maxAccuracyLevel: 4,
      accuracyDispersionPerLevel: '-5%',
      accuracySpeedLimit: 30,
      accuracyLevelGainTime: 4,
   },
   accuracyStacks: {
      levelMax: 4,
      levelInitial: '0',
      levelAfterShot: '0',
      aimLevelBonus: 0.04,
      aimBonusCap: 0.95,
      gainMaxSpd: 20,
      gainTime: 5,
      stabilizeBonus: 0.7,
   },
}

describe('Test Leopard 120 Mechanics', () => {
   it('should render Dispersion at max level', () => {
      render(
         <>
            <table>
               <tbody>
                  <Leo120 mechanics={mockMechanics} />
               </tbody>
            </table>
         </>,
      )
      expect(screen.getByText(/Dispersion at max level/i)).toBeInTheDocument()
      expect(screen.getByText(/-20/i)).toBeInTheDocument()
   })
})
