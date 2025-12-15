// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MoeLegend({ payload }: any) {
   return (
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
         {payload?.map((item) => (
            <div key={item.dataKey || ''} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
