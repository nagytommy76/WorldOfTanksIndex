import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { VehicleContext } from '@/VehicleContext/VehicleContext'
import FieldModificationContextProvider from '@/VehicleContext/FieldModificationContext/FieldModificationContext'
import FieldModifications from '@/src/components/VehicleDetails/Modules/ModuleSelect/Components/FieldModifications/FieldModifications'
import type { IVehicleContext } from '@/VehicleContext/Types'
import { MockResolvedScoutTree } from '@/__tests__/mocks/FieldModificationTreeResolved'

jest.mock(
   '../../src/components/VehicleDetails/Modules/ModuleSelect/Components/FieldModifications/Hooks/useGetFieldModTree',
   () => () => ({
      fieldModificationTree: MockResolvedScoutTree,
      isError: false,
      isLoading: false,
      error: null,
   }),
)

const LEVELS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

function vehicleContextValue(overrides: Partial<IVehicleContext> = {}) {
   return {
      vehicleTier: 10,
      vehicleRole: 'role_LT_scout',
      customRoleSlotOptions: ['stealth', 'survivability'],
      ...overrides,
   } as IVehicleContext
}

function renderFieldModifications(overrides: Partial<IVehicleContext> = {}) {
   render(
      <VehicleContext.Provider value={vehicleContextValue(overrides)}>
         <FieldModificationContextProvider>
            <FieldModifications />
         </FieldModificationContextProvider>
      </VehicleContext.Provider>,
   )
}

const getSlider = () => screen.getByRole('slider', { name: 'Unlocked field modification level' })
const getButton = (name: string) => screen.getByRole('button', { name })

/**
 * @returns The state of every level hexagon, from level I to VIII
 */
function getLevelStates() {
   return LEVELS.map((level) => screen.getByAltText(`Level ${level}`).getAttribute('data-state'))
}

function unlockedUpTo(level: number) {
   return LEVELS.map((_, index) => (index < level ? 'active' : 'locked'))
}

describe('Field modifications tree', () => {
   it('should render every level locked at the start', () => {
      renderFieldModifications()

      expect(getLevelStates()).toEqual(unlockedUpTo(0))
      expect(getSlider()).toHaveAttribute('aria-valuetext', 'No field modifications')
      expect(getButton('Reset modifications')).toBeDisabled()
   })

   it('should unlock every level up to a chosen pair option', () => {
      renderFieldModifications()
      fireEvent.click(getButton('Loading Mechanism Tuning'))

      expect(getButton('Loading Mechanism Tuning')).toHaveAttribute('aria-pressed', 'true')
      expect(getButton('Aiming Mechanism Tuning')).toHaveAttribute('aria-pressed', 'false')
      expect(getLevelStates()).toEqual(unlockedUpTo(4))
      expect(getSlider()).toHaveAttribute('aria-valuetext', 'Level IV unlocked')
   })

   it('should color only the chosen option of a pair', () => {
      renderFieldModifications()
      fireEvent.click(getButton('Loading Mechanism Tuning'))

      const chosen = screen.getByAltText('Loading Mechanism Tuning')
      const other = screen.getByAltText('Aiming Mechanism Tuning')
      expect(chosen).toHaveAttribute('data-state', 'active')
      expect(chosen.getAttribute('src')).toContain('improvedGunBreech.png')
      expect(other).toHaveAttribute('data-state', 'available')
      expect(other.getAttribute('src')).toContain('improvedScope_disabled.png')
      expect(screen.getByAltText('Panoramic Triplex')).toHaveAttribute('data-state', 'locked')
   })

   it('should drop the choice when the slider moves above its level', () => {
      renderFieldModifications()
      fireEvent.click(getButton('Loading Mechanism Tuning'))
      fireEvent.keyDown(getSlider(), { key: 'ArrowUp' })

      expect(getSlider()).toHaveAttribute('aria-valuetext', 'Level III unlocked')
      expect(getLevelStates()).toEqual(unlockedUpTo(3))
      expect(getButton('Loading Mechanism Tuning')).toHaveAttribute('aria-pressed', 'false')
   })

   it('should unlock one more level with the slider', () => {
      renderFieldModifications()
      fireEvent.keyDown(getSlider(), { key: 'ArrowDown' })

      expect(getSlider()).toHaveAttribute('aria-valuetext', 'Level I unlocked')
      expect(getLevelStates()).toEqual(unlockedUpTo(1))
   })

   it('should unlock every level up to a clicked feature image', () => {
      renderFieldModifications()
      fireEvent.click(getButton('Alternate configuration: equipment & directives'))

      expect(getLevelStates()).toEqual(unlockedUpTo(3))
      expect(screen.getByAltText('Alternate configuration: equipment & directives')).toHaveAttribute(
         'data-state',
         'active',
      )
   })

   it('should unlock up to the role slot level when a category is chosen', () => {
      renderFieldModifications()
      fireEvent.click(getButton('Stealth role slot'))

      expect(getButton('Stealth role slot')).toHaveAttribute('aria-pressed', 'true')
      expect(getButton('Survivability role slot')).toHaveAttribute('aria-pressed', 'false')
      expect(getLevelStates()).toEqual(unlockedUpTo(6))
   })

   it('should lock everything on reset', () => {
      renderFieldModifications()
      fireEvent.click(getButton('Panoramic Triplex'))
      expect(getLevelStates()).toEqual(unlockedUpTo(8))

      fireEvent.click(getButton('Reset modifications'))
      expect(getLevelStates()).toEqual(unlockedUpTo(0))
      expect(getButton('Panoramic Triplex')).toHaveAttribute('aria-pressed', 'false')
   })

   it('should keep the choices when the tab is opened again', () => {
      function TabSwitcher() {
         const [isOpen, setIsOpen] = useState(true)
         return (
            <>
               <button onClick={() => setIsOpen((previous) => !previous)}>Toggle tab</button>
               {isOpen && <FieldModifications />}
            </>
         )
      }

      render(
         <VehicleContext.Provider value={vehicleContextValue()}>
            <FieldModificationContextProvider>
               <TabSwitcher />
            </FieldModificationContextProvider>
         </VehicleContext.Provider>,
      )
      fireEvent.click(getButton('Loading Mechanism Tuning'))
      fireEvent.click(getButton('Toggle tab'))
      expect(screen.queryByRole('slider')).not.toBeInTheDocument()

      fireEvent.click(getButton('Toggle tab'))
      expect(getButton('Loading Mechanism Tuning')).toHaveAttribute('aria-pressed', 'true')
      expect(getLevelStates()).toEqual(unlockedUpTo(4))
   })

   it('should show a message for vehicles below tier VI', () => {
      renderFieldModifications({ vehicleTier: 5 })

      const message = screen.getByText('Field modifications are available for tier VI - X vehicles.')
      expect(message).toBeInTheDocument()
      expect(screen.queryByRole('slider')).not.toBeInTheDocument()
   })

   it('should show a message for vehicles without a role', () => {
      renderFieldModifications({ vehicleRole: null })

      expect(screen.getByText('This vehicle has no field modifications.')).toBeInTheDocument()
      expect(screen.queryByRole('slider')).not.toBeInTheDocument()
   })
})
