import { Container } from '@mui/material'
import { ContainerAppProps } from '../model_interfaces/propsInterface'

const ContainerApp: React.FC<ContainerAppProps> = ({ children }) => {
  return (
    <Container component='main' maxWidth='xs'>
      {children}
    </Container>
  )
}

export default ContainerApp
