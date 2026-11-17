import { useContext } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import DeviceContextProvider, { DeviceContext } from '@/DevicesContext/DeviceContext'
import CrewContextProvider from '@/CrewContext/CrewContext'
import BattleBoosters from '@/src/components/VehicleDetails/Modules/ModuleSelect/Components/BattleBoosters/BattleBoosters'
import type { IDevice, IModifier } from '@/types/Devices/Devices'
import type { ICrewMembers } from '@/types/VehicleDetails/Crew'

function createBooster(id: number, icon: string, name: string, modifier: IModifier): IDevice {
   return {
      id,
      icon,
      name,
      displayName: name,
      modifiers: [modifier],
      aggregateModifiers: null,
      price: { credits: 1 },
      vehicleLevel: { min: 1, max: null },
      vehicleIncludeFilterTags: null,
      vehicleExcludeFilterTags: null,
      incompatibleTags: null,
      tags: ['battleBooster', 'equipmentBattleBooster'],
      deviceType: 'boost',
      archeType: 'battleBoosters',
   }
}

/**
 * icon / name pairs match the documents stored in the Devices collection
 */
const BATTLE_BOOSTERS: IDevice[] = [
   createBooster(1, 'additionalInvisibilityDevice', 'additInvisibilityDeviceBattleBooster', {
      name: 'vehicleCamouflage',
      value: 1.05,
      specValue: null,
   }),
   createBooster(2, 'coatedOptics', 'coatedOpticsBattleBooster', {
      name: 'vehicleCircularVisionRadius',
      value: 1.025,
      specValue: null,
   }),
   createBooster(3, 'improvedVentilation', 'improvedVentilationBattleBooster', {
      name: 'crewLevel',
      value: 2,
      specValue: null,
   }),
]

/**
 * archeType -> incompatibleTags of the matching device
 */
const DEVICES = {
   additionalInvisibilityDevice: ['additInvisibilityDevice'],
   coatedOptics: ['coatedOptics'],
   improvedVentilation: ['ventilation'],
}

type DeviceArcheType = keyof typeof DEVICES

const CREW: ICrewMembers[] = [
   { primary: 'commander', secondary: [] },
   { primary: 'driver', secondary: [] },
   { primary: 'gunner', secondary: [] },
]

/**
 * Select: same context calls as useSelectAndClose (addSelectedDevice + SET_INCOMPATIBLE_DEVICES)
 * Deselect: same context calls as useSetCloseNone (addSelectedDevice(0) + REMOVE_INCOMPATIBLE_DEVICE)
 */
function DeviceControls({ archeType }: { archeType: DeviceArcheType }) {
   const { addSelectedDevice, deviceDispatch } = useContext(DeviceContext)
   return (
      <>
         <button
            data-testid={`select-device-${archeType}`}
            onClick={() => {
               addSelectedDevice(archeType, 100)
               deviceDispatch({ type: 'SET_INCOMPATIBLE_DEVICES', payload: DEVICES[archeType] })
            }}
         />
         <button
            data-testid={`deselect-device-${archeType}`}
            onClick={() => {
               addSelectedDevice(archeType, 0)
               deviceDispatch({ type: 'REMOVE_DEVICE_MODIFIER', payload: { archeType } })
               deviceDispatch({ type: 'REMOVE_INCOMPATIBLE_DEVICE', payload: DEVICES[archeType][0] })
            }}
         />
      </>
   )
}

function AppliedBoostersProbe() {
   const {
      deviceReducer: { appliedBattleBoosterModifiers },
   } = useContext(DeviceContext)
   return <span data-testid='applied-boosters'>{Object.keys(appliedBattleBoosterModifiers ?? {}).join(',')}</span>
}

function renderBattleBoosters() {
   render(
      <DeviceContextProvider>
         <CrewContextProvider crewMembers={CREW}>
            {(Object.keys(DEVICES) as DeviceArcheType[]).map((archeType) => (
               <DeviceControls key={archeType} archeType={archeType} />
            ))}
            <AppliedBoostersProbe />
            <BattleBoosters battleBoosters={BATTLE_BOOSTERS} />
         </CrewContextProvider>
      </DeviceContextProvider>,
   )
}

function selectDevice(archeType: DeviceArcheType) {
   fireEvent.click(screen.getByTestId(`select-device-${archeType}`))
}

function deselectDevice(archeType: DeviceArcheType) {
   fireEvent.click(screen.getByTestId(`deselect-device-${archeType}`))
}

function getAppliedBoosters() {
   return screen.getByTestId('applied-boosters').textContent
}

function getBoosterButton(boosterName: string) {
   return screen.getByRole('button', { name: boosterName }) as HTMLButtonElement
}

function isCheckVisible(boosterName: string) {
   const badge = getBoosterButton(boosterName).querySelector('.MuiBadge-badge')
   return badge !== null && !badge.classList.contains('MuiBadge-invisible')
}

describe('Battle boosters', () => {
   it('should block every booster until its device is selected', () => {
      renderBattleBoosters()
      BATTLE_BOOSTERS.forEach((booster) => expect(getBoosterButton(booster.name)).toBeDisabled())
   })

   it('should unblock only the booster with the same archeType as the selected device', () => {
      renderBattleBoosters()
      selectDevice('additionalInvisibilityDevice')

      expect(getBoosterButton('additInvisibilityDeviceBattleBooster')).toBeEnabled()
      expect(getBoosterButton('coatedOpticsBattleBooster')).toBeDisabled()
      expect(getBoosterButton('improvedVentilationBattleBooster')).toBeDisabled()
   })

   it('should display the check icon on Low noise exhaust booster and block the others', () => {
      renderBattleBoosters()
      selectDevice('additionalInvisibilityDevice')
      selectDevice('coatedOptics')

      fireEvent.click(getBoosterButton('additInvisibilityDeviceBattleBooster'))

      expect(isCheckVisible('additInvisibilityDeviceBattleBooster')).toBe(true)
      expect(getBoosterButton('additInvisibilityDeviceBattleBooster')).toBeEnabled()
      expect(getBoosterButton('coatedOpticsBattleBooster')).toBeDisabled()
   })

   it('should display the check icon on Improved ventilation booster and keep it clickable', () => {
      renderBattleBoosters()
      selectDevice('improvedVentilation')
      selectDevice('coatedOptics')

      fireEvent.click(getBoosterButton('improvedVentilationBattleBooster'))

      expect(isCheckVisible('improvedVentilationBattleBooster')).toBe(true)
      expect(getBoosterButton('improvedVentilationBattleBooster')).toBeEnabled()
      expect(getBoosterButton('coatedOpticsBattleBooster')).toBeDisabled()
   })

   it('should remove the check icon when Improved ventilation booster is clicked again', () => {
      renderBattleBoosters()
      selectDevice('improvedVentilation')
      selectDevice('coatedOptics')

      fireEvent.click(getBoosterButton('improvedVentilationBattleBooster'))
      fireEvent.click(getBoosterButton('improvedVentilationBattleBooster'))

      expect(isCheckVisible('improvedVentilationBattleBooster')).toBe(false)
      expect(getBoosterButton('improvedVentilationBattleBooster')).toBeEnabled()
      expect(getBoosterButton('coatedOpticsBattleBooster')).toBeEnabled()
   })
})

describe('Battle boosters - device removal', () => {
   it('should remove the applied Low noise exhaust booster when its device is deselected', () => {
      renderBattleBoosters()
      selectDevice('additionalInvisibilityDevice')
      selectDevice('coatedOptics')
      fireEvent.click(getBoosterButton('additInvisibilityDeviceBattleBooster'))
      expect(getAppliedBoosters()).toBe('additionalInvisibilityDevice')

      deselectDevice('additionalInvisibilityDevice')

      expect(getAppliedBoosters()).toBe('')
      expect(isCheckVisible('additInvisibilityDeviceBattleBooster')).toBe(false)
      expect(getBoosterButton('additInvisibilityDeviceBattleBooster')).toBeDisabled()
      expect(getBoosterButton('coatedOpticsBattleBooster')).toBeEnabled()
   })

   it('should remove the applied Improved ventilation booster when its device is deselected', () => {
      renderBattleBoosters()
      selectDevice('improvedVentilation')
      fireEvent.click(getBoosterButton('improvedVentilationBattleBooster'))
      expect(getAppliedBoosters()).toBe('improvedVentilationBattleBooster')

      deselectDevice('improvedVentilation')

      expect(getAppliedBoosters()).toBe('')
      expect(isCheckVisible('improvedVentilationBattleBooster')).toBe(false)
      expect(getBoosterButton('improvedVentilationBattleBooster')).toBeDisabled()
   })

   it('should keep the applied booster when another device is deselected', () => {
      renderBattleBoosters()
      selectDevice('additionalInvisibilityDevice')
      selectDevice('coatedOptics')
      fireEvent.click(getBoosterButton('additInvisibilityDeviceBattleBooster'))

      deselectDevice('coatedOptics')

      expect(getAppliedBoosters()).toBe('additionalInvisibilityDevice')
      expect(isCheckVisible('additInvisibilityDeviceBattleBooster')).toBe(true)
      expect(getBoosterButton('additInvisibilityDeviceBattleBooster')).toBeEnabled()
   })

   it('should keep the applied booster when its device is swapped to another variant', () => {
      renderBattleBoosters()
      selectDevice('additionalInvisibilityDevice')
      fireEvent.click(getBoosterButton('additInvisibilityDeviceBattleBooster'))

      selectDevice('additionalInvisibilityDevice')

      expect(getAppliedBoosters()).toBe('additionalInvisibilityDevice')
      expect(isCheckVisible('additInvisibilityDeviceBattleBooster')).toBe(true)
   })
})
