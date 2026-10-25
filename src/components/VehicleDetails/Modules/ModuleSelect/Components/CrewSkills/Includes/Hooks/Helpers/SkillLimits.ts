import type { CrewSkillRoles } from '@/Classes/CrewSkills'

export const MAX_PRIMARY_SKILLS = 6
export const MAX_SECONDARY_SKILLS = 3

/**
 * @param role The crew skill column role
 * @param ownSelected Selected skills in this column
 * @param isSecondary The role is a secondary one (e.g: T100LT Commander -> radioman)
 * @param commonSelected Selected common skills (repair, brotherhood, camouflage)
 * @param maxPrimaryOwnSelected The highest own selected skill count of the primary roles
 * @description
 *  - common -> no primary role can go above MAX_PRIMARY_SKILLS
 *  - secondary -> MAX_SECONDARY_SKILLS, common skills are excluded
 *  - primary -> MAX_PRIMARY_SKILLS, common skills are included
 */
export function isRoleLimitReached(
   role: CrewSkillRoles,
   ownSelected: number,
   isSecondary: boolean,
   commonSelected: number,
   maxPrimaryOwnSelected: number,
): boolean {
   if (role === 'common') return commonSelected + maxPrimaryOwnSelected >= MAX_PRIMARY_SKILLS
   if (isSecondary) return ownSelected >= MAX_SECONDARY_SKILLS
   return commonSelected + ownSelected >= MAX_PRIMARY_SKILLS
}
