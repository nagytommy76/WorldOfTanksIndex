import { LabelList, Line } from 'recharts'

import ValueLabel from './ValueLabel'

export default function LineComponent({
   name,
   color,
   dataKey,
}: {
   name: string
   color: string
   dataKey: string
}) {
   return (
      <Line
         type='linear'
         dataKey={dataKey}
         name={name}
         stroke={color}
         strokeWidth={4}
         dot={false}
         isAnimationActive={false}
      >
         <LabelList content={<ValueLabel textColor={color} />} />
      </Line>
   )
}
