import { Schema, model, models, type Model } from 'mongoose'

import type { IDevice } from '@/types/Devices/Devices'

const DeviceSchema = new Schema<IDevice, Model<IDevice>>({
   id: { type: Number, required: true },
   icon: { type: String, required: true },
   name: { type: String, required: true },
   displayName: { type: String, required: true },
   modifiers: {
      type: [
         {
            type: {
               name: String,
               value: Number,
               specValue: { type: Number, required: false, default: null },
            },
         },
      ],
      required: false,
      default: null,
      _id: false,
   },
   aggregateModifiers: {
      type: [{ type: { name: String, value: Number, vehicleTypes: [String] } }],
      required: false,
      default: null,
      _id: false,
   },
   price: {
      _id: false,
      type: Schema.Types.Mixed,
      of: [{ crystal: Number }, { credits: Number }, { equipCoin: Number }],
   },
   vehicleLevel: { min: Number, max: { type: Number, required: false, default: null } },
   vehicleIncludeFilterTags: { type: [String], required: false, default: null },
   vehicleExcludeFilterTags: { type: [String], required: false, default: null },
   incompatibleTags: { type: [String], required: false, default: null },
   tags: { type: [String], required: false, default: null },
   deviceType: { type: String, required: true },
   archeType: { type: String, required: true },
})

export const DeviceModel =
   (models.Devices as Model<IDevice>) || model<IDevice, Model<IDevice>>('Devices', DeviceSchema)
