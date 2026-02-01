import SiegeMode from '@/VehicleDetails/Modules/DetailsTable/Mobility/Includes/SiegeMode'
import { render, screen } from '@testing-library/react'

describe('Test Siege Mode', () => {
   it('should render Switching to Siege Mode', () => {
      const siegeMode = {
         switchOnTime: 2,
         switchOffTime: 1.3,
         engineDamageCoeff: 2,
         soundStateChange: {
            on: 'strv_siege_mode_on_PC',
            off: 'strv_siege_mode_off_PC',
         },
      }
      render(
         <>
            <table>
               <tbody>
                  <SiegeMode siegeMode={siegeMode} />
               </tbody>
            </table>
         </>,
      )

      expect(screen.getByText(/Switching to Siege Mode/i)).toBeInTheDocument()

      expect(screen.getByText(/Switching to Travel Mode/i)).toBeInTheDocument()
   })
   it('should render Speed Limit Switching to Siege Mode', () => {
      const siegeMode = {
         switchOnTime: '0',
         switchOffTime: '0',
         engineDamageCoeff: 2,
         soundStateChange: {
            on: 'strv_siege_mode_on_PC',
            off: 'strv_siege_mode_off_PC',
         },
      }

      render(
         <>
            <table>
               <tbody>
                  <SiegeMode siegeMode={siegeMode} />
               </tbody>
            </table>
         </>,
      )

      expect(screen.getByText(/Speed Limit Switching to Siege Mode/i)).toBeInTheDocument()
      expect(screen.getByText(/Speed Limit Switching to exit Siege Mode/i)).toBeInTheDocument()
   })
   it('should not render anything', () => {
      const siegeMode = {
         switchOnTime: '0.0',
         switchOffTime: '0.0',
         engineDamageCoeff: 2,
         soundStateChange: {
            on: 'strv_siege_mode_on_PC',
            off: 'strv_siege_mode_off_PC',
         },
      }
      render(
         <>
            <table>
               <tbody>
                  <SiegeMode siegeMode={siegeMode} />
               </tbody>
            </table>
         </>,
      )

      expect(screen.queryByText(/Switching to Siege Mode/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Speed Limit Switching to Siege Mode/i)).not.toBeInTheDocument()
   })
})
