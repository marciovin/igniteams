import { TouchableOpacityProps } from 'react-native'

import { Container, Title, FilterStyleProps } from './style'

type Props = TouchableOpacityProps & FilterStyleProps & {
  title: string;
}

export function Filter({ title, isActive = false, ...rest}: Props){
  return (
      <Container {...rest}>
      <Title>
        {title}
      </Title>
      </Container>
  )
}