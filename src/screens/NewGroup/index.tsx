import { HighLight } from '../../components/heighligth'
import { Header } from '../../components/Header'
import { Container, Content, Icon } from './styles'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

export function NewGroup() {
const [group, setGroup] = useState('')

  const navigation = useNavigation();

  function handleNew() {
navigation.navigate("players", { group })
  }
  
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
        onChangeText={setGroup}
        />

        <Button
        title='Criar turma' 
        style={{marginTop: 20}}
        onPress={handleNew}
        />

      </Content>
    </Container>
  )
}