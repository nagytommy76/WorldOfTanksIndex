import React from 'react'
import type { TooltipContentProps } from 'recharts'

export default function TooltipComponent({
   active,
   payload,
   label,
}: TooltipContentProps<string | number, string>) {
   if (!active || !payload?.length) return null

   return (
      <div
         style={{
            background: 'rgba(6, 19, 46, 0.9)',
            borderRadius: 5,
            padding: 12,
         }}
      >
         <div style={{ color: '#e5e7eb', fontWeight: 700, marginBottom: 8 }}>{label}</div>
         {payload.map((p, index) => (
            <div key={index} className='flex gap-2 items-center'>
               <span style={{ background: p.color }} className={`w-3 h-3 rounded-full bg-[${p.color}]`} />
               <span className={`text-[#cbd5e1] text-[12px]`}>
                  {p.name}: <span style={{ color: '#fff', fontWeight: 700 }}>{p.value}</span>
               </span>
            </div>
         ))}
      </div>
   )
}
