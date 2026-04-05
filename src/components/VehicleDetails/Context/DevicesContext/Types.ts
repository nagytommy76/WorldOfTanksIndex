/**
 * @param name Name of the equipment modifier, e.g: vehicleCircularVisionRadius
 * @param value The actual modifier value, e.g: 10% view range increase = 1.1 (or specValue: 1.115)
 */
export interface IAppliedDeviceModifier {
   name: string
   value: number
}

export type DeviceModifiers = {
   [archeType: string]: IAppliedDeviceModifier[]
}

export interface IDevicesReducerState {
   appliedDevicesModifiers: DeviceModifiers | null
}

export type IDevicesContextActions =
   | {
        type: 'SET_DEVICE_MODIFIER'
        payload: { name: string; value: number; archeType: string }
     }
   | { type: 'REMOVE_DEVICE_MODIFIER'; payload: { archeType: string } }

export const devicesInitialState: IDevicesReducerState = {
   appliedDevicesModifiers: null,
}
