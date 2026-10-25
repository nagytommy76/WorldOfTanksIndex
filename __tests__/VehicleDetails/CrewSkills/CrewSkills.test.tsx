import { render, screen, fireEvent, within } from '@testing-library/react'

import CrewContextProvider from '@/CrewContext/CrewContext'
import CrewSkills from '@/src/components/VehicleDetails/Modules/ModuleSelect/Components/CrewSkills/CrewSkills'
import type CrewSkillsClass from '@/Classes/CrewSkills'
import type { CrewSkillRoles } from '@/Classes/CrewSkills'
import type { ICrewMembers } from '@/types/VehicleDetails/Crew'

function createSkill(xmlName: string, role: CrewSkillRoles, paramName = 'testParam'): CrewSkillsClass {
   return {
      xmlName,
      role,
      typeName: undefined,
      name: xmlName,
      description: '',
      modifiers: [{ measureType: 'percents', situationalParam: false, paramName, value: 1.05 }],
   }
}

function createRoleSkills(role: CrewSkillRoles, count: number) {
   return Array.from({ length: count }, (_, index) => createSkill(`${role}_skill${index}`, role))
}

const mockCrewSkills: { [Roles in CrewSkillRoles]?: CrewSkillsClass[] } = {
   common: [
      createSkill('repair', 'common'),
      createSkill('brotherhood', 'common', 'crewLevelIncrease'),
      createSkill('camouflage', 'common'),
   ],
   commander: createRoleSkills('commander', 8),
   gunner: createRoleSkills('gunner', 8),
   driver: createRoleSkills('driver', 8),
   radioman: createRoleSkills('radioman', 8),
   loader: createRoleSkills('loader', 8),
}

jest.mock(
   '../../../src/components/VehicleDetails/Modules/ModuleSelect/Components/CrewSkills/Hooks/useGetCrewSkills',
   () => () => mockCrewSkills,
)
jest.mock(
   '../../../src/components/VehicleDetails/Modules/ModuleSelect/Components/CrewSkills/CrewBattleBooster/CrewBattleBoosters',
   () => () => null,
)

/**
 * T100LT crew: Commander (radioman), Driver, Gunner (loader)
 */
const T100LT_CREW: ICrewMembers[] = [
   { primary: 'commander', secondary: ['radioman'] },
   { primary: 'driver', secondary: [] },
   { primary: 'gunner', secondary: ['loader'] },
]

function renderCrewSkills() {
   render(
      <CrewContextProvider crewMembers={T100LT_CREW}>
         <CrewSkills />
      </CrewContextProvider>,
   )
}

function getSkillButtons(role: CrewSkillRoles) {
   const group = screen.getByRole('group', { name: new RegExp(`${role} crew skill list`) })
   return within(group).getAllByRole('button')
}

function clickSkills(role: CrewSkillRoles, count: number) {
   for (let index = 0; index < count; index++) fireEvent.click(getSkillButtons(role)[index])
}

function countDisabled(role: CrewSkillRoles) {
   return getSkillButtons(role).filter((button) => (button as HTMLButtonElement).disabled).length
}

describe('Crew skill selection limits', () => {
   it('should disable a primary role after 6 skills including the common skills', () => {
      renderCrewSkills()
      clickSkills('common', 2)
      clickSkills('gunner', 4)

      expect(countDisabled('gunner')).toBe(4)
      expect(countDisabled('driver')).toBe(0)
   })

   it('should disable a secondary role after 3 skills excluding the common skills', () => {
      renderCrewSkills()
      clickSkills('common', 3)
      clickSkills('loader', 2)
      expect(countDisabled('loader')).toBe(0)

      fireEvent.click(getSkillButtons('loader')[2])
      expect(countDisabled('loader')).toBe(5)
   })

   it('should block the remaining common skills when a primary role is full', () => {
      renderCrewSkills()
      clickSkills('common', 1)
      clickSkills('driver', 5)

      expect(countDisabled('common')).toBe(2)
      expect(countDisabled('gunner')).toBe(0)
   })

   it('should enable the role again after unselecting a skill', () => {
      renderCrewSkills()
      clickSkills('commander', 6)
      expect(countDisabled('commander')).toBe(2)

      fireEvent.click(getSkillButtons('commander')[0])
      expect(countDisabled('commander')).toBe(0)
   })
})
