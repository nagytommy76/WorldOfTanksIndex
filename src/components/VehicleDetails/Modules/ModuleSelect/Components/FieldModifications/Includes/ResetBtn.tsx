import Button from '@mui/material/Button'
import useFieldModSelection from '../Hooks/useFieldModSelection'

export default function ResetBtn() {
   const { unlockedLevel, reset } = useFieldModSelection()

   return (
      <Button onClick={reset} size='small' variant='outlined' disabled={unlockedLevel === 0}>
         Reset modifications
      </Button>
   )
}
