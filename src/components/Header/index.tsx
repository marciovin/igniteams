import { BackIcon, Container, Logo, BackButton } from './styles';

import CaretLeft from 'phosphor-react-native/src/icons/CaretLeft'

import LogoImg from '../../assets/logo.png';

type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false } : Props) {
  return(
    <Container>
      {
        showBackButton &&
      <BackButton>
        <BackIcon />
      </BackButton>
    }

      <Logo source={LogoImg} />
    </Container>
  )
}