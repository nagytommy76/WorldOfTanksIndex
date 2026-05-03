/**
 * A function that takes a flat stat object and returns a modified copy.
 * Each modifier system (devices, crew, BiA, rations...) produces one of these.
 */
export type StatTransformer<T extends Record<string, number>> = (values: T) => T

/**
 * Runs a flat stat object through an ordered list of transformers.
 * Each transformer receives the output of the previous one.
 *
 * Order matters: device modifiers should run before crew modifiers
 * so that crew formula applies on top of device-adjusted values.
 *
 * @example
 * const { reloadTime, aimingTime } = applyStatPipeline(
 *   { reloadTime: 7.8, aimingTime: 2 },
 *   [
 *     createDeviceTransformer(appliedDevicesModifiers),
 *     createCrewTransformer(crewMembers, crewMode),
 *   ]
 * )
 */
export default function applyStatPipeline<T extends Record<string, number>>(
   baseValues: T,
   transformers: StatTransformer<T>[],
): T {
   return transformers.reduce((currentValues, transform) => transform(currentValues), baseValues)
}
