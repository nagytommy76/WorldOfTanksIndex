'use client'

import type { LegendProps, LegendPayload } from 'recharts'

type LegendItemProps = LegendPayload & {
   dataKey: string
}

type MoeLegendProps = LegendProps & {
   payload?: LegendItemProps[]
}

export default function MoeLegend({ payload }: MoeLegendProps) {
   payload?.sort((a, b) => Number(a.dataKey.split('.')[1]) - Number(b.dataKey.split('.')[1]))

   return (
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
         {payload?.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
               <span
                  style={{
                     width: 15,
                     height: 15,
                     borderRadius: 999,
                     background: item.color,
                     display: 'inline-block',
                  }}
               />
               <span style={{ color: '#e5e7eb', fontSize: 14 }}>
                  {item.dataKey === 'marks.65'
                     ? '65%'
                     : item.dataKey === 'marks.85'
                     ? '85%'
                     : item.dataKey === 'marks.95'
                     ? '95%'
                     : item.dataKey === 'marks.100'
                     ? '100%'
                     : ''}
               </span>
            </div>
         ))}
      </div>
   )
}
