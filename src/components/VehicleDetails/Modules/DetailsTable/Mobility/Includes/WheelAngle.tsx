import TableRowComponent from '../../Includes/TableRow'

export default function WheelAngle({ wheelAngle }: { wheelAngle: number[] }) {
   const foundFirstPositive = wheelAngle.find((angle) => angle > 0)
   return (
      <>
         <TableRowComponent
            iconSrc='/icons/mobility/maxSteeringLockAngle.png'
            titleText='Maximum Wheel Turning Angle'
            valueText={foundFirstPositive || 0}
            unit='deg'
         />
      </>
   )
}
