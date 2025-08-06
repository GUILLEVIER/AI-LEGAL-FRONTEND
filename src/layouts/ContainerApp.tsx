import { Container } from '@mui/material'
import { ContainerAppProps } from '../interfaces/propsInterface'

const ContainerApp: React.FC<ContainerAppProps> = ({ maxWidth, children }) => {
  return (
    <Container component='main' maxWidth={maxWidth || 'xs'}>
      {children}
    </Container>
  )
}

export default ContainerApp
