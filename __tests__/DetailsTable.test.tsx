import { render, screen, within } from '@testing-library/react'
import { useParams } from 'next/navigation'

import ModuleSelect from '@/VehicleDetails/Modules/ModuleSelect/ModuleSelect'
import DetailsTable from '@/VehicleDetails/Modules/DetailsTable/DetailsTable'
import VehicleContextProvider from '@/VehicleContext/VehicleContext'

import MockHirschkafer from './mocks/Hirschkafer'

jest.mock('next/navigation', () => ({
   useParams: jest.fn(),
}))

beforeEach(() => {
   jest
      .mocked(useParams)
      .mockReturnValue({ tank_name: MockHirschkafer.xmlId, tank_id: MockHirschkafer._id.toString() })

   render(
      <VehicleContextProvider tankDetails={MockHirschkafer}>
         <ModuleSelect />
         <DetailsTable />
      </VehicleContextProvider>,
   )
})

function checkRowContents(row: HTMLElement, name: string) {
   const columns = within(row).getAllByRole('cell')
   //    expect(columns).toHaveLength(3)
   expect(columns[0]).toHaveTextContent(name)
}

describe('Testing DetailsTable component', () => {
   it('should render Hirschkafer Mechanic name', () => {
      expect(screen.getByText(/Propellant Thermal Control System/i)).toBeInTheDocument()
   })
   it('should render Hirschkafer Firepower tabel elements', async () => {
      //   const rows = screen.getAllByRole('cell')
      //   console.log(rows)
      //   expect(screen.getAllByRole('row'))
      // const tables = screen.getByLabelText(/Firepower table with average damage and penetration/i)

      const firepowerTable = screen.getByRole('table', {
         name: /firepower/i,
      })

      // console.log(firepowerTable)
      // first rowgroup is for the thead second is for tbody
      //   const tbody = within(table).getAllByRole('rowgroup')[1]
      //   const rows = within(tbody).getAllByRole('row')

      //   checkRowContents(rows[0], '600HP')
   })
})
