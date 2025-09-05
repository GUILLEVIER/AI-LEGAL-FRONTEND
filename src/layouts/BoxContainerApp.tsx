import { Box } from '@mui/material'
import { BoxContainerAppProps } from '@/interfaces/propsInterface'

const BoxContainerApp: React.FC<BoxContainerAppProps> = ({ children }) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 4,
        marginTop: 4,
      }}
    >
      {children}
    </Box>
  )
}

export default BoxContainerApp
