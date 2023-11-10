import { HighLight } from '../../components/heighligth'
import { Header } from '../../components/Header'
import { Container, Content, Icon } from './styles'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton/>

      <Content>
        <Icon/>

        <HighLight
        title='Nova Turma'
        subtitle='Crie a turma para adicionar pessoas'
        />

        <Input 
        placeholder='Nome da Turma'
        />

        <Button
        title='Criar turma'
        style={{marginTop: 20}}
        />

      </Content>
    </Container>
  )
}