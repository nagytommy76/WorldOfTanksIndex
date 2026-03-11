import { Schema, model, models } from 'mongoose'

const DeviceSchema = new Schema({
   id: { type: Number, required: true },
   icon: String,
   name: String,
   displayName: String,
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
})

export const DeviceModel = models.Devices || model('Devices', DeviceSchema)
