import { render, screen, within } from '@testing-library/react'
import { useParams } from 'next/navigation'

import ModuleSelect from '@/VehicleDetails/Modules/ModuleSelect/ModuleSelect'
import DetailsTable from '@/VehicleDetails/Modules/DetailsTable/DetailsTable'
import VehicleContextProvider from '@/VehicleContext/VehicleContext'

import MockHirschkafer from '../mocks/Hirschkafer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const CreateWrapper = ({ children }: { children: React.ReactNode }) => {
   // ✅ creates a new QueryClient for each test
   const queryClient = new QueryClient()
   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

jest.mock('next/navigation', () => ({
   useParams: jest.fn(),
}))

beforeEach(() => {
   jest
      .mocked(useParams)
      .mockReturnValue({ tank_name: MockHirschkafer.xmlId, tank_id: MockHirschkafer._id.toString() })

   render(
      <CreateWrapper>
         <VehicleContextProvider tankDetails={MockHirschkafer}>
            <ModuleSelect />
            <DetailsTable />
         </VehicleContextProvider>
      </CreateWrapper>,
   )
})

describe('Testing DetailsTable component', () => {
   it('should render Hirschkafer Mechanic name', () => {
      expect(screen.getByText(/Propellant Thermal Control System/i)).toBeInTheDocument()
   })
   it('should render Hirschkafer Firepower tabel elements', async () => {
      const firepowerTable = screen.getByRole('table', {
         name: /firepower/i,
      })

      // const tbody = within(firepowerTable).getAllByRole('rowgroup')
      // const rows = within(tbody[1]).getAllByRole('row')
      // console.log(rows[0].innerHTML)

      expect(within(firepowerTable).getByText('Damage')).toBeInTheDocument()
      // expect(within(firepowerTable).getByText(/600HP/i)).toBeInTheDocument()
   })
})
