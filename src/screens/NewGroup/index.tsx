import { HighLight } from '../../components/heighligth'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { groupCreate } from '../../storage/group/groupCreate'
import { AppError } from '../../utils/AppError'

import { Container, Content, Icon } from './styles'

import { useNavigation } from '@react-navigation/native'

import { useState } from 'react'
import { Alert } from 'react-native'

export function NewGroup() {
const [group, setGroup] = useState('')

  const navigation = useNavigation();

  async function handleNew() {

    try{
      if(group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'informe o nome da turma.');
      }

      await groupCreate(group)
      navigation.navigate("players", { group });

    }catch(error){
      if(error instanceof AppError){
        Alert.alert('Novo Grupo', error.message);
      }else {
        Alert.alert('Novo Grupo', 'Não foi possivel criar um novo grupo.');
        console.log(error)
      }
    }

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