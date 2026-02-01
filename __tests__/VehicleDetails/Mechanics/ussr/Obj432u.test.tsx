import { render, screen } from '@testing-library/react'
import Obj432uMechanics from '@/Mechanics/Includes/ussr/obj432u'

const ObjMechanicsMock = {
   mechanics: {
      heatAvgDmgPerLvl: '6.5/21.75/30.5%',
      heatTimeToReachLevel: '1/2.5/3.5',
      heatTimeBeforeOverheat: 7,
      heatChargeOverheatDuration: 2,
   },
   chargeShot: {
      timePerLevel: '1 2.5 3.5 6',
      damageFactorsPerLevel: '1 1.045 1.177 1.244',
      shotBlockTime: 4,
   },
}

describe('Test OBJ 432U Mechanics', () => {
   it('should render Avg damage per heat level row', () => {
      render(
         <>
            <table>
               <tbody>
                  <Obj432uMechanics mechanics={ObjMechanicsMock} />
               </tbody>
            </table>
         </>,
      )
      expect(screen.getByText(/Avg damage per heat level/i)).toBeInTheDocument()
      expect(screen.getByText('6.5/21.75/30.5%')).toBeInTheDocument()
   })
})
