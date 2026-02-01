import WheelAngle from '@/VehicleDetails/Modules/DetailsTable/Mobility/Includes/WheelAngle'
import { screen, render } from '@testing-library/react'

const WheelAngles = [-33, 0, 0, 33]

describe('Test Wheel Angle', () => {
   it('should render correct wheel angles', () => {
      render(
         <>
            <table>
               <tbody>
                  <WheelAngle wheelAngle={WheelAngles} />
               </tbody>
            </table>
         </>,
      )
      expect(screen.getByText(/Maximum Wheel Turning Angle/i)).toBeInTheDocument()
      expect(screen.getByText(/33/i)).toBeInTheDocument()
   })
})
