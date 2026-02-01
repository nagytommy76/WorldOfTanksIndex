import { render, screen } from '@testing-library/react'
import Kr1Mechanics from '@/Mechanics/Includes/ussr/Kr1'

const Kr1MechanicsMock = {
   mechanics: {
      improvedDamageEnemiesByRamming: '+60%',
      improvedDamageEnemiesChassisByRamming: '+20%',
   },
   improvedRamming: {
      damageBonusStageSize: 5,
      trackDamageBonusStageSize: 5,
      reductionDamageBonusStageSize: 5,
      damageValueToShowAnimation: 400,
      effectSpeedThreshold: 30,
      modifiers: {
         add: [],
         mul: [],
      },
   },
}

describe('Test KR-1 Mechanics', () => {
   it('should render Improved damage to enemies by ramming', () => {
      render(
         <>
            <table>
               <tbody>
                  <Kr1Mechanics mechanics={Kr1MechanicsMock} />
               </tbody>
            </table>
         </>,
      )

      expect(screen.getByText('Ramming dmg caused')).toBeInTheDocument()
      expect(screen.getByText('+60%')).toBeInTheDocument()

      expect(screen.getByText('Ramming dmg caused to suspension')).toBeInTheDocument()
      expect(screen.getByText('+20%')).toBeInTheDocument()
   })
})
