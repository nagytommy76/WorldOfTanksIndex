import { Schema, model, models, type Model } from 'mongoose'
import CrewSkills from '@/Classes/CrewSkills'

const CrewSkillSchema = new Schema<CrewSkills, Model<CrewSkills>>({
   role: { type: String, required: true },
   xmlName: { type: String, required: true },
   typeName: { type: String, required: false, default: null },
   name: { type: String, required: false, default: null },
   description: { type: String, required: true },
   modifiers: {
      type: [
         {
            _id: false,
            measureType: String,
            situationalParam: Boolean,
            paramName: String,
            value: Number,
         },
      ],
   },
})

export const CrewSkillModel =
   (models.CrewSkills as Model<CrewSkills>) ||
   model<CrewSkills, Model<CrewSkills>>('CrewSkills', CrewSkillSchema)
