import { LabelProps } from 'recharts'

interface Props extends LabelProps {
   textColor: string
}

export default function ValueLabel(props: Props) {
   const { x, y, value, textColor } = props

   if (value == null || x == null || y == null) return null

   const text = String(value)
   const padX = 8
   const h = 20
   const charW = 7
   const w = text.length * charW + padX

   return (
      <g transform={`translate(${(x as number) - w / 2},${(y as number) - h / 2})`}>
         <rect width={w} height={h} rx={4} ry={4} fill={textColor} />
         <text x={w / 2} y={h / 2 + 4} textAnchor='middle' fill='#ffffff' fontSize={13} fontWeight={600}>
            {text}
         </text>
      </g>
   )
}
