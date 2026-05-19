import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
   <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
   [`& .${tooltipClasses.tooltip}`]: {
      padding: 0,
   },
}))

export default HtmlTooltip
