// eslint-disable-next-line @typescript-eslint/no-unused-vars //

import { Alert, FlatList, TextInput } from 'react-native'
import { useState, useEffect, useRef} from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { HighLight } from "../../components/heighligth";
import { Header } from "../../components/Header";
import { ButtonIcon } from '../../components/ButtonIcon/index'
import { Filter } from '../../components/Filter/index'
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container, Form, HearderList, NumbersofPlayers } from "./styles";

import { AppError } from "../../utils/AppError";

import { PlayerAddByGroup } from "../../storage/player/playerAddByGroup"
import { playersGetByGroupAndTeam } from "../../storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from '../../storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '../../storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '../../storage/group/groupRemoveByName';


  type RouteParams = {
    group: string
  }

export function Players(){
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A');
   const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const navigation = useNavigation();
    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null)

    async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0){
      return Alert.alert('Nova pessoa', 'imforme o nome da pessoa para adicionar')
    }

    const newPlayer = {
      name: newPlayerName,
      team, 
    }
    try {
      await PlayerAddByGroup(newPlayer, group)
      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('')
      fetchPlayerByTeam();

      }catch (error) {
        if(error instanceof AppError){
          Alert.alert('Nova pessoa', error.message)
        }else{
          console.log(error);  
          Alert.alert('Nova pessoa', 'Não foi possivel adicionar')
        }
    }
  }

  async function fetchPlayerByTeam() {
    try{
      const playerByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playerByTeam)
    }catch(error) {
        console.log(error)
        Alert.alert('Pessoas', 'não foi possivel carregar o membros deste time.')
    }
  }

  async function handlePlayersRemove(playerName: string){
    try{
      await playerRemoveByGroup(playerName, group); 
      fetchPlayerByTeam();

    }catch(error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Não foi possivel remover essa pessoa.');
  }
}

async function groupRemove(){
try{
await groupRemoveByName(group);

navigation.navigate('groups')

}catch(error){
console.log(error);
Alert.alert('Remover grupo', 'Não foi possivel remover o grupo.');
}


}


 async function handleGroupRemove(){
  Alert.alert(
    'Remover',
    'Deseja realmente remover este grupo? ',
    [
      { text: 'Não', style: 'cancel'},
      { text: 'Sim', onPress: () => groupRemove()}
    ]
  );
 }


  useEffect(() => {
  fetchPlayerByTeam();
  }, [team])

  return (
    <Container>
      <Header showBackButton/>

      <HighLight 
      title={group}
      subtitle="adicione a galera e separe os times"
      />

      <Form>

      <Input
      inputRef={newPlayerNameInputRef}
      onChangeText={setNewPlayerName}
      value={newPlayerName}
      placeholder="Nome da pessoa"
      autoCorrect={false}
      onSubmitEditing={handleAddPlayer}
      returnKeyType='done'
      />

      <ButtonIcon 
          icon="add"
          onPress={handleAddPlayer}
       />
      </Form>

        <HearderList>
        <FlatList
        data={['Time A', 'Time B']}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Filter
          title={item}
          isActive={item === team}
          
          onPress={() => setTeam(item)}
          />
        )}
        horizontal
        />

          <NumbersofPlayers>
              {players.length}
          </NumbersofPlayers>

   </HearderList>
          
    <FlatList
    data={players}
     keyExtractor={ item => item.name}
     renderItem={({item}) => (  <PlayerCard 
      onRemove={() => handlePlayersRemove(item.name)}
      name={item.name}
      />)
    }
    ListEmptyComponent={() => (
      <ListEmpty
       message='não há pessoas neste time'
       />
       )}
       showsVerticalScrollIndicator={false}
       contentContainerStyle={[
        { paddingBottom: 100 },
        players.length === 0 && { flex: 1}
       ]}
    />

    <Button 
    title="Remover Turma"
    type="SECONDARY"
    onPress={handleGroupRemove}
    />
    </Container>
  )
}

