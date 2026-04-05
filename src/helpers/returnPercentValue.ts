export default function ReturnPercentValue(value: number | string): number {
   if (typeof value === 'string') value = Number(value)
   const percentValue = (value - 1) * 100
   const transformValue = Math.round(percentValue * 100) / 100
   return transformValue
}
