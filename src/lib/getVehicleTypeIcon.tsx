import ATSPG from '@/ImagesTankIcons/AT-SPG.svg'
import heavyTank from '@/ImagesTankIcons/heavyTank.svg'
import lightTank from '@/ImagesTankIcons/lightTank.svg'
import mediumTank from '@/ImagesTankIcons/mediumTank.svg'
import SPG from '@/ImagesTankIcons/SPG.svg'

function getIcon(type: string) {
   switch (type) {
      case 'AT-SPG':
         return ATSPG
      case 'SPG':
         return SPG
      case 'heavyTank':
         return heavyTank
      case 'mediumTank':
         return mediumTank
      case 'lightTank':
         return lightTank
      default:
         return ''
   }
}

export default getIcon
