import { render, screen, fireEvent } from '@testing-library/react'

import OrderContextProvider from '@/componentsVehiclesTable/Context/OrderContext'
import VehiclesTable from '@/componentsVehiclesTable/VehiclesTable'
import mockVehicles from '../mocks/CardVehicles'

beforeEach(() => {
   render(
      <OrderContextProvider>
         <VehiclesTable allVehicles={mockVehicles} />
      </OrderContextProvider>,
   )
})

describe('Test VehiclesTable component, Search, filter by tier/type', () => {
   it('should render type toggle button', async () => {
      expect(screen.getByRole('button', { name: /AT-SPG/i })).toBeInTheDocument()
   })
   it('shuld render several vehicles | Hirschkäfer, Taschenratte, Borkenkäfer, Maus, WT auf Pz. IV |', async () => {
      expect(screen.getByText(/Hirschkäfer/i)).toBeInTheDocument()
      expect(screen.getByText(/Taschenratte/i)).toBeInTheDocument()
      expect(screen.getByText(/Borkenkäfer/i)).toBeInTheDocument()
      expect(screen.getByText(/Maus/i)).toBeInTheDocument()
      expect(screen.getByText(/WT auf Pz. IV/i)).toBeInTheDocument()
   })
   it('Should select Tier XI heavyTank | Taschenratte |', () => {
      const typeButton = screen.getByRole('button', { name: /heavyTank/i })
      const tierButton = screen.getByTestId('tier-11')

      fireEvent.click(typeButton)
      fireEvent.click(tierButton)

      expect(screen.getByText(/Taschenratte/i)).toBeInTheDocument()

      expect(screen.queryByText(/Maus/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Hirschkäfer/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Borkenkäfer/i)).not.toBeInTheDocument()
   })
})
