import Taschenratte from '@/Mechanics/Includes/Taschenratte'
import { render, screen } from '@testing-library/react'
import VehicleContextProvider from '@/VehicleContext/VehicleContext'

import MockTaschenratte from '@/__tests__/mocks/Taschenratte'

const mockMechanics = {
   mechanics: {
      secondaryReloadTimeSecs: 50,
      secondaryTotalBurstSize: 2,
      secondaryAvgDamage: 250,
      secondaryAvgPiercingPower: 80,
   },
   supportWeapon: '',
}

beforeEach(() => {
   render(
      <VehicleContextProvider tankDetails={MockTaschenratte}>
         <table>
            <tbody>
               <Taschenratte mechanics={mockMechanics} />
            </tbody>
         </table>
      </VehicleContextProvider>,
   )
})

describe('first', () => {
   it('should render secondary weapon module damage', () => {
      expect(screen.getByText(/Module damage/i)).toBeInTheDocument()
      expect(screen.getByText('110')).toBeInTheDocument()
   })
   it('should render secondary weapon module damage', () => {
      expect(screen.getByText(/Auxiliary weapon reload time/i)).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
   })
})
