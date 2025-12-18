'use client'
import Image from 'next/image'

import type { LegendProps, LegendPayload } from 'recharts'

type MoeLegendProps = LegendProps & {
   payload?: LegendPayload[]
}

export default function MasteryLegend({ payload }: MoeLegendProps) {
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
               <span style={{ color: '#e5e7eb' }}>
                  {item.dataKey === 'mastery[0]' && (
                     <Image
                        src={'/icons/mastery/class_3.png'}
                        alt='Class 3'
                        width={50}
                        height={50}
                        title='3rd Class'
                     />
                  )}
                  {item.dataKey === 'mastery[1]' && (
                     <Image
                        src={'/icons/mastery/class_2.png'}
                        alt='Class 2'
                        width={50}
                        height={50}
                        title='2nd Class'
                     />
                  )}
                  {item.dataKey === 'mastery[2]' && (
                     <Image
                        src={'/icons/mastery/class_1.png'}
                        alt='Class 1'
                        width={50}
                        height={50}
                        title='1st Class'
                     />
                  )}
                  {item.dataKey === 'mastery[3]' && (
                     <Image
                        src={'/icons/mastery/ace_tanker.png'}
                        alt='Ace Tanker'
                        width={50}
                        height={50}
                        title='Ace Tanker'
                     />
                  )}
               </span>
            </div>
         ))}
      </div>
   )
}
